import { Injectable } from '@nestjs/common';
import { pgPrisma } from '@repo/db-postgres';
import { TSemiProduct } from '@repo/schemas';

@Injectable()
export class SemiProductCommonService {
  async getSemiProductsByRecordId(recordId: number): Promise<TSemiProduct[]> {
    const semiProducts = await pgPrisma.semi_products.findMany({
      where: { record_id: recordId },
      include: {
        products: true,
        boils: true,
      },
      orderBy: { id: 'asc' },
    });
    const mappedSemiproducts: TSemiProduct[] = semiProducts.map((i) => ({
      code: i.products?.code1C,
      marking: i.products?.marking,
      boil_value: i.boils?.value,
    }));
    return mappedSemiproducts;
  }

  async getSemiProductsByRecordIds(recordIds: number[]): Promise<Record<number, TSemiProduct[]>> {
    const items = await pgPrisma.semi_products.findMany({
      where: { record_id: { in: recordIds } },
      include: {
        products: true,
        boils: true,
      },
    });

    const grouped: Record<number, TSemiProduct[]> = {};
    for (const item of items) {
      if (!grouped[item.record_id]) grouped[item.record_id] = [];
      grouped[item.record_id].push({
        code: item.products?.code1C,
        marking: item.products?.marking,
        boil_value: item.boils?.value,
      });
    }
    return grouped;
  }
}
