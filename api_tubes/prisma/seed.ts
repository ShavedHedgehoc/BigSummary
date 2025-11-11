import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  //conveyors
  const conveyor1 = await prisma.conveyor.upsert({
    where: { name: "201" },
    update: {},
    create: {
      name: "201",
    },
  });
  console.log(conveyor1);

  const conveyor2 = await prisma.conveyor.upsert({
    where: { name: "202" },
    update: {},
    create: {
      name: "202",
    },
  });
  console.log(conveyor2);

  // employees
  const employee1 = await prisma.employee.upsert({
    where: { barcode: "1234567890123" },
    update: {},
    create: {
      name: "Иванов А.В.",
      barcode: "1234567890123",
    },
  });
  console.log(employee1);
  const employee2 = await prisma.employee.upsert({
    where: { barcode: "3234567890123" },
    update: {},
    create: {
      name: "Петров А.В.",
      barcode: "3234567890123",
    },
  });
  console.log(employee2);
  const employee3 = await prisma.employee.upsert({
    where: { barcode: "2000001416426" },
    update: {},
    create: {
      name: "Скрипковский М.Ю.",
      barcode: "2000001416426",
    },
  });
  console.log(employee3);

  // productions
  const production1 = await prisma.production.upsert({
    where: { code: "002676" },
    update: {},
    create: {
      code: "002676",
      marking: "D28xL129_Only Looks",
      name: "Туба LOOKS 50 мл D 28 мм металлическая",
    },
  });
  console.log(production1);

  const production2 = await prisma.production.upsert({
    where: { code: "030874" },
    update: {},
    create: {
      code: "030874",
      marking: "D28xL129_Love",
      name: "Туба LOVE 50 мл D 28 мм металлическая",
    },
  });
  console.log(production2);

  const production3 = await prisma.production.upsert({
    where: { code: "011291" },
    update: {},
    create: {
      code: "011291",
      marking: "D28xL129_Celebrity",
      name: "Туба CELEBRITY 50 мл D 28 мм металлическая",
    },
  });
  console.log(production3);

  const production4 = await prisma.production.upsert({
    where: { code: "062625" },
    update: {},
    create: {
      code: "062625",
      marking: "D28xL110_ALPHA",
      name: "Туба ALPHA 40 мл D 28 мм металлическая",
    },
  });
  console.log(production4);

  const production5 = await prisma.production.upsert({
    where: { code: "045771" },
    update: {},
    create: {
      code: "045771",
      marking: "D28xL149_Deluxe Silver",
      name: "Туба DE LUXE SILVER 60 мл D 28 мм металлическая",
    },
  });
  console.log(production5);

  const production6 = await prisma.production.upsert({
    where: { code: "057785" },
    update: {},
    create: {
      code: "057785",
      marking: "D28xL149_PE BASE",
      name: "Туба PRINCESS ESSEX BASE 60 мл D 28 мм металлическая 2023",
    },
  });
  console.log(production6);

  const production7 = await prisma.production.upsert({
    where: { code: "057814" },
    update: {},
    create: {
      code: "057814",
      marking: "D35xL160_Prince",
      name: "Туба PRINCE BASE 100 мл D 35 мм металлическая 2023",
    },
  });
  console.log(production7);

  const batch1 = await prisma.batch.upsert({
    where: { name: "123A5" },
    update: {},
    create: {
      name: "123A5",
    },
  });
  console.log(batch1);

  const batch2 = await prisma.batch.upsert({
    where: { name: "125A5" },
    update: {},
    create: {
      name: "125A5",
    },
  });
  console.log(batch2);

  const batch3 = await prisma.batch.upsert({
    where: { name: "127A5" },
    update: {},
    create: {
      name: "127A5",
    },
  });
  console.log(batch3);

  const summary1 = await prisma.summary.create({
    data: {
      production_id: production1.id,
      batch_id: batch1.id,
      conveyor_id: conveyor1.id,
      plan: 40000,
    },
  });
  console.log(summary1);

  const summary2 = await prisma.summary.create({
    data: {
      production_id: production2.id,
      batch_id: batch2.id,
      conveyor_id: conveyor1.id,
      plan: 40000,
    },
  });
  console.log(summary2);

  const summary3 = await prisma.summary.create({
    data: {
      production_id: production2.id,
      batch_id: batch3.id,
      conveyor_id: conveyor1.id,
      plan: 40000,
      isActive: true,
    },
  });
  console.log(summary3);

  const rondel1 = await prisma.rondelType.create({
    data: {
      value: "27.7/3.8",
    },
  });
  console.log(rondel1);

  const extr_hw_prm_val_rec1 = await prisma.extrusionHardwareParamsRecord.create({
    data: {
      summary_id: summary3.id,
      press_speed: 55,
      blow_time: 15,
      turning_machine_speed: 75,
      annealing_furnace_temp: 400,
      rondel_type_id: rondel1.id,
      employee_id: employee1.id,
    },
  });
  console.log(extr_hw_prm_val_rec1);

  const extr_hw_tsh_val_rec1 = await prisma.extrusionHardwareTresholdsRecord.create({
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
      rondel_type_id: rondel1.id,
    },
  });

  console.log(extr_hw_tsh_val_rec1);

  const extr_hw_tsh_val_rec2 = await prisma.extrusionHardwareTresholdsRecord.create({
    data: {
      production_id: production2.id,
      press_speed_min: 70,
      press_speed_max: 80,
      blow_time_min: 13,
      blow_time_max: 20,
      turning_machine_speed_min: 70,
      turning_machine_speed_max: 83,
      annealing_furnace_temp_min: 380,
      annealing_furnace_temp_max: 420,
      rondel_type_id: rondel1.id,
    },
  });

  console.log(extr_hw_tsh_val_rec2);

  const extr_hw_tsh_val_rec3 = await prisma.extrusionHardwareTresholdsRecord.create({
    data: {
      production_id: production3.id,
      press_speed_min: 70,
      press_speed_max: 80,
      blow_time_min: 13,
      blow_time_max: 20,
      turning_machine_speed_min: 70,
      turning_machine_speed_max: 83,
      annealing_furnace_temp_min: 380,
      annealing_furnace_temp_max: 400,
      rondel_type_id: rondel1.id,
    },
  });

  console.log(extr_hw_tsh_val_rec3);

  const extr_hw_tsh_val_rec4 = await prisma.extrusionHardwareTresholdsRecord.create({
    data: {
      production_id: production4.id,
      press_speed_min: 70,
      press_speed_max: 80,
      blow_time_min: 13,
      blow_time_max: 20,
      turning_machine_speed_min: 70,
      turning_machine_speed_max: 83,
      annealing_furnace_temp_min: 380,
      annealing_furnace_temp_max: 395,
      rondel_type_id: rondel1.id,
    },
  });

  console.log(extr_hw_tsh_val_rec4);

  const extr_hw_tsh_val_rec5 = await prisma.extrusionHardwareTresholdsRecord.create({
    data: {
      production_id: production5.id,
      press_speed_min: 70,
      press_speed_max: 80,
      blow_time_min: 13,
      blow_time_max: 20,
      turning_machine_speed_min: 70,
      turning_machine_speed_max: 83,
      annealing_furnace_temp_min: 380,
      annealing_furnace_temp_max: 420,
      rondel_type_id: rondel1.id,
    },
  });

  console.log(extr_hw_tsh_val_rec5);

  const extr_hw_tsh_val_rec6 = await prisma.extrusionHardwareTresholdsRecord.create({
    data: {
      production_id: production6.id,
      press_speed_min: 70,
      press_speed_max: 80,
      blow_time_min: 13,
      blow_time_max: 20,
      turning_machine_speed_min: 70,
      turning_machine_speed_max: 83,
      annealing_furnace_temp_min: 380,
      annealing_furnace_temp_max: 410,
      rondel_type_id: rondel1.id,
    },
  });

  console.log(extr_hw_tsh_val_rec6);

  const extr_hw_tsh_val_rec7 = await prisma.extrusionHardwareTresholdsRecord.create({
    data: {
      production_id: production7.id,
      press_speed_min: 70,
      press_speed_max: 80,
      blow_time_min: 13,
      blow_time_max: 15,
      turning_machine_speed_min: 70,
      turning_machine_speed_max: 83,
      annealing_furnace_temp_min: 370,
      annealing_furnace_temp_max: 390,
      rondel_type_id: rondel1.id,
    },
  });

  console.log(extr_hw_tsh_val_rec7);

  // raw materials
  const raw_material_1 = await prisma.rawMaterial.create({
    data: {
      code: "068866",
      name: "Рондоль D28*L129 ИНКОМПРО (27,7*3,8 мм)",
      post_number: 1,
    },
  });
  console.log(raw_material_1);

  const raw_material_2 = await prisma.rawMaterial.create({
    data: {
      code: "067792",
      name: "Cтеарат цинка",
      post_number: 1,
    },
  });
  console.log(raw_material_2);

  const summary_raw_materials_1 = await prisma.summaryRawMaterialRecord.create({
    data: {
      summary_id: summary3.id,
      raw_material_id: raw_material_1.id,
    },
  });
  console.log(summary_raw_materials_1);

  const summary_raw_materials_2 = await prisma.summaryRawMaterialRecord.create({
    data: {
      summary_id: summary3.id,
      raw_material_id: raw_material_2.id,
    },
  });
  console.log(summary_raw_materials_2);

  const chief_note_1 = await prisma.chiefTechnologistNote.create({
    data: {
      summary_id: summary3.id,
      note: "Обратите внимание на то, на что надо обратить внимание. Делайте то, что нужно делать, а то, что не нужно - не делайте. Зенит-чемпион!",
    },
  });
  console.log(chief_note_1);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
