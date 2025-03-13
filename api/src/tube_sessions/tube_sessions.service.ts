import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TubeSession from "./tube_sessions.model";
import { Op } from "sequelize";
import TubeConveyor from "src/tube_conveyors/tube_conveyors.model";
import Employee from "src/employees/employees.model";
import { TubeSessionsLogoutDto } from "./dto/tube-sessions-logout.dto";
import { TubeSessionsLoginDto } from "./dto/tube-sessions-login.dto";
import { TubeConveyorsService } from "src/tube_conveyors/tube_conveyors.service";
import { EmployeesService } from "src/employees/employees.service";

@Injectable()
export class TubeSessionsService {
  constructor(
    @InjectModel(TubeSession)
    private tubeSessionsRepository: typeof TubeSession,
    private tubeConveyorsService: TubeConveyorsService,
    private employeeService: EmployeesService
  ) {}

  async getLastActiveSessionByConveyorId(conveyor_name) {
    const session = await this.tubeSessionsRepository.findOne({
      attributes: [],
      where: { finished: { [Op.ne]: true } },
      include: [
        { model: TubeConveyor, attributes: [], where: { name: conveyor_name }, required: true },
        { model: Employee, attributes: ["id", "name"] },
      ],
      order: [["id", "DESC"]],
    });
    return session;
  }

  async logout(dto: TubeSessionsLogoutDto) {
    const session = await this.tubeSessionsRepository.findOne({
      where: { finished: { [Op.ne]: true } },
      include: [{ model: TubeConveyor, attributes: [], where: { name: dto.conveyor_name }, required: true }],
      order: [["id", "DESC"]],
    });
    if (session) {
      session.set({
        finished: true,
      });
      await session.save();
    }
    return session;
  }

  async login(dto: TubeSessionsLoginDto) {
    const conveyor = await this.tubeConveyorsService.getConveyorByName(dto.conveyor_name);
    if (!conveyor) {
      throw new HttpException("Конвейер не найден", HttpStatus.NOT_FOUND);
    }

    const employee = await this.employeeService.getEmployeeByBarcode(dto.barcode);
    if (!employee) {
      throw new HttpException("Пользователь найден", HttpStatus.NOT_FOUND);
    }

    const exists_session = await this.tubeSessionsRepository.findOne({
      // where: { finished: { [Op.ne]: true }, employee_id: employee.id, conveyor_id: conveyor.id },
      where: { finished: { [Op.ne]: true }, conveyor_id: conveyor.id },
    });

    if (exists_session) {
      throw new HttpException("Пользователь уже авторизован", HttpStatus.CONFLICT);
    }

    const session = await this.tubeSessionsRepository.create({
      employee_id: employee.id,
      conveyor_id: conveyor.id,
    });
    return session;
  }
}
