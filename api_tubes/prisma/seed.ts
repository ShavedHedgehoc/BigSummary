import { PrismaClient } from '../generated/prisma/client';

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
  const production1 = await prisma.production.upsert({
    where: { code: '002676' },
    update: {},
    create: {
      code: '002676',
      marking: 'D28xL129_Only Looks',
      name: 'Туба LOOKS 50 мл D 28 мм металлическая',
    },
  });
  console.log(production1);

  const production2 = await prisma.production.upsert({
    where: { code: '030874' },
    update: {},
    create: {
      code: '030874',
      marking: 'D28xL129_Love',
      name: 'Туба LOVE 50 мл D 28 мм металлическая',
    },
  });
  console.log(production2);

  const production3 = await prisma.production.upsert({
    where: { code: '011291' },
    update: {},
    create: {
      code: '011291',
      marking: 'D28xL129_Celebrity',
      name: 'Туба CELEBRITY 50 мл D 28 мм металлическая',
    },
  });
  console.log(production3);

  const conveyor1 = await prisma.conveyor.upsert({
    where: { name: '201' },
    update: {},
    create: {
      name: '201',
    },
  });
  console.log(conveyor1);

  const batch1 = await prisma.batch.upsert({
    where: { name: '123A5' },
    update: {},
    create: {
      name: '123A5',
    },
  });

  console.log(batch1);

  const summary1 = await prisma.summary.create({
    data: {
      production_id: production1.id,
      batch_id: batch1.id,
      conveyor_id: conveyor1.id,
      plan: 40000,
    },
  });
  console.log(summary1);

  const extr_hw_pm_val_rec1 =
    await prisma.extrusionHardwareTresholdsRecord.create({
      data: {
        production_id: production1.id,
        press_speed_min: 70,
        press_speed_max: 80,
        blow_time_min: 13,
        blow_time_max: 20,
        turning_machine_speed_min: 70,
        turning_machine_speed_max: 83,
        annealing_furnace_temp_min: 380,
        annealing_furnace_temp_max: 420,
      },
    });

  console.log(extr_hw_pm_val_rec1);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
