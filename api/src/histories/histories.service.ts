import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import axios from "axios";
import { Op } from "sequelize";
import History from "./histories.model";
import User from "src/users/users.model";
import Employee from "src/employees/employees.model";
import { AddHistoryDtoNew } from "./dto/add-histories.dto";
import { HistoryTypesService } from "src/history_types/history_types.service";
import { RecordsService } from "src/records/records.service";
import { UsersService } from "src/users/users.service";
import { BoilsService } from "src/boils/boils.service";
import HistoryType from "src/history_types/history_types.model";
import { DbRoles } from "src/resources/dbRoles";
import { EmployeesService } from "src/employees/employees.service";
import { ProductsService } from "src/products/products.service";
import { BasesService } from "src/bases/bases.service";
import { NotesService } from "src/notes/notes.service";

@Injectable()
export class HistoriesService {
  constructor(
    @InjectModel(History)
    @Inject(forwardRef(() => RecordsService))
    private historyRepository: typeof History,
    private historyTypesService: HistoryTypesService,
    private recordsService: RecordsService,
    private userService: UsersService,
    private boilService: BoilsService,
    private employeeService: EmployeesService,
    private productService: ProductsService,
    private basesService: BasesService,
    private notesService: NotesService
  ) {}

  async sendMessages(hystories: History[]) {
    hystories.forEach(async (history) => {
      const $record = await history.$get("record");
      const $user = await history.$get("user");
      const $employee = await history.$get("employee");
      const $product = $record ? await $record.$get("product") : null;
      const $boil = $record ? await $record.$get("boil") : await history.$get("boil");
      const $historyType = await history.$get("historyType");
      const msg = `${$user ? $user.name : $employee.name}: ${$product ? $product.marking : "Основа"} - ${$boil ? $boil.value : "-"} - ${$historyType.description} `;
      await axios.get(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${msg}`
      );
    });
  }

  async checkUserRole(id: number | null, role: string) {
    //move to userService
    let userRoles = [];
    if (id) {
      const user = await this.userService.getByPk(id);
      userRoles = user.roles ? user.roles.map((x) => x.description) : [];
    }
    //move to userService
    if (userRoles.indexOf(role) === -1) {
      throw new HttpException(`Недостаточно прав для внесения записей...`, HttpStatus.BAD_REQUEST);
    }
  }

  async getHistoryType(value: string) {
    const historyType = await this.historyTypesService.getByValue(value);
    if (historyType) {
      return historyType;
    }
    throw new HttpException("Тип записи не найден", HttpStatus.NOT_FOUND);
  }

  async createHistory(dto: AddHistoryDtoNew) {
    const historyType = await this.getHistoryType(dto.historyType);
    const isBase =
      ["base_check", "plug_pass", "base_fail", "base_correct", "base_continue"].indexOf(dto.historyType) !== -1;
    const boil = await this.boilService.getOrCreateByValue(dto.boil_value);
    const base = await this.basesService.getOrCreateByCode(dto.base_code);
    if (boil && base && dto.plant_id) {
      boil.base_id = base.id;
      boil.plant_id = dto.plant_id;
      await boil.save();
    }
    const record_id = isBase ? null : dto.record_id;
    const boil_id = isBase ? boil.id : null;

    const note = await this.notesService.create(dto.history_note);

    const note_id = note ? note.id : null;
    const recDto = { ...dto, historyTypeId: historyType.id, record_id: record_id, boil_id: boil_id, note_id: note_id };
    const history = await this.historyRepository.create(recDto);
    await this.sendMessages([history]);
    return history;
  }

  async directAddHistorie(dto: AddHistoryDtoNew) {
    if (
      !dto.boil_value &&
      (dto.historyType === "base_check" || dto.historyType === "base_fail" || dto.historyType === "plug_pass")
    ) {
      throw new HttpException("Нет основы, прикрепленной к строке сводки", HttpStatus.CONFLICT);
    }
    // await this.checkUserRole(dto.userId, DbRoles.GODMODE);
    const history = await this.createHistory(dto);
    return history;
  }

  async addHistorie(dto: AddHistoryDtoNew) {
    // console.log(dto);
    const findRecordId = async () => {
      if (dto.boil_value && dto.code) {
        const record = await this.recordsService.getCurrentRecordByBoilAndCode(dto.boil_value, dto.code);
        return record ? record.id : dto.record_id;
      }
      return dto.record_id;
    };

    const findBoilValue = async () => {
      if (!dto.boil_value && dto.record_id) {
        const record = await this.recordsService.getById(record_id);
        return (await record.$get("water_base")).value;
      }

      const record = await this.recordsService.getById(record_id);
      // if (record) {
      if (record && !record.isSet) {
        return (await record.$get("water_base")).value;
      }
      return dto.boil_value;
    };

    const record_id = await findRecordId();
    const boil_value = await findBoilValue();

    // console.log(record_id);
    // console.log(boil_value);

    const lastHistory = await this.getLastHistory(boil_value, record_id);
    // console.log((await lastHistory.$get("historyType")).value);

    if (dto.historyType === "base_check") {
      if (lastHistory && lastHistory.historyType.value === "base_check") {
        throw new HttpException("Основа уже отнесена на пробу", HttpStatus.BAD_REQUEST);
      }
      const isValid =
        lastHistory?.historyType.value === "base_fail" ||
        lastHistory?.historyType.value === "base_correct" ||
        lastHistory?.historyType.value === "base_continue";
      if (lastHistory && !isValid) {
        throw new HttpException(
          'Для повторной пробы необходим статус "Брак основы", "Требуется корректировка" или "Продолжение варки"',
          HttpStatus.BAD_REQUEST
        );
      }
    }

    if (dto.historyType === "product_check") {
      if (!record_id) {
        throw new HttpException("Запись в сводке не найдена", HttpStatus.NOT_FOUND);
      }
      const record = await this.recordsService.getById(record_id);

      // Set
      if (record.isSet && lastHistory && lastHistory.historyType.value === "product_check") {
        throw new HttpException("Продукт уже отнесен на пробу", HttpStatus.BAD_REQUEST);
      }

      if (
        record.isSet &&
        lastHistory &&
        (lastHistory.historyType.value === "product_pass" ||
          lastHistory.historyType.value === "product_in_progress" ||
          lastHistory.historyType.value === "product_finished") // !!! Это добавил
      ) {
        throw new HttpException(
          'Необходимо отсутствие записей или статусы "Брак продукта" или "Требуется доработка"',
          HttpStatus.BAD_REQUEST
        );
      }

      // Not set

      if (!record.isSet && !lastHistory) {
        throw new HttpException('Необходимо статус "Допуск на подключение"', HttpStatus.BAD_REQUEST);
      }

      if (
        !record.isSet &&
        lastHistory &&
        lastHistory.historyType.value !== "plug_pass" &&
        lastHistory.historyType.value !== "product_fail" &&
        lastHistory.historyType.value !== "product_correct"
      ) {
        if (lastHistory.historyType.value === "product_check") {
          throw new HttpException("Продукт уже отнесен на пробу", HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException('Необходимо отсутствие записей или статус "Брак продукта"', HttpStatus.BAD_REQUEST);
        }
      }

      // !!!!! Это закомментировал
      // if (
      //   !record.isSet &&
      //   lastHistory &&
      //   !record.isSet &&
      //   lastHistory.historyType.value !== "plug_pass" &&
      //   lastHistory.historyType.value !== "product_check"
      // ) {
      //   throw new HttpException(
      //     'Для фиксации пробы необходим статус "Допуск на подключение" или "Брак продукта"',
      //     HttpStatus.BAD_REQUEST
      //   );
      // }
    }

    const history = await this.createHistory({ ...dto, record_id: record_id });
    return history;
  }

  async getLastHistory(boilValue: string | null, recordId: number | null): Promise<History> {
    if (boilValue) {
      const boil = await this.boilService.getOrCreateByValue(boilValue);
      const history = await this.historyRepository.findOne({
        where: recordId ? { [Op.or]: [{ record_id: recordId }, { boil_id: boil.id }] } : { boil_id: boil.id },
        include: [{ model: HistoryType, as: "historyType" }],
        order: [["id", "DESC"]],
      });
      return history;
    }

    const history = await this.historyRepository.findOne({
      where: { record_id: recordId },
      include: [{ model: HistoryType, as: "historyType" }],
      order: [["id", "DESC"]],
    });
    return history;
  }

  async deleteHistory(id: number) {
    const history = await this.historyRepository.findByPk(id);
    if (!history) {
      throw new HttpException("Строка не найдена", HttpStatus.NOT_FOUND);
    }
    await history.destroy();
  }

  async getStateAndCountByRecId(recordId: number) {
    if (!recordId) {
      throw new HttpException("Строка не найдена", HttpStatus.NOT_FOUND);
    }
    const histories = await this.historyRepository.findAll({
      where: { record_id: recordId },
      include: [{ model: HistoryType, as: "historyType" }],
      order: [["createdAt", "ASC"]],
    });
    const historiesCount = histories.length;
    const state = historiesCount > 0 ? histories[histories.length - 1].historyType.description : "-";
    const stateValue = historiesCount > 0 ? histories[histories.length - 1].historyType.value : null;

    return {
      historiesCount: historiesCount,
      state: state,
      stateValue: stateValue,
    };
  }

  async getHistoriesCountByRecId(recordId: number) {
    const record = await this.recordsService.getById(recordId);
    if (!record) {
      throw new HttpException("Запись в сводке не найдена", HttpStatus.NOT_FOUND);
    }
    const histories = await this.historyRepository.findAll({ where: { record_id: recordId } });
    return histories.length;
  }

  ///////

  async getHistoriesByBoilId(boilId: number) {
    const histories = await this.historyRepository.findAll({
      where: [{ boil_id: boilId }],
      include: [
        {
          model: HistoryType,
          as: "historyType",
        },
        { model: User, as: "user" },
        { model: Employee, as: "employee" },
      ],
      order: [["createdAt", "ASC"]],
    });
    return histories;
  }

  async getAllHistoriesByRecIdAndBoilId(recordId: number, boilId: number | null) {
    // Это для запроса использовать
    const histories = await this.historyRepository.findAll({
      // where: { [Op.or]: [{ record_id: recordId }, { boil_id: boilId }] },
      where: boilId ? { [Op.or]: [{ record_id: recordId }, { boil_id: boilId }] } : { record_id: recordId },
      include: [
        {
          model: HistoryType,
          as: "historyType",
        },
        { model: User, as: "user" },
        { model: Employee, as: "employee" },
      ],
      order: [["createdAt", "ASC"]],
    });
    return histories;
  }

  async getAllHistories() {
    const histories = await this.historyRepository.findAll();
    return histories;
  }

  async getLastTenHistories(plant_id: number) {
    const histories = await this.historyRepository.findAll({
      where: {
        employeeId: { [Op.ne]: null },
        plant_id: plant_id,
      },
      limit: 10,
      order: [["id", "DESC"]],
    });
    const result = await Promise.all(await histories.map((item) => this.parseHistory(item)));
    return result;
  }

  async parseHistory(item: History) {
    const record = await this.recordsService.getById(item.record_id);
    const product = record ? await this.productService.getById(record.productId) : null;
    const boil = await this.boilService.getById(record ? record.boilId : item.boil_id);
    const historyType = await this.historyTypesService.getById(item.historyTypeId);
    const employee = await this.employeeService.getById(item.employeeId);
    const base = boil ? await this.basesService.getByid(boil.base_id) : null;
    return {
      ...JSON.parse(JSON.stringify(item, ["id", "createdAt"])),
      boil: boil ? boil.value : null,
      base: base ? base.marking : null,
      product: product ? product.marking : null,
      historyType: historyType ? historyType.description : null,
      employee: employee ? employee.name : null,
    };
  }

  async getLastHistoryByRecId(recordId: number) {
    const record = await this.recordsService.getById(recordId);
    if (record) {
      const boil = await this.boilService.getByValue(record.boil.value);
      const history = await this.historyRepository.findAll({
        limit: 1,
        where: {
          [Op.or]: [{ record_id: recordId }, { boil_id: boil.id }],
          // record_id: recordId,
        },

        include: {
          model: HistoryType,
          as: "historyType",
        },
        order: [["createdAt", "DESC"]],
      });
      if (history.length) {
        return history[0];
      }
      return null;
    }
    throw new HttpException("Запись в сводке не найдена", HttpStatus.NOT_FOUND);
  }

  async getAllHistoriesByRecId(recordId: number) {
    const record = await this.recordsService.getById(recordId);

    if (record) {
      const boil = await this.boilService.getByValue(record.boil.value);
      const histories = await this.historyRepository.findAll({
        where: {
          [Op.or]: [{ record_id: recordId }, { boil_id: boil.id }],
        },
        include: [
          {
            model: HistoryType,
            as: "historyType",
          },
          { model: User, as: "user" },
          { model: Employee, as: "employee" },
        ],
        order: [["createdAt", "ASC"]],
      });
      return histories;
    }
    throw new HttpException("Запись в сводке не найдена", HttpStatus.NOT_FOUND);
  }

  async getAllHistoriesByBoilId(boilId: number) {
    const histories = await this.historyRepository.findAll({
      where: {
        boil_id: boilId,
      },
      include: [
        {
          model: HistoryType,
          as: "historyType",
        },
        { model: User, as: "user" },
        { model: Employee, as: "employee" },
      ],
      order: [["createdAt", "ASC"]],
    });
    return histories;
  }
}
