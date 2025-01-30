import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import Regulation from "./regulations.model";
import { ProductsService } from "src/products/products.service";
import { InjectModel } from "@nestjs/sequelize";
import { MarkingSampleService } from "src/marking_sample/marking_sample.service";
import { BulkUpdateRegulationsDto } from "./dto/bulk-update-regulation.dto";
import { SeriesService } from "src/series/series.service";
import MarkingSample from "src/marking_sample/marking_sample.model";
import Product from "src/products/products.model";
import { col } from "sequelize";

@Injectable()
export class RegulationsService {
  constructor(
    @InjectModel(Regulation)
    private regulationRepository: typeof Regulation,
    private productService: ProductsService,
    private markingSampleService: MarkingSampleService,
    private seriesService: SeriesService
  ) {}

  async bulkUpdateRegulations(dto: BulkUpdateRegulationsDto[]) {
    for (let index = 0; index < dto.length; index++) {
      try {
        const serie = await this.seriesService.getOrCreateByValue(dto[index].serie);
        const product = await this.productService.getOrCreateByCode(dto[index].code, dto[index].marking, serie.id);
        const marking_sample = await this.markingSampleService.getOrCreateByValue(dto[index].marking_sample);
        const [regulation, created] = await this.regulationRepository.findOrCreate({
          where: { product_id: product.id },
        });
        regulation.water_base_min_weight = Number(dto[index].water_base_min_weight);
        regulation.water_base_max_weight = Number(dto[index].water_base_max_weight);
        regulation.per_box = Number(dto[index].per_box);
        regulation.box_per_row = Number(dto[index].box_per_row);
        regulation.row_on_pallet = Number(dto[index].row_on_pallet);
        regulation.gasket = dto[index].gasket === "-" ? null : dto[index].gasket;
        regulation.seal = dto[index].seal;
        regulation.technician_note = dto[index].technician_note === "-" ? null : dto[index].technician_note;
        regulation.packaging_note = dto[index].packaging_note === "-" ? null : dto[index].packaging_note;
        regulation.marking_sample_id = marking_sample ? marking_sample.id : null;
        await regulation.save();
      } catch (error) {
        throw new HttpException(
          `Ошибка при обновлении в строке №${index + 1}, обновление прервано`,
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  async getByProductCode(code: string) {
    const regulation = await this.regulationRepository.findOne({
      attributes: {
        include: [[col("marking_sample.value"), "marking_sample_value"]],
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        { model: MarkingSample, as: "marking_sample", attributes: [] },
        { model: Product, where: { code1C: code }, attributes: [] },
      ],
    });
    return regulation;
  }
}
