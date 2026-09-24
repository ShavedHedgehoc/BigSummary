import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IApplicationDocService } from '@repo/trpc';
import {
  TGetApplicationDocListInput,
  TApplicationDocListResponse,
  TApplicationDocItem,
  TApplicationDeleteDocInput,
  TApplicationUploadDocInput,
  TApplicationUploadDocRecordRowInput,
  TApplicationGetDocStatsInput,
  TApplicationDeleteDocResponse,
  TApplicationUploadDocResponse,
  TApplicationDocStatsResponse,
  TApplicationDocDetailResponse,
  TApplicationGetDocDetailInput,
  TApplicationDocDetailHeader,
  TApplicationDocDetailRowItem,
  TApplicationDeleteDocRowInput,
  TApplicationDeleteDocRowResponse,
  TApplicationUpdateDocRowInput,
  TApplicationUpdateDocRowResponse,
  TCommonHistoryItem,
  TApplicationGetCurrentDocInput,
} from '@repo/schemas';
import { marking_sample, pgPrisma, Prisma } from '@repo/db-postgres';
import { TRPCError } from '@trpc/server';
import { parseSemiproducts } from './utils/semiproduct.parser.util';
import { HistoryCommonService } from '../history/history.common.service';
import { RecordCounterService } from '../record-counter/record-counter.service';
import { DocCommonService } from './doc.common.service';

const docWithRelationsSelect = {
  id: true,
  plantId: true,
  date: true,
  createdAt: true,
  updatedAt: true,
  plants: true,
  records: {
    select: {
      id: true,
      _count: {
        select: { histories: true },
      },
    },
  },
} satisfies Prisma.docsSelect;

const docWithRelationsInclide = {
  plants: true,
} satisfies Prisma.docsInclude;

const recordWithRelationsInclude = {
  products: true,
  boils: true,
  apparatuses: true,
  cans: true,
  conveyors: true,
  workshops: true,
} as Prisma.recordsInclude;

type TDocWithRelations = Prisma.docsGetPayload<{
  select: typeof docWithRelationsSelect;
}>;

interface TCreateRecordDto extends TApplicationUploadDocRecordRowInput {
  doc_id: number;
}

@Injectable()
export class ApplicationDocService implements IApplicationDocService {
  constructor(
    @Inject(forwardRef(() => HistoryCommonService))
    private historyCommonService: HistoryCommonService,
    @Inject(forwardRef(() => RecordCounterService))
    private recordCounterService: RecordCounterService,
    @Inject(forwardRef(() => DocCommonService))
    private docCommonService: DocCommonService,
  ) {}

  async getDocList(input: TGetApplicationDocListInput): Promise<TApplicationDocListResponse> {
    const { limit, page, ...filter } = input;
    const skip = (page - 1) * limit;

    const startOfDay = new Date(filter.startDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(filter.endDate);
    endOfDay.setHours(23, 59, 59, 999);

    const andConditions: Prisma.docsWhereInput[] = [
      { date: { gte: new Date(startOfDay), lte: endOfDay } },
    ];

    if (filter.plants && filter.plants.length > 0) {
      andConditions.push({ plantId: { in: filter.plants.map((x) => Number(x)) } });
    }

    const [items, total] = await Promise.all([
      pgPrisma.docs.findMany({
        where: { AND: andConditions },
        select: docWithRelationsSelect,
        take: limit,
        skip: skip,
        orderBy: { date: 'asc' },
      }),
      pgPrisma.docs.count({
        where: { AND: andConditions },
      }),
    ]);
    const rows: TApplicationDocItem[] = items.map((item: TDocWithRelations) => {
      const totalHistories = item.records.reduce((sum, record) => sum + record._count.histories, 0);
      return {
        id: item.id,
        plantId: item.plantId ?? null,
        date: item.date,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        plant: item.plants?.value ?? null,
        recordsCount: item.records.length,
        historiesCount: totalHistories,
      };
    });

    const totalPages = Math.ceil(total / limit);
    return { rows, total, totalPages };
  }

  private isCanDeleted(val: string | null) {
    if (!val) return true;
    let result = true;
    if (
      val === 'product_check' ||
      val === 'product_fail' ||
      val === 'product_pass' ||
      val === 'product_in_progress' ||
      val === 'product_finished' ||
      val === 'product_correct'
    ) {
      result = false;
    }
    return result;
  }

  async getCurrentDoc(
    input: TApplicationGetCurrentDocInput,
  ): Promise<TApplicationDocDetailResponse> {
    const { plants, ...rest } = input;
    const parsedId = Number(plants[0]);
    const plantId = !isNaN(parsedId) ? parsedId : null;
    if (!plantId) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Площадка не выбрана',
      });
    }
    const doc = await this.docCommonService.getCurrentDocByPlantId(plantId);
    if (!doc) {
      // throw new TRPCError({
      //   code: 'NOT_FOUND',
      //   message: 'Документ не найден',
      // });
      return { rows: [], header: null };
    }
    return this.getDetails({
      docId: doc.id,
      ...rest,
    });
  }

  async getDetails(input: TApplicationGetDocDetailInput): Promise<TApplicationDocDetailResponse> {
    const { docId, conveyor, boil, boilAsc, productCode, marking, states } = input;
    const doc = await pgPrisma.docs.findUnique({
      where: { id: docId },
      include: docWithRelationsInclide,
    });

    if (!doc) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Документ не найден',
      });
    }

    const andConditions: Prisma.recordsWhereInput[] = [{ doc_id: docId }];

    if (conveyor) {
      andConditions.push({ conveyors: { value: { contains: conveyor, mode: 'insensitive' } } });
    }

    if (boil) {
      andConditions.push({ boils: { value: { contains: boil, mode: 'insensitive' } } });
    }

    if (productCode) {
      andConditions.push({ products: { code1C: { contains: productCode, mode: 'insensitive' } } });
    }

    if (marking) {
      andConditions.push({ products: { marking: { contains: marking, mode: 'insensitive' } } });
    }

    const orderByConditions: Prisma.recordsOrderByWithRelationInput[] = [];

    if (boilAsc) {
      orderByConditions.push({
        boils: {
          year: 'asc',
          letter: 'asc',
          number: 'asc',
        },
      });
    }

    orderByConditions.push({ id: 'asc' });

    const recordsData = await pgPrisma.records.findMany({
      where: { AND: andConditions },
      include: recordWithRelationsInclude,
      orderBy: orderByConditions,
    });

    if (recordsData.length === 0) {
      return {
        header: {
          id: doc.id,
          plantId: doc.plantId,
          date: doc.date,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
          plant: doc.plants?.value ?? null,
        },
        rows: [],
      };
    }

    const recordIds = recordsData.map((r) => r.id);

    const hasTypeFilter = states && states.length > 0;

    const [allHistoriesGrouped, allFactsMap] = await Promise.all([
      this.historyCommonService.getHistoriesForRecords(
        recordsData.map((r) => ({ id: r.id, water_base_id: r.water_base_id })),
        states.map((s) => Number(s)),
      ),
      this.recordCounterService.getTaskSumsForRecordIds(recordIds),
    ]);

    const nowTime = Date.now();
    const rows: TApplicationDocDetailRowItem[] = [];

    for (const item of recordsData) {
      const histories = allHistoriesGrouped[item.id] ?? [];

      if (hasTypeFilter && histories.length === 0) {
        continue;
      }

      const historiesCount = histories.length;
      const lastHistory = historiesCount > 0 ? histories[histories.length - 1] : null;

      const state = lastHistory ? lastHistory.history_types.description : '-';
      const stateValue = lastHistory ? lastHistory.history_types.value : null;
      const stateTime = lastHistory ? lastHistory.createdAt : null;

      const isUpdated = stateTime ? nowTime - new Date(stateTime).getTime() < 1000 * 60 * 2 : false;
      const isCanDeleted = this.isCanDeleted(stateValue);

      const formattedHistories: TCommonHistoryItem[] = histories.map((h) => ({
        id: h.id,
        value: h.history_types?.value ?? null,
        description: h.history_types?.description ?? null,
        note: h.note,
        history_note: h.notes?.value ?? null,
        employee: h.employees?.name ?? null,
        user: h.users?.name ?? null,
        createdAt: h.createdAt,
      }));

      rows.push({
        id: item.id,
        productCode: item.products.code1C,
        marking: item.products.marking,
        boil: item.boils ? item.boils.value : '-',
        plan: item.plan,
        fact: allFactsMap[item.id] ?? 0,
        apparatus: item.apparatuses ? item.apparatuses.value : '-',
        bbf: item.bbf,
        dm: item.dm,
        note: item.note,
        can: item.cans ? item.cans.value : '-',
        conveyor: item.conveyors.value,
        workshop: item.workshops.value,
        waterBaseId: item.water_base_id,
        historiesCount: historiesCount,
        histories: formattedHistories,
        state: state,
        stateValue: stateValue,
        stateTime: stateTime,
        isSet: item.isSet,
        isUpdated: isUpdated,
        isCanDeleted: isCanDeleted,
      });
    }

    const header: TApplicationDocDetailHeader = {
      id: doc.id,
      plantId: doc.plantId,
      date: doc.date,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      plant: doc.plants?.value ?? null,
    };
    return { header, rows };
  }
  async getStats(input: TApplicationGetDocStatsInput): Promise<TApplicationDocStatsResponse> {
    const startOfDay = new Date(input.startDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(input.endDate);
    endOfDay.setHours(23, 59, 59, 999);

    const targetDocs = await pgPrisma.docs.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        id: true,
        plants: true,
      },
    });

    const stats = {
      totalRowsPsk: 0,
      totalRowsKlp: 0,
      totalPlanPsk: 0,
      totalPlanKlp: 0,
    };

    if (targetDocs.length === 0) {
      return stats;
    }
    const docIds = targetDocs.map((d) => d.id);

    const statsGroup = await pgPrisma.records.groupBy({
      by: ['doc_id'],
      where: {
        doc_id: { in: docIds },
      },
      _count: {
        id: true,
      },
      _sum: {
        plan: true,
      },
    });

    for (const group of statsGroup) {
      const parentDoc = targetDocs.find((d) => d.id === group.doc_id);
      if (!parentDoc) continue;
      const isPsk = parentDoc.plants.abb === 'ПСК';
      const isKlp = parentDoc.plants.abb === 'КЛП';
      const rowsCount = group._count.id;
      const planSum = group._sum.plan ?? 0;

      if (isPsk) {
        stats.totalRowsPsk += rowsCount;
        stats.totalPlanPsk += planSum;
      } else if (isKlp) {
        stats.totalRowsKlp += rowsCount;
        stats.totalPlanKlp += planSum;
      }
    }
    return stats;
  }

  async deleteDoc(input: TApplicationDeleteDocInput): Promise<TApplicationDeleteDocResponse> {
    const doc = await pgPrisma.docs.findUnique({
      where: { id: input.id },
      select: docWithRelationsSelect,
    });
    if (!doc) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Документ для удаления не найден',
      });
    }
    const totalHistories = doc.records.reduce((sum, record) => sum + record._count.histories, 0);
    if (totalHistories > 0) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Удаление невозможно!',
      });
    }
    try {
      await pgPrisma.docs.delete({ where: { id: input.id } });
      return { success: true, id: input.id };
    } catch {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Неизвестная ошибка!',
      });
    }
  }

  private async checkRecord(dto: TCreateRecordDto, tx?: Prisma.TransactionClient) {
    const prisma = tx || pgPrisma;
    const { batch, conveyor: conveyorVal, code1C, doc_id } = dto;

    const dbBoil =
      batch && batch !== '-' ? await prisma.boils.findUnique({ where: { value: batch } }) : null;

    const dbConveyor =
      conveyorVal && conveyorVal !== '-'
        ? await prisma.conveyors.findUnique({ where: { value: conveyorVal } })
        : null;

    const dbProduct = await prisma.products.findUnique({ where: { code1C: code1C } });

    if (
      !dbProduct ||
      (batch && batch !== '-' && !dbBoil) ||
      (conveyorVal && conveyorVal !== '-' && !dbConveyor)
    ) {
      return;
    }

    const recordExist = await prisma.records.findFirst({
      where: {
        doc_id: doc_id ? Number(doc_id) : null,
        productId: dbProduct.id,
        boilId: dbBoil ? dbBoil.id : null,
        conveyorId: dbConveyor ? dbConveyor.id : null,
      },
    });

    if (recordExist) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Строка (Конвейер: ${dbConveyor ? dbConveyor.value : '-'}, Продукт: ${dbProduct ? dbProduct.marking : '-'}, Партия: ${dbBoil ? dbBoil.value : '-'}) совпадает с существующей строкой в сводке. Обновление отменено...`,
      });
    }
  }

  private async createRecord(dto: TCreateRecordDto, tx?: Prisma.TransactionClient) {
    const prisma = tx || pgPrisma;
    const {
      plan,
      serie,
      product,
      code1C,
      batch,
      boil1,
      boil2,
      apparatus,
      can,
      conveyor,
      workshop,
      semi_product: _semi_products,
      doc_id,
      org_base_min_weight: _org_base_min_weight,
      org_base_max_weight: _org_base_max_weight,
      water_base_min_weight: _water_base_min_weight,
      water_base_max_weight: _water_base_max_weight,
      per_box: _per_box,
      box_per_row: _box_per_row,
      row_on_pallet: _row_on_pallet,
      gasket: _gasket,
      seal: _seal,
      technician_note: _technician_note,
      packaging_note: _packaging_note,
      marking_sample: _marking_sample,
      marking_feature: _marking_feature,
      ink_color: _ink_color,
      ...directFields
    } = dto;
    // const boilConnect =
    //   batch && batch !== '-'
    //     ? { connectOrCreate: { where: { value: batch }, create: { value: batch } } }
    //     : undefined;
    // const waterBaseConnect =
    //   boil1 && boil1 !== '-'
    //     ? { connectOrCreate: { where: { value: boil1 }, create: { value: boil1 } } }
    //     : undefined;
    // const organicBaseConnect =
    //   boil2 && boil2 !== '-'
    //     ? { connectOrCreate: { where: { value: boil2 }, create: { value: boil2 } } }
    //     : undefined;
    const dbBoil = await this.historyCommonService.getOrCreateBoilByValue(batch, tx);
    const dbWaterBase = await this.historyCommonService.getOrCreateBoilByValue(boil1, tx);
    const dbOrganicBase = await this.historyCommonService.getOrCreateBoilByValue(boil2, tx);
    const apparatusConnect =
      apparatus && apparatus !== '-'
        ? { connectOrCreate: { where: { value: apparatus }, create: { value: apparatus } } }
        : undefined;
    const canConnect =
      can && can !== '-'
        ? { connectOrCreate: { where: { value: can }, create: { value: can } } }
        : undefined;

    const productCreateInput: Prisma.productsCreateInput = {
      code1C: code1C,
      marking: product,
    };

    if (serie && serie !== '-') {
      const dbSerie = await prisma.series.upsert({
        where: { value: serie },
        update: {},
        create: { value: serie },
      });
      productCreateInput.series = { connect: { id: dbSerie.id } };
    }

    const dbProduct = await prisma.products.upsert({
      where: { code1C: code1C },
      update: {},
      create: productCreateInput,
    });

    return await prisma.records.create({
      data: {
        ...directFields,
        plan: Number(plan),
        docs: doc_id
          ? {
              connect: { id: Number(doc_id) },
            }
          : undefined,
        isSet: can || apparatus ? false : true,
        products: {
          connect: { id: dbProduct.id },
        },
        conveyors: {
          connectOrCreate: { where: { value: conveyor }, create: { value: conveyor } },
        },
        workshops: {
          connectOrCreate: { where: { value: workshop }, create: { value: workshop } },
        },
        // boils: boilConnect,
        // water_bases: waterBaseConnect,
        // organic_bases: organicBaseConnect,
        boils: dbBoil ? { connect: { id: dbBoil.id } } : undefined,
        water_bases: dbWaterBase ? { connect: { id: dbWaterBase.id } } : undefined,
        organic_bases: dbOrganicBase ? { connect: { id: dbOrganicBase.id } } : undefined,
        apparatuses: apparatusConnect,
        cans: canConnect,
      },
    });
  }

  private async getOrCreateMarkingSample(
    value: string,
    tx: Prisma.TransactionClient,
  ): Promise<marking_sample | null> {
    const cleanValue = value?.trim();
    if (!cleanValue || cleanValue === '-') {
      return null;
    }

    let markingSample = await tx.marking_sample.findFirst({
      where: { value: cleanValue },
    });

    if (!markingSample) {
      markingSample = await tx.marking_sample.create({
        data: { value: cleanValue },
      });
    }

    return markingSample;
  }
  async uploadData(input: TApplicationUploadDocInput): Promise<TApplicationUploadDocResponse> {
    const { plantId, summaryDate, update, rows } = input;
    const plant = await pgPrisma.plants.findUnique({ where: { id: Number(plantId) } });
    if (!plant) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Площадка не найдена...`,
      });
    }

    const moscowDateStr = new Date(summaryDate).toLocaleDateString('en-CA', {
      timeZone: 'Europe/Moscow',
    });

    const startOfDay = new Date(`${moscowDateStr}T00:00:00+03:00`);
    const endOfDay = new Date(`${moscowDateStr}T23:59:59.999+03:00`);
    const docExists = await pgPrisma.docs.findFirst({
      where: {
        plantId: plant.id,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    if (docExists && !update) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Документ на эти дату и площадку уже существует. Попробуйте режим обновления или удалить существующий документ и попробовать снова...`,
      });
    }
    if (!docExists && update) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Документ на эти дату и площадку не существует. обновление не возможно...`,
      });
    }

    return pgPrisma.$transaction(async (tx) => {
      let activeDocId = docExists?.id;

      if (!update) {
        const newDoc = await tx.docs.create({
          data: {
            date: summaryDate,
            plants: {
              connect: { id: plant.id },
            },
          },
        });
        activeDocId = newDoc.id;
      }

      if (update) {
        for (const row of rows) {
          if (!row.batch || row.batch === '-') {
            continue;
          }
          await this.checkRecord({ ...row, doc_id: activeDocId }, tx);
        }
      }

      for (const row of rows) {
        if (!row.batch || row.batch === '-') {
          continue;
        }
        const createDto: TCreateRecordDto = { ...row, doc_id: activeDocId };
        const record = await this.createRecord(createDto, tx);
        const dbMarkingSample = await this.getOrCreateMarkingSample(row.marking_sample, tx);

        await tx.record_regulations.create({
          data: {
            records: {
              connect: { id: record.id },
            },
            org_base_min_weight: Number(row.org_base_min_weight),
            org_base_max_weight: Number(row.org_base_max_weight),
            water_base_min_weight: Number(row.water_base_min_weight),
            water_base_max_weight: Number(row.water_base_max_weight),
            per_box: row.per_box === '-' ? 0 : Number(row.per_box),
            box_per_row: row.box_per_row === '-' ? 0 : Number(row.box_per_row),
            row_on_pallet: row.row_on_pallet === '-' ? 0 : Number(row.row_on_pallet),
            gasket: row.gasket === '-' ? null : row.gasket,
            seal: row.seal !== '-',
            technician_note: row.technician_note === '-' ? null : row.technician_note,
            packaging_note: row.packaging_note === '-' ? null : row.packaging_note,
            inc_color: row.ink_color === '-' ? null : row.ink_color,
            marking_feature: row.marking_feature === '-' ? null : row.marking_feature,
            marking_sample: dbMarkingSample
              ? {
                  connect: { id: dbMarkingSample.id },
                }
              : undefined,
          },
        });

        const semiProductsParsed = parseSemiproducts(row.semi_product);
        // if (semiProductsParsed?.length) {
        //   await tx.semi_products.createMany({
        //     data: semiProductsParsed.map((item: TApplicationParsedSemiproductItem) => ({
        //       record_id: record.id,
        //       code: item.code,
        //       marking: item.marking,
        //       boil: item.boil,
        //     })),
        //   });
        // }
        if (semiProductsParsed?.length) {
          for (const item of semiProductsParsed) {
            const dbProduct = await tx.products.upsert({
              where: { code1C: item.code },
              update: {},
              create: {
                code1C: item.code,
                marking: item.marking,
              },
            });
            const dbBoil = await this.historyCommonService.getOrCreateBoilByValue(item.boil, tx);

            await tx.semi_products.create({
              data: {
                record_id: record.id,
                product_id: dbProduct.id,
                boil_id: dbBoil?.id ?? null,
              },
            });
          }
        }
      }
      return { success: true };
    });
  }

  async deleteDocRow(
    input: TApplicationDeleteDocRowInput,
  ): Promise<TApplicationDeleteDocRowResponse> {
    const record = await pgPrisma.records.findUnique({
      where: { id: input.id },
      include: {
        histories: true,
      },
    });
    if (!record) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Запись для удаления не найдена',
      });
    }
    if (record.histories && record.histories.length > 0) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Удаление невозможно!',
      });
    }
    try {
      await pgPrisma.records.delete({ where: { id: input.id } });
      return { success: true, id: input.id };
    } catch {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Неизвестная ошибка!',
      });
    }
  }

  async updateDocRow(
    input: TApplicationUpdateDocRowInput,
  ): Promise<TApplicationUpdateDocRowResponse> {
    const { id, apparatus, can, conveyor, plan, note } = input;

    const existsRecord = await pgPrisma.records.findUnique({ where: { id } });
    if (!existsRecord) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Строка сводки для обновления не найдена',
      });
    }

    let apparatusId: number | null = null;
    if (apparatus !== '-') {
      const existsApparatus = await pgPrisma.apparatuses.findFirst({
        where: { value: apparatus },
      });
      if (!existsApparatus) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Аппарат не найден в списке',
        });
      }
      apparatusId = existsApparatus.id;
    }

    let canId: number | null = null;
    if (can !== '-') {
      const existsCan = await pgPrisma.cans.findFirst({
        where: { value: can },
      });
      if (!existsCan) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Емкость не найдена в списке',
        });
      }
      canId = existsCan.id;
    }

    const existsConveyor = await pgPrisma.conveyors.findFirst({ where: { value: conveyor } });
    if (!existsConveyor) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Конвейер не найден в списке',
      });
    }

    const numberPlan = Number(plan);
    if (!Number.isInteger(numberPlan) || numberPlan <= 0) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Невозможно преобразовать значение плана в число или план равен 0',
      });
    }

    try {
      const updatedRecord = await pgPrisma.records.update({
        where: { id },
        data: {
          id: existsRecord.id,
          apparatusId: apparatusId,
          canId: canId,
          conveyorId: existsConveyor.id,
          plan: numberPlan,
          note: note,
        },
      });
      return { record: updatedRecord, success: true };
    } catch {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Неизвестная ошибка!',
      });
    }
  }
}
