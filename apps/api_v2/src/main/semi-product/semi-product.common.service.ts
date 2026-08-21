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
}
