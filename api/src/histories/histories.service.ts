import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import History from "./histories.model";
// import { CreateHistoryDto } from "./dto/create-history.dto";
import { HistoryTypesService } from "src/history_types/history_types.service";
import { RecordsService } from "src/records/records.service";
import axios from "axios";
import { AddHistoriesDto } from "./dto/add-histories.dto";
// import Record from "src/records/records.model";
import { Op } from "sequelize";
import HistoryType from "src/history_types/history_types.model";
import { UsersService } from "src/users/users.service";
import { DbRoles } from "src/resources/dbRoles";
// import Record from "src/records/records.model";

@Injectable()
export class HistoriesService {
  constructor(
    @InjectModel(History)
    private historyRepository: typeof History,
    private historyTypesService: HistoryTypesService,
    private recordsService: RecordsService,
    private userServise: UsersService
  ) { }

  // async createHistory(dto: CreateHistoryDto) {
  //   const historyType = await this.historyTypesService.getByValue(dto.historyType);
  //   if (historyType) {
  //     const lastHistory = await this.getLastHistoryByRecId(dto.recordId);
  //     const lastHistoryType = lastHistory !== null ? lastHistory.historyType.value : null;

  //     switch (dto.historyType) {
  //       case "base_check":
  //         if (lastHistoryType !== null || lastHistoryType !== "base_fail")
  //           throw new HttpException("Последний статус сводки не позволяет внести запись...", HttpStatus.BAD_REQUEST);

  //         break;

  //       default:
  //         break;
  //     }

  //     const history = await this.historyRepository.create({ ...dto, historyTypeId: historyType.id });
  //     const $record = await history.$get("record");
  //     const $product = await $record.$get("product");
  //     const $boil = await $record.$get("boil");
  //     const $historyType = await history.$get("historyType");
  //     const msg = `${$product.marking} - ${$boil.value} - ${$historyType.description} `;
  //     await axios.get(
  //       `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${msg}`
  //     );
  //     return history;
  //   }
  //   throw new HttpException("Тип записи не найден", HttpStatus.NOT_FOUND);
  // }

  async sendMessages(hystories: History[]) {
    hystories.forEach(async (history) => {
      const $record = await history.$get("record");
      const $product = await $record.$get("product");
      const $boil = await $record.$get("boil");
      const $historyType = await history.$get("historyType");
      const msg = `${$product.marking} - ${$boil.value} - ${$historyType.description} `;
      await axios.get(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${msg}`
      );
    });
  }

  async addHistoriesToRecords(dto: AddHistoriesDto) {
    const records = dto.code
      ? await this.recordsService.getCurrentRecordsByBoilAndcode(dto.boil, dto.code)
      : await this.recordsService.getCurrentRecordsByBoil(dto.boil);
    if (records.length === 0) {
      throw new HttpException("Строк сводки не найдено", HttpStatus.NOT_FOUND);
    }

    const historyType = await this.historyTypesService.getByValue(dto.historyType);
    if (!historyType) {
      throw new HttpException("Тип записи не найден", HttpStatus.NOT_FOUND);
    }
    //Move to userService
    let userRoles = [];
    if (dto.userId) {
      const user = await this.userServise.getByPk(dto.userId);
      userRoles = user.roles ? user.roles.map((x) => x.description) : [];
    }
    // console.log(userRoles);
    const recDto = records.map((item) => ({ ...dto, record_id: item.id, historyTypeId: historyType.id }));

    let histories: History[] = [];
    for (let index = 0; index < recDto.length; index++) {
      const lastHistory = await this.getLastHistoryByRecId(recDto[index].record_id);
      const lastHistoryType = lastHistory !== null ? lastHistory.historyType.value : null;

      switch (recDto[index].historyType) {
        case "base_check":
          if (lastHistoryType !== null && lastHistoryType !== "base_fail")
            throw new HttpException(
              `Чтобы запись могла быть внесена, запись должна быть первой или статус сводки должен быть "Брак основы"...`,
              HttpStatus.BAD_REQUEST
            );
          break;
        case "base_fail":
          if (userRoles.indexOf(DbRoles.LABORATORY) === -1) {
            throw new HttpException(
              `Вносить запись этого типа могут только сотрудники лаборатории...`,
              HttpStatus.BAD_REQUEST
            );
          }
          break;
        case "plug_pass":
          // Лаборатория если основа на пробе или главный технолог если пусто
          if (userRoles.indexOf(DbRoles.LABORATORY) === -1 && userRoles.indexOf(DbRoles.TECHNOLOGIST) === -1) {
            throw new HttpException(
              `Вносить запись этого типа могут только сотрудники лаборатории или главный технолог...`,
              HttpStatus.BAD_REQUEST
            );
          }

          if (
            userRoles.indexOf(DbRoles.LABORATORY) !== -1 &&
            userRoles.indexOf(DbRoles.TECHNOLOGIST) === -1 &&
            lastHistoryType !== "base_check"
          ) {
            throw new HttpException(
              `Чтобы запись могла быть внесена, статус сводки должен быть "Основа на пробе"...`,
              HttpStatus.BAD_REQUEST
            );
          }

          if (
            userRoles.indexOf(DbRoles.LABORATORY) === -1 &&
            userRoles.indexOf(DbRoles.TECHNOLOGIST) !== -1 &&
            lastHistoryType !== null
          ) {
            throw new HttpException(
              `Чтобы запись могла быть внесена, запись должна быть первой...`,
              HttpStatus.BAD_REQUEST
            );
          }

          if (
            userRoles.indexOf(DbRoles.LABORATORY) !== -1 &&
            userRoles.indexOf(DbRoles.TECHNOLOGIST) !== -1 &&
            !(lastHistoryType === null || lastHistoryType === "base_check")
          ) {
            throw new HttpException(
              `Чтобы запись могла быть внесена, запись должна быть первой или статус сводки должен быть "Основа на пробе"...`,
              HttpStatus.BAD_REQUEST
            );
          }

          break;
        case "product_fail":
          // Только лаборатория в любых
          if (userRoles.indexOf(DbRoles.LABORATORY) === -1) {
            throw new HttpException(
              `Вносить запись этого типа могут только сотрудники лаборатории...`,
              HttpStatus.BAD_REQUEST
            );
          }
          break;
        case "product_check":
          // Только если есть допуск на подключение
          if (lastHistoryType !== "plug_pass")
            throw new HttpException(
              `Чтобы запись могла быть внесена, статус сводки должен быть "Допуск на подключение"...`,
              HttpStatus.BAD_REQUEST
            );
          break;
        case "product_pass":
          // Только лаборатория если продукт на пробе или проблемы с продуктом
          if (userRoles.indexOf(DbRoles.LABORATORY) === -1) {
            throw new HttpException(
              `Вносить запись этого типа могут только сотрудники лаборатории...`,
              HttpStatus.BAD_REQUEST
            );
          }
          if (
            userRoles.indexOf(DbRoles.LABORATORY) !== -1 &&
            !(lastHistoryType === "product_fail" || lastHistoryType === "product_check")
          ) {
            throw new HttpException(
              `Вносить запись этого типа могут только сотрудники лаборатории...`,
              HttpStatus.BAD_REQUEST
            );
          }
          break;
        case "product_in_progress":
          // Только мастер если есть допуск на фасовку
          break;
        case "product_finshed":
          // Только мастер если продукт фасуется
          break;
        default:
          break;
      }

      const history = await this.historyRepository.create(recDto[index]);
      histories.push(history);
    }
    await this.sendMessages(histories);
    return histories;
  }

  async getAllHistories() {
    const histories = await this.historyRepository.findAll();
    return histories;
  }

  async getLastTenHistories() {
    const histories = await this.historyRepository.findAll({
      where: {
        employeeId: {
          [Op.ne]: null,
        },
      },
      include: { all: true, nested: true },
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    return histories;
  }

  async getLastHistoryByRecId(recordId: number) {
    const record = await this.recordsService.getById(recordId);
    if (record) {
      const history = await this.historyRepository.findAll({
        limit: 1,
        where: { record_id: recordId },
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
}
