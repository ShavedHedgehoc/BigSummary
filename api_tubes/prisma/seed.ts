import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const employee1 = await prisma.employee.upsert({
    where: { barcode: '1234567890123' },
    update: {},
    create: {
      name: 'Иванов А.В.',
      barcode: '1234567890123',
    },
  });
  console.log(employee1);
  const employee2 = await prisma.employee.upsert({
    where: { barcode: '3234567890123' },
    update: {},
    create: {
      name: 'Петров А.В.',
      barcode: '3234567890123',
    },
  });
  console.log(employee2);
}
main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
