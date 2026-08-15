import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Новый путь импорта
// ... ваши типы из @repo/schemas и логика метода getCellsContain ...

@Injectable()
export class OccupationService {
    constructor(private readonly prisma: PrismaService) { }
    // async createOccupation(dto: CreateOccupationDto) {
    //     const occupation = await this.occupationRepository.create(dto);
    //     return occupation;
    //   }

    async getAllOccupations() {
        const occupations = await this.prisma.client.occupations.findMany();
        return occupations;
    }

    //   async getOccupationByValue(value: string) {
    //     const occupation = await this.occupationRepository.findOne({
    //       where: { value: value },
    //     });
    //     return occupation;
    //   }
}
