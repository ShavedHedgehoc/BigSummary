import { Injectable } from '@nestjs/common';
import { pgPrisma } from '@repo/db-postgres';
import { TRegulation } from '@repo/schemas';

@Injectable()
export class RegulationCommonService {
  async getRegulationByRecordId(recordId: number): Promise<TRegulation> {
    const regulation = await pgPrisma.record_regulations.findFirst({
      where: { record_id: recordId },
      include: {
        marking_sample: true,
      },
    });
    if (!regulation) {
      return {
        org_base_min_weight: null,
        org_base_max_weight: null,
        water_base_min_weight: null,
        water_base_max_weight: null,
        per_box: 0,
        box_per_row: 0,
        row_on_pallet: 0,
        gasket: '-',
        seal: false,
        technician_note: null,
        packaging_note: null,
        inc_color: null,
        marking_feature: null,
        marking_sample_value: null,
      };
    }

    return {
      org_base_min_weight: regulation.org_base_min_weight?.toString() ?? null,
      org_base_max_weight: regulation.org_base_max_weight?.toString() ?? null,
      water_base_min_weight: regulation.water_base_min_weight?.toString() ?? null,
      water_base_max_weight: regulation.water_base_max_weight?.toString() ?? null,
      per_box: regulation.per_box,
      box_per_row: regulation.box_per_row,
      row_on_pallet: regulation.row_on_pallet,
      gasket: regulation.gasket,
      seal: regulation.seal,
      technician_note: regulation.technician_note,
      packaging_note: regulation.packaging_note,
      inc_color: regulation.inc_color,
      marking_feature: regulation.marking_feature,
      marking_sample_value: regulation.marking_sample?.value,
    };
  }
}
