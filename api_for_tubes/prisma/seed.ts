import { PrismaClient, StationPosition } from '@prisma/client';

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

  const line1 = await prisma.line.upsert({
    where: { name: '201' },
    update: {},
    create: {
      name: '201',
    },
  });
  console.log(line1);

  const line2 = await prisma.line.upsert({
    where: { name: '202' },
    update: {},
    create: {
      name: '202',
    },
  });
  console.log(line2);

  const Station1 = await prisma.station.upsert({
    where: {
      position_line_id: { position: StationPosition.Press, line_id: line1.id },
    },
    update: {},
    create: {
      position: StationPosition.Press,
      line_id: line1.id,
    },
  });

  const Station2 = await prisma.station.upsert({
    where: {
      position_line_id: { position: StationPosition.Lacque, line_id: line1.id },
    },
    update: {},
    create: {
      position: StationPosition.Lacque,
      line_id: line1.id,
    },
  });

  const Station3 = await prisma.station.upsert({
    where: {
      position_line_id: { position: StationPosition.Caps, line_id: line1.id },
    },
    update: {},
    create: {
      position: StationPosition.Caps,
      line_id: line1.id,
    },
  });

  const Station4 = await prisma.station.upsert({
    where: {
      position_line_id: { position: StationPosition.Offset, line_id: line1.id },
    },
    update: {},
    create: {
      position: StationPosition.Offset,
      line_id: line1.id,
    },
  });

  const Station5 = await prisma.station.upsert({
    where: {
      position_line_id: { position: StationPosition.Press, line_id: line2.id },
    },
    update: {},
    create: {
      position: StationPosition.Press,
      line_id: line2.id,
    },
  });

  const Station6 = await prisma.station.upsert({
    where: {
      position_line_id: { position: StationPosition.Lacque, line_id: line2.id },
    },
    update: {},
    create: {
      position: StationPosition.Lacque,
      line_id: line2.id,
    },
  });

  const Station7 = await prisma.station.upsert({
    where: {
      position_line_id: { position: StationPosition.Caps, line_id: line2.id },
    },
    update: {},
    create: {
      position: StationPosition.Caps,
      line_id: line2.id,
    },
  });

  const Station8 = await prisma.station.upsert({
    where: {
      position_line_id: { position: StationPosition.Offset, line_id: line2.id },
    },
    update: {},
    create: {
      position: StationPosition.Offset,
      line_id: line2.id,
    },
  });

  const MaterailArr = [
    { code: '063754', name: 'Бушон РК 214F, белый (LOVE, CELEBRITY)' },
    { code: '069579', name: 'Бушон РК 214F, черный (ESSEX)' },
    { code: '070321', name: 'Бушон РК 214F цвет 9-108, серый (LOOKS)' },
    { code: '063755', name: 'Бушон РК делюкс-28, черный (DL, SILVER)' },
    { code: '063756', name: 'Бушон РК делюкс-35, черный (PRINCE)' },
    { code: '068813', name: 'Рондоль D28*L129 АЛЮМАР (27,7*3,4 мм) ' },
    { code: '068866', name: 'Рондоль D28*L129 ИНКОМПРО (27,7*3,8 мм)' },
    { code: '069527', name: 'Рондоль D28*L129 NEUMAN (27,7*3,8 мм)' },
    {
      code: '069849',
      name: 'Рондоль D28*L129 ориентированная галтованная ИНКОМПРО (27,7*3,8 мм)',
    },
    {
      code: '069850',
      name: 'Рондоль D28*L129 ориентированная дробеструйная ИНКОМПРО (27,7*3,8 мм)',
    },
    { code: '068812', name: 'Рондоль D28*L149 АЛЮМАР (27,7*3,7 мм)' },
    { code: '068867', name: 'Рондоль D28*L149 ИНКОМПРО (27,7*4,0 мм)' },
    { code: '069528', name: 'Рондоль D28*L149 NEUMAN (27,7*4,2 мм)' },
    { code: '068811', name: 'Рондоль D35*L160 АЛЮМАР (34,75*3,6 мм)' },
    { code: '068868', name: 'Рондоль D35*L160 ИНКОМПРО(34,7*3,8 мм)' },
    { code: '069529', name: 'Рондоль D35*L160 NEUMAN (34,7*4,2 мм)' },
    { code: '068972', name: 'Внутренний лак бежевый VPL NOVACAN T-IL300' },
    { code: '069530', name: 'Внутренний лак бежевый METLAC 716401' },
    {
      code: '069531',
      name: 'Внутренний лак золотистый METALL DECOR SJ-3701785',
    },
    {
      code: '068817',
      name: 'Растворитель для внутреннего лака  VPL NOVACAN V200',
    },
    { code: '069532', name: 'Растворитель для внутреннего лака METLAC 766015' },
    {
      code: '069533',
      name: 'Растворитель для внутреннего лака METALL DECOR RS-1',
    },
    { code: '068815', name: 'Внешний белый грунт VPL NOVACAN T-W 100/1' },
    { code: '069534', name: 'Внешний белый грунт METALL DECOR CC-4215' },
    { code: '068816', name: 'Внешний прозрачный грунт VPL NOVACAN C-EOE 160' },
    { code: '069535', name: 'Внешний прозрачный грунт METALL DECOR CC-4010' },
    {
      code: '069536',
      name: 'Растворитель для внешнего грунта VPL NOVACAN V600',
    },
    {
      code: '069537',
      name: 'Растворитель для внешнего грунта METALL DECOR BS-277',
    },
    { code: '068971', name: 'Латексная паста-герметик VPL NOVACAN T-D 125' },
    { code: '067792', name: 'Cтеарат цинка' },
    { code: '069538', name: 'Арахинат цинка (ZINKARACHINAT SW)' },
    { code: '068818', name: 'Краска Белая TV-900 Opaque white' },
    { code: '068822', name: 'Краска Голубая TV-Pantone 5117 Process Cyan C' },
    { code: '069336', name: 'Краска Оливково-серая TV-Pantone 8003C' },
    { code: '068819', name: 'Краска Серая TV-Pantone Cool Gray 7C' },
    { code: '069193', name: 'Краска Синия TV-Pantone 2758C' },
    { code: '068823', name: 'Краска Синяя TV-Pantone 302C' },
    { code: '068820', name: 'Краска Синяя TV-Pantone 7684C' },
    { code: '070177', name: 'Краска Тёмно-серая TV-Pantone 8604C' },
    { code: '068821', name: 'Краска Черная TV-9075 Black C' },
    { code: '056448', name: 'Пигмент Colorstream T10-02 Arctic Fire' },
  ];

  MaterailArr.forEach(async (item) => {
    await prisma.material.upsert({
      where: { code: item.code },
      update: {},
      create: {
        code: item.code,
        name: item.name,
      },
    });
  });

  //   const conveyor1 = await prisma.conveyor.upsert({
  //     where: { barcode: '1234567890123' },
  //     update: {},
  //     create: {
  //       name: '202',
  //       barcode: '1234567890123',
  //     },
  //   });
  //   console.log(conveyor1);
  //   const post1 = await prisma.post.upsert({
  //     where: { name: '1' },
  //     update: {},
  //     create: {
  //       name: '1',
  //     },
  //   });
  //   console.log(post1);
}
main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
