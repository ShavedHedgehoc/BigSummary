import { Specification } from "./../generated/prisma/index.d";
import { PrismaClient } from "../generated/prisma/client";
import { create } from "domain";

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
    where: { barcode: "2000005358418" },
    update: {},
    create: {
      name: "Проничев В.Л.",
      barcode: "2000005358418",
    },
  });
  console.log(employee1);
  const employee2 = await prisma.employee.upsert({
    where: { barcode: "2000001377208" },
    update: {},
    create: {
      name: "Ашихмин С.А.",
      barcode: "2000001377208",
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

  // raw materials
  const materials: { code: string; name: string; post_number: number }[] = [
    { code: "063754", name: "Бушон РК 214F, белый (LOVE, CELEBRITY)", post_number: 4 },
    { code: "069579", name: "Бушон РК 214F, черный (ESSEX)", post_number: 4 },
    { code: "070321", name: "Бушон РК 214F цвет 9-108, серый (LOOKS)", post_number: 4 },
    { code: "063755", name: "Бушон РК делюкс-28, черный (DL, SILVER)", post_number: 4 },
    { code: "063756", name: "Бушон РК делюкс-35, черный (PRINCE)", post_number: 4 },
    { code: "068813", name: "Рондоль D28*L129 АЛЮМАР (27,7*3,4 мм)", post_number: 1 },
    { code: "068866", name: "Рондоль D28*L129 ИНКОМПРО (27,7*3,8 мм) ориентированная", post_number: 1 },
    { code: "069527", name: "Рондоль D28*L129 NEUMAN (27,7*3,8 мм)", post_number: 1 },
    { code: "069528", name: "Рондоль D28*L149 NEUMAN (27,7*4,2 мм)", post_number: 1 },
    { code: "068811", name: "Рондоль D35*L160 АЛЮМАР (34,75*3,6 мм)", post_number: 1 },
    { code: "068868", name: "Рондоль D35*L160 ИНКОМПРО(34,7*3,8 мм)", post_number: 1 },
    { code: "069529", name: "Рондоль D35*L160 NEUMAN (34,7*4,2 мм)", post_number: 1 },
    { code: "068972", name: "Внутренний лак бежевый VPL NOVACAN T-IL300", post_number: 2 },
    { code: "069530", name: "Внутренний лак бежевый METLAC 716401", post_number: 2 },
    { code: "069531", name: "Внутренний лак золотистый METALL DECOR SJ-3701785", post_number: 2 },
    { code: "068817", name: "Растворитель для внутреннего лака  VPL NOVACAN V200", post_number: 2 },
    { code: "069532", name: "Растворитель для внутреннего лака METLAC 766015", post_number: 2 },
    { code: "069533", name: "Растворитель для внутреннего лака METALL DECOR RS-1", post_number: 2 },
    { code: "068815", name: "Внешний белый грунт VPL NOVACAN T-W 100/1", post_number: 3 },
    { code: "069534", name: "Внешний белый грунт METALL DECOR CC-4215", post_number: 3 },
    { code: "068816", name: "Внешний прозрачный грунт VPL NOVACAN C-EOE 160", post_number: 3 },
    { code: "069535", name: "Внешний прозрачный грунт METALL DECOR CC-4010", post_number: 3 },
    { code: "069537", name: "Растворитель для внешнего грунта METALL DECOR BS-277", post_number: 3 },
    { code: "068971", name: "Латексная паста-герметик VPL NOVACAN T-D 125", post_number: 4 },
    { code: "071056", name: "Латексная паста-герметик ЛПУ-3М ВВ", post_number: 4 },
    { code: "071076", name: "Дисперсия акриловая Акрэмос 306", post_number: 4 },
    { code: "067792", name: "Cтеарат цинка", post_number: 1 },
    { code: "069538", name: "Арахинат цинка (ZINKARACHINAT SW)", post_number: 1 },
    { code: "068818", name: "Краска Белая TV-900 Opaque white	", post_number: 3 },
    { code: "068822", name: "Краска Голубая TV-Pantone 5117 Process Cyan C", post_number: 3 },
    { code: "071055", name: "Краска Золотая TV-Pantone 876C", post_number: 3 },
    { code: "069336", name: "Краска Оливково-серая TV-Pantone 8003C	", post_number: 3 },
    { code: "071240", name: "Краска TV-3110 Orange 021C", post_number: 3 },
    { code: "068819", name: "Краска Серая TV-Pantone Cool Gray 7C", post_number: 3 },
    { code: "071241", name: "Краска TV-Pantone 10394C", post_number: 3 },
    { code: "071054", name: "Краска Синяя TV-Pantone 2387C", post_number: 3 },
    { code: "069193", name: "Краска Синия TV-Pantone 2758C", post_number: 3 },
    { code: "068823", name: "Краска Синяя TV-Pantone 302C", post_number: 3 },
    { code: "068820", name: "Краска Синяя TV-Pantone 7684C", post_number: 3 },
    { code: "070177", name: "Краска Тёмно-серая TV-Pantone 8604C", post_number: 3 },
    { code: "068821", name: "Краска Черная TV-9075 Black C", post_number: 3 },
    { code: "056448", name: "Пигмент Colorstream T10-02 Arctic Fire", post_number: 3 },
  ];

  for (let index = 0; index < materials.length; index++) {
    await prisma.material.create({
      data: materials[index],
    });
  }
  const rondel1 = await prisma.rondel.create({
    data: {
      value: "27.7/3.4",
    },
  });
  console.log(rondel1);

  const rondel2 = await prisma.rondel.create({
    data: {
      value: "27.7/3.8",
    },
  });
  console.log(rondel2);

  const rondel3 = await prisma.rondel.create({
    data: {
      value: "27.7/4.2",
    },
  });
  console.log(rondel3);

  const rondel4 = await prisma.rondel.create({
    data: {
      value: "34.75/3.6",
    },
  });
  console.log(rondel4);

  const rondel5 = await prisma.rondel.create({
    data: {
      value: "34.7/3.8",
    },
  });
  console.log(rondel5);

  const rondel6 = await prisma.rondel.create({
    data: {
      value: "34.7/4.2",
    },
  });
  console.log(rondel6);

  // products
  const product1 = await prisma.product.upsert({
    where: { code: "002676" },
    update: {},
    create: {
      code: "002676",
      marking: "D28xL129_Only Looks",
      name: "Туба LOOKS 50 мл D 28 мм металлическая",
      extrusion_tresholds: {
        create: [
          {
            press_speed_min: 70,
            press_speed_max: 80,
            blow_time_min: 13,
            blow_time_max: 20,
            turning_machine_speed_min: 70,
            turning_machine_speed_max: 83,
            annealing_furnace_temp_min: 380,
            annealing_furnace_temp_max: 420,
            rondel_id: rondel1.id,
            tube_cilindrical_section_length_min: 128,
            tube_cilindrical_section_length_max: 130,
            membrane_thickness_min: 0.06,
            membrane_thickness_max: 0.13,
            tube_diameter_min: 27.9,
            tube_diameter_max: 28.2,
            tube_cilindrical_section_thickness_min: 0.09,
            tube_cilindrical_section_thickness_max: 0.16,
            tube_rigidity_min: 4,
            tube_rigidity_max: 8,
            external_thread_value: "М11х1.5",
          },
        ],
      },
      varnish_tresholds: {
        create: [
          {
            varnish_machine_speed_min: 75,
            varnish_machine_speed_max: 83,
            total_air_pressure_min: 6.3,
            total_air_pressure_max: 7,
            feed_can_air_pressure_min: 3.5,
            feed_can_air_pressure_max: 4,
            nozzle_regulator_air_pressure_min: 3.5,
            nozzle_regulator_air_pressure_max: 4.5,
            cells_speed_min: 1000,
            cells_speed_max: 1200,
            injection_a_start_position_min: 1600,
            injection_a_start_position_max: 2400,
            injection_b_start_position_min: 1600,
            injection_b_start_position_max: 2400,
            injection_c_start_position_min: 2200,
            injection_c_start_position_max: 2800,
            injection_d_start_position_min: 2200,
            injection_d_start_position_max: 2800,
            injection_a_end_position_min: 4000,
            injection_a_end_position_max: 4200,
            injection_b_end_position_min: 4000,
            injection_b_end_position_max: 4200,
            injection_c_end_position_min: 4000,
            injection_c_end_position_max: 4200,
            injection_d_end_position_min: 4000,
            injection_d_end_position_max: 4200,
            tube_molding_start_position_min: 580,
            tube_molding_start_position_max: 620,
            tube_molding_end_position_min: 2980,
            tube_molding_end_position_max: 3100,
            polimerization_furnace_temp_min: 280,
            polimerization_furnace_temp_max: 325,
            internal_varnish_porosity_min: 0,
            internal_varnish_porosity_max: 15,
          },
        ],
      },
      offset_tresholds: {
        create: [
          {
            printing_machine_speed_min: 75,
            printing_machine_speed_max: 85,
            total_air_pressure_min: 6,
            total_air_pressure_max: 7,
            padding_furnace_temp_min: 155,
            padding_furnace_temp_max: 175,
            offset_furnace_temp_min: 155,
            offset_furnace_temp_max: 175,
            printer_motor_min: 450,
            printer_motor_max: 560,
            base_covers_holders_motor_min: 1000,
            base_covers_holders_motor_max: 1350,
            base_covers_station_motor_min: 450,
            base_covers_station_motor_max: 620,
            // imprint_quantity_printed_box_1_min :0,
            // imprint_quantity_printed_box_1_max :0,
            // imprint_quantity_printed_box_2_min :0,
            // imprint_quantity_printed_box_2_max :0,
            imprint_quantity_printed_box_3_min: 25,
            imprint_quantity_printed_box_3_max: 35,
            // imprint_quantity_printed_box_4_min: 7,
            // imprint_quantity_printed_box_4_max: 15,
            // imprint_quantity_printed_box_5_min :0,
            // imprint_quantity_printed_box_5_max :0,
            // imprint_quantity_printed_box_6_min :0,
            // imprint_quantity_printed_box_6_max :0,
            ink_supply_time_min: 0.4,
            ink_supply_time_max: 1.0,
          },
        ],
      },
      sealant_tresholds: {
        create: [
          {
            cap_machine_speed_min: 70,
            cap_machine_speed_max: 85,
            total_air_pressure_min: 6,
            total_air_pressure_max: 7,
            holders_forward_min: 3400,
            holders_forward_max: 3700,
            holders_opening_left_min: 350,
            holders_opening_left_max: 450,
            holders_opening_right_min: 350,
            holders_opening_right_max: 450,
            holders_closing_min: 1150,
            holders_closing_max: 1250,
            injection_a_start_min: 3450,
            injection_a_start_max: 3530,
            injection_b_start_min: 3450,
            injection_b_start_max: 3530,
            injection_a_end_min: 3750,
            injection_a_end_max: 3830,
            injection_b_end_min: 3750,
            injection_b_end_max: 3830,
            injection_tube_orientation_start_min: 1450,
            injection_tube_orientation_start_max: 1520,
            injection_tube_orientation_end_min: 3000,
            injection_tube_orientation_end_max: 3100,
            latex_ring_padding_min: 3,
            latex_ring_padding_max: 4,
            latex_ring_width_min: 8,
            latex_ring_width_max: 12,
            tube_rigidity_min: 8,
            tube_rigidity_max: 13,
            cap_unscrewing_torque_min: 5,
            cap_unscrewing_torque_max: 30,
          },
        ],
      },
    },
  });
  console.log(product1);

  const product2 = await prisma.product.upsert({
    where: { code: "030874" },
    update: {},
    create: {
      code: "030874",
      marking: "D28xL129_Love",
      name: "Туба LOVE 50 мл D 28 мм металлическая",
      extrusion_tresholds: {
        create: [
          {
            press_speed_min: 70,
            press_speed_max: 80,
            blow_time_min: 13,
            blow_time_max: 20,
            turning_machine_speed_min: 70,
            turning_machine_speed_max: 83,
            annealing_furnace_temp_min: 380,
            annealing_furnace_temp_max: 420,
            rondel_id: rondel1.id,
            tube_cilindrical_section_length_min: 128,
            tube_cilindrical_section_length_max: 130,
            membrane_thickness_min: 0.06,
            membrane_thickness_max: 0.13,
            tube_diameter_min: 27.9,
            tube_diameter_max: 28.2,
            tube_cilindrical_section_thickness_min: 0.09,
            tube_cilindrical_section_thickness_max: 0.16,
            tube_rigidity_min: 4,
            tube_rigidity_max: 8,
            external_thread_value: "М11х1.5",
          },
        ],
      },
      varnish_tresholds: {
        create: [
          {
            varnish_machine_speed_min: 75,
            varnish_machine_speed_max: 83,
            total_air_pressure_min: 6.3,
            total_air_pressure_max: 7,
            feed_can_air_pressure_min: 3.5,
            feed_can_air_pressure_max: 4,
            nozzle_regulator_air_pressure_min: 3.5,
            nozzle_regulator_air_pressure_max: 4.5,
            cells_speed_min: 1000,
            cells_speed_max: 1200,
            injection_a_start_position_min: 1600,
            injection_a_start_position_max: 2400,
            injection_b_start_position_min: 1600,
            injection_b_start_position_max: 2400,
            injection_c_start_position_min: 2200,
            injection_c_start_position_max: 2800,
            injection_d_start_position_min: 2200,
            injection_d_start_position_max: 2800,
            injection_a_end_position_min: 4000,
            injection_a_end_position_max: 4200,
            injection_b_end_position_min: 4000,
            injection_b_end_position_max: 4200,
            injection_c_end_position_min: 4000,
            injection_c_end_position_max: 4200,
            injection_d_end_position_min: 4000,
            injection_d_end_position_max: 4200,
            tube_molding_start_position_min: 580,
            tube_molding_start_position_max: 620,
            tube_molding_end_position_min: 2980,
            tube_molding_end_position_max: 3100,
            polimerization_furnace_temp_min: 280,
            polimerization_furnace_temp_max: 325,
            internal_varnish_porosity_min: 0,
            internal_varnish_porosity_max: 15,
          },
        ],
      },
      offset_tresholds: {
        create: [
          {
            printing_machine_speed_min: 75,
            printing_machine_speed_max: 85,
            total_air_pressure_min: 6,
            total_air_pressure_max: 7,
            padding_furnace_temp_min: 155,
            padding_furnace_temp_max: 175,
            offset_furnace_temp_min: 155,
            offset_furnace_temp_max: 175,
            printer_motor_min: 450,
            printer_motor_max: 620,
            base_covers_holders_motor_min: 800,
            base_covers_holders_motor_max: 1250,
            base_covers_station_motor_min: 450,
            base_covers_station_motor_max: 820,
            // imprint_quantity_printed_box_1_min :0,
            // imprint_quantity_printed_box_1_max :0,
            // imprint_quantity_printed_box_2_min :0,
            // imprint_quantity_printed_box_2_max :0,
            imprint_quantity_printed_box_3_min: 7,
            imprint_quantity_printed_box_3_max: 15,
            imprint_quantity_printed_box_4_min: 7,
            imprint_quantity_printed_box_4_max: 15,
            // imprint_quantity_printed_box_5_min :0,
            // imprint_quantity_printed_box_5_max :0,
            // imprint_quantity_printed_box_6_min :0,
            // imprint_quantity_printed_box_6_max :0,
            ink_supply_time_min: 0.4,
            ink_supply_time_max: 1.0,
          },
        ],
      },
      sealant_tresholds: {
        create: [
          {
            cap_machine_speed_min: 70,
            cap_machine_speed_max: 85,
            total_air_pressure_min: 6,
            total_air_pressure_max: 7,
            holders_forward_min: 3400,
            holders_forward_max: 3700,
            holders_opening_left_min: 350,
            holders_opening_left_max: 450,
            holders_opening_right_min: 350,
            holders_opening_right_max: 450,
            holders_closing_min: 1150,
            holders_closing_max: 1250,
            injection_a_start_min: 3450,
            injection_a_start_max: 3530,
            injection_b_start_min: 3450,
            injection_b_start_max: 3530,
            injection_a_end_min: 3750,
            injection_a_end_max: 3830,
            injection_b_end_min: 3750,
            injection_b_end_max: 3830,
            injection_tube_orientation_start_min: 1450,
            injection_tube_orientation_start_max: 1520,
            injection_tube_orientation_end_min: 3000,
            injection_tube_orientation_end_max: 3100,
            latex_ring_padding_min: 3,
            latex_ring_padding_max: 4,
            latex_ring_width_min: 8,
            latex_ring_width_max: 12,
            tube_rigidity_min: 8,
            tube_rigidity_max: 13,
            cap_unscrewing_torque_min: 5,
            cap_unscrewing_torque_max: 30,
          },
        ],
      },
    },
  });
  console.log(product2);

  const product3 = await prisma.product.upsert({
    where: { code: "011291" },
    update: {},
    create: {
      code: "011291",
      marking: "D28xL129_Celebrity",
      name: "Туба CELEBRITY 50 мл D 28 мм металлическая",
      extrusion_tresholds: {
        create: [
          {
            press_speed_min: 70,
            press_speed_max: 80,
            blow_time_min: 13,
            blow_time_max: 20,
            turning_machine_speed_min: 70,
            turning_machine_speed_max: 83,
            annealing_furnace_temp_min: 380,
            annealing_furnace_temp_max: 400,
            rondel_id: rondel1.id,
            tube_cilindrical_section_length_min: 128,
            tube_cilindrical_section_length_max: 130,
            membrane_thickness_min: 0.06,
            membrane_thickness_max: 0.13,
            tube_diameter_min: 27.9,
            tube_diameter_max: 28.2,
            tube_cilindrical_section_thickness_min: 0.09,
            tube_cilindrical_section_thickness_max: 0.16,
            tube_rigidity_min: 4,
            tube_rigidity_max: 8,
            external_thread_value: "М11х1.5",
          },
        ],
      },
      varnish_tresholds: {
        create: [
          {
            varnish_machine_speed_min: 75,
            varnish_machine_speed_max: 83,
            total_air_pressure_min: 6.3,
            total_air_pressure_max: 7,
            feed_can_air_pressure_min: 3.5,
            feed_can_air_pressure_max: 4,
            nozzle_regulator_air_pressure_min: 3.5,
            nozzle_regulator_air_pressure_max: 4.5,
            cells_speed_min: 1500,
            cells_speed_max: 1700,
            injection_a_start_position_min: 1600,
            injection_a_start_position_max: 2400,
            injection_b_start_position_min: 1600,
            injection_b_start_position_max: 2400,
            injection_c_start_position_min: 2200,
            injection_c_start_position_max: 2800,
            injection_d_start_position_min: 2200,
            injection_d_start_position_max: 2800,
            injection_a_end_position_min: 4000,
            injection_a_end_position_max: 4200,
            injection_b_end_position_min: 4000,
            injection_b_end_position_max: 4200,
            injection_c_end_position_min: 4000,
            injection_c_end_position_max: 4200,
            injection_d_end_position_min: 4000,
            injection_d_end_position_max: 4200,
            tube_molding_start_position_min: 580,
            tube_molding_start_position_max: 620,
            tube_molding_end_position_min: 2980,
            tube_molding_end_position_max: 3000,
            polimerization_furnace_temp_min: 280,
            polimerization_furnace_temp_max: 325,
            internal_varnish_porosity_min: 0,
            internal_varnish_porosity_max: 15,
          },
        ],
      },
      offset_tresholds: {
        create: [
          {
            printing_machine_speed_min: 75,
            printing_machine_speed_max: 85,
            total_air_pressure_min: 6,
            total_air_pressure_max: 7,
            padding_furnace_temp_min: 155,
            padding_furnace_temp_max: 175,
            offset_furnace_temp_min: 155,
            offset_furnace_temp_max: 175,
            printer_motor_min: 400,
            printer_motor_max: 600,
            base_covers_holders_motor_min: 400,
            base_covers_holders_motor_max: 600,
            base_covers_station_motor_min: 400,
            base_covers_station_motor_max: 600,
            // imprint_quantity_printed_box_1_min :0,
            // imprint_quantity_printed_box_1_max :0,
            // imprint_quantity_printed_box_2_min :0,
            // imprint_quantity_printed_box_2_max :0,
            imprint_quantity_printed_box_3_min: 20,
            imprint_quantity_printed_box_3_max: 29,
            // imprint_quantity_printed_box_4_min: 7,
            // imprint_quantity_printed_box_4_max: 15,
            imprint_quantity_printed_box_5_min: 13,
            imprint_quantity_printed_box_5_max: 19,
            // imprint_quantity_printed_box_6_min :0,
            // imprint_quantity_printed_box_6_max :0,
            ink_supply_time_min: 1.0,
            ink_supply_time_max: 1.5,
          },
        ],
      },
      sealant_tresholds: {
        create: [
          {
            cap_machine_speed_min: 70,
            cap_machine_speed_max: 85,
            total_air_pressure_min: 6,
            total_air_pressure_max: 7,
            holders_forward_min: 3400,
            holders_forward_max: 3700,
            holders_opening_left_min: 350,
            holders_opening_left_max: 450,
            holders_opening_right_min: 350,
            holders_opening_right_max: 450,
            holders_closing_min: 1150,
            holders_closing_max: 1250,
            injection_a_start_min: 3450,
            injection_a_start_max: 3530,
            injection_b_start_min: 3450,
            injection_b_start_max: 3530,
            injection_a_end_min: 3750,
            injection_a_end_max: 3830,
            injection_b_end_min: 3750,
            injection_b_end_max: 3830,
            injection_tube_orientation_start_min: 1450,
            injection_tube_orientation_start_max: 1520,
            injection_tube_orientation_end_min: 3050,
            injection_tube_orientation_end_max: 3100,
            latex_ring_padding_min: 3,
            latex_ring_padding_max: 4,
            latex_ring_width_min: 8,
            latex_ring_width_max: 12,
            tube_rigidity_min: 8,
            tube_rigidity_max: 13,
            cap_unscrewing_torque_min: 5,
            cap_unscrewing_torque_max: 30,
          },
        ],
      },
    },
  });
  console.log(product3);

  const product4 = await prisma.product.upsert({
    where: { code: "062625" },
    update: {},
    create: {
      code: "062625",
      marking: "D28xL110_ALPHA",
      name: "Туба ALPHA 40 мл D 28 мм металлическая",
      extrusion_tresholds: {
        create: [
          {
            press_speed_min: 70,
            press_speed_max: 80,
            blow_time_min: 13,
            blow_time_max: 20,
            turning_machine_speed_min: 70,
            turning_machine_speed_max: 83,
            annealing_furnace_temp_min: 380,
            annealing_furnace_temp_max: 395,
            rondel_id: rondel1.id,
            tube_cilindrical_section_length_min: 109,
            tube_cilindrical_section_length_max: 111,
            membrane_thickness_min: 0.06,
            membrane_thickness_max: 0.13,
            tube_diameter_min: 27.9,
            tube_diameter_max: 28.2,
            tube_cilindrical_section_thickness_min: 0.09,
            tube_cilindrical_section_thickness_max: 0.16,
            tube_rigidity_min: 4,
            tube_rigidity_max: 8,
            external_thread_value: "М11х1.5",
          },
        ],
      },
      varnish_tresholds: {
        create: [
          {
            varnish_machine_speed_min: 75,
            varnish_machine_speed_max: 83,
            total_air_pressure_min: 6.3,
            total_air_pressure_max: 7,
            feed_can_air_pressure_min: 3.5,
            feed_can_air_pressure_max: 4,
            nozzle_regulator_air_pressure_min: 3.5,
            nozzle_regulator_air_pressure_max: 4.5,
            cells_speed_min: 1000,
            cells_speed_max: 1200,
            injection_a_start_position_min: 1600,
            injection_a_start_position_max: 2400,
            injection_b_start_position_min: 1600,
            injection_b_start_position_max: 2400,
            injection_c_start_position_min: 2200,
            injection_c_start_position_max: 2800,
            injection_d_start_position_min: 2200,
            injection_d_start_position_max: 2800,
            injection_a_end_position_min: 3600,
            injection_a_end_position_max: 3800,
            injection_b_end_position_min: 3600,
            injection_b_end_position_max: 3800,
            injection_c_end_position_min: 3600,
            injection_c_end_position_max: 3800,
            injection_d_end_position_min: 3600,
            injection_d_end_position_max: 3800,
            tube_molding_start_position_min: 500,
            tube_molding_start_position_max: 600,
            tube_molding_end_position_min: 4000,
            tube_molding_end_position_max: 4500,
            polimerization_furnace_temp_min: 280,
            polimerization_furnace_temp_max: 320,
            internal_varnish_porosity_min: 0,
            internal_varnish_porosity_max: 15,
          },
        ],
      },
      offset_tresholds: {
        create: [
          {
            printing_machine_speed_min: 75,
            printing_machine_speed_max: 85,
            total_air_pressure_min: 6,
            total_air_pressure_max: 7,
            padding_furnace_temp_min: 155,
            padding_furnace_temp_max: 175,
            offset_furnace_temp_min: 165,
            offset_furnace_temp_max: 175,
            printer_motor_min: 450,
            printer_motor_max: 620,
            base_covers_holders_motor_min: 1000,
            base_covers_holders_motor_max: 1100,
            base_covers_station_motor_min: 550,
            base_covers_station_motor_max: 620,
            // imprint_quantity_printed_box_1_min :0,
            // imprint_quantity_printed_box_1_max :0,
            // imprint_quantity_printed_box_2_min :0,
            // imprint_quantity_printed_box_2_max :0,
            imprint_quantity_printed_box_3_min: 11,
            imprint_quantity_printed_box_3_max: 16,
            imprint_quantity_printed_box_4_min: 3,
            imprint_quantity_printed_box_4_max: 7,
            // imprint_quantity_printed_box_5_min :0,
            // imprint_quantity_printed_box_5_max :0,
            // imprint_quantity_printed_box_6_min :0,
            // imprint_quantity_printed_box_6_max :0,
            ink_supply_time_min: 0.3,
            ink_supply_time_max: 0.8,
          },
        ],
      },
      sealant_tresholds: {
        create: [
          {
            cap_machine_speed_min: 70,
            cap_machine_speed_max: 85,
            total_air_pressure_min: 6,
            total_air_pressure_max: 7,
            holders_forward_min: 3400,
            holders_forward_max: 3700,
            holders_opening_left_min: 150,
            holders_opening_left_max: 300,
            holders_opening_right_min: 350,
            holders_opening_right_max: 450,
            holders_closing_min: 1150,
            holders_closing_max: 1250,
            injection_a_start_min: 2450,
            injection_a_start_max: 3560,
            injection_b_start_min: 2450,
            injection_b_start_max: 3560,
            injection_a_end_min: 2750,
            injection_a_end_max: 3930,
            injection_b_end_min: 2750,
            injection_b_end_max: 3930,
            injection_tube_orientation_start_min: 480,
            injection_tube_orientation_start_max: 550,
            injection_tube_orientation_end_min: 1800,
            injection_tube_orientation_end_max: 2200,
            latex_ring_padding_min: 3,
            latex_ring_padding_max: 4,
            latex_ring_width_min: 8,
            latex_ring_width_max: 12,
            tube_rigidity_min: 8,
            tube_rigidity_max: 13,
            cap_unscrewing_torque_min: 5,
            cap_unscrewing_torque_max: 35,
          },
        ],
      },
    },
  });
  console.log(product4);

  const product5 = await prisma.product.upsert({
    where: { code: "045771" },
    update: {},
    create: {
      code: "045771",
      marking: "D28xL149_Deluxe Silver",
      name: "Туба DE LUXE SILVER 60 мл D 28 мм металлическая",
      extrusion_tresholds: {
        create: [
          {
            press_speed_min: 70,
            press_speed_max: 80,
            blow_time_min: 13,
            blow_time_max: 20,
            turning_machine_speed_min: 70,
            turning_machine_speed_max: 83,
            annealing_furnace_temp_min: 380,
            annealing_furnace_temp_max: 420,
            rondel_id: rondel1.id,
            tube_cilindrical_section_length_min: 148,
            tube_cilindrical_section_length_max: 150,
            membrane_thickness_min: 0.06,
            membrane_thickness_max: 0.13,
            tube_diameter_min: 27.9,
            tube_diameter_max: 28.1,
            tube_cilindrical_section_thickness_min: 0.09,
            tube_cilindrical_section_thickness_max: 0.16,
            tube_rigidity_min: 4,
            tube_rigidity_max: 8,
            external_thread_value: "М11х1.5",
          },
        ],
      },
      varnish_tresholds: {
        create: [
          {
            varnish_machine_speed_min: 65,
            varnish_machine_speed_max: 83,
            total_air_pressure_min: 6.3,
            total_air_pressure_max: 7,
            feed_can_air_pressure_min: 3.5,
            feed_can_air_pressure_max: 4,
            nozzle_regulator_air_pressure_min: 3.5,
            nozzle_regulator_air_pressure_max: 4.0,
            cells_speed_min: 1000,
            cells_speed_max: 1200,
            injection_a_start_position_min: 1600,
            injection_a_start_position_max: 2400,
            injection_b_start_position_min: 1600,
            injection_b_start_position_max: 2400,
            injection_c_start_position_min: 2200,
            injection_c_start_position_max: 2800,
            injection_d_start_position_min: 2200,
            injection_d_start_position_max: 2800,
            injection_a_end_position_min: 4400,
            injection_a_end_position_max: 4800,
            injection_b_end_position_min: 4400,
            injection_b_end_position_max: 4800,
            injection_c_end_position_min: 4400,
            injection_c_end_position_max: 4800,
            injection_d_end_position_min: 4400,
            injection_d_end_position_max: 4800,
            tube_molding_start_position_min: 500,
            tube_molding_start_position_max: 650,
            tube_molding_end_position_min: 3000,
            tube_molding_end_position_max: 3100,
            polimerization_furnace_temp_min: 280,
            polimerization_furnace_temp_max: 320,
            internal_varnish_porosity_min: 0,
            internal_varnish_porosity_max: 15,
          },
        ],
      },
      offset_tresholds: {
        create: [
          {
            printing_machine_speed_min: 75,
            printing_machine_speed_max: 85,
            total_air_pressure_min: 6,
            total_air_pressure_max: 7,
            padding_furnace_temp_min: 155,
            padding_furnace_temp_max: 175,
            offset_furnace_temp_min: 155,
            offset_furnace_temp_max: 175,
            printer_motor_min: 450,
            printer_motor_max: 540,
            base_covers_holders_motor_min: 1000,
            base_covers_holders_motor_max: 1100,
            base_covers_station_motor_min: 550,
            base_covers_station_motor_max: 620,
            // imprint_quantity_printed_box_1_min :0,
            // imprint_quantity_printed_box_1_max :0,
            // imprint_quantity_printed_box_2_min :0,
            // imprint_quantity_printed_box_2_max :0,
            imprint_quantity_printed_box_3_min: 8,
            imprint_quantity_printed_box_3_max: 14,
            imprint_quantity_printed_box_4_min: 8,
            imprint_quantity_printed_box_4_max: 14,
            imprint_quantity_printed_box_5_min: 11,
            imprint_quantity_printed_box_5_max: 20,
            // imprint_quantity_printed_box_6_min :0,
            // imprint_quantity_printed_box_6_max :0,
            ink_supply_time_min: 1.0,
            ink_supply_time_max: 1.2,
          },
        ],
      },
      sealant_tresholds: {
        create: [
          {
            cap_machine_speed_min: 70,
            cap_machine_speed_max: 85,
            total_air_pressure_min: 6,
            total_air_pressure_max: 7,
            holders_forward_min: 3400,
            holders_forward_max: 3700,
            holders_opening_left_min: 350,
            holders_opening_left_max: 450,
            holders_opening_right_min: 350,
            holders_opening_right_max: 450,
            holders_closing_min: 1150,
            holders_closing_max: 1250,
            injection_a_start_min: 3450,
            injection_a_start_max: 3530,
            injection_b_start_min: 3450,
            injection_b_start_max: 3530,
            injection_a_end_min: 3750,
            injection_a_end_max: 3830,
            injection_b_end_min: 3750,
            injection_b_end_max: 3830,
            injection_tube_orientation_start_min: 1450,
            injection_tube_orientation_start_max: 1520,
            injection_tube_orientation_end_min: 3000,
            injection_tube_orientation_end_max: 3100,
            latex_ring_padding_min: 3,
            latex_ring_padding_max: 4,
            latex_ring_width_min: 8,
            latex_ring_width_max: 12,
            tube_rigidity_min: 8,
            tube_rigidity_max: 13,
            cap_unscrewing_torque_min: 5,
            cap_unscrewing_torque_max: 35,
          },
        ],
      },
    },
  });
  console.log(product5);

  const product6 = await prisma.product.upsert({
    where: { code: "057785" },
    update: {},
    create: {
      code: "057785",
      marking: "D28xL149_PE BASE",
      name: "Туба PRINCESS ESSEX BASE 60 мл D 28 мм металлическая 2023",
      extrusion_tresholds: {
        create: [
          {
            press_speed_min: 70,
            press_speed_max: 80,
            blow_time_min: 13,
            blow_time_max: 20,
            turning_machine_speed_min: 70,
            turning_machine_speed_max: 83,
            annealing_furnace_temp_min: 380,
            annealing_furnace_temp_max: 410,
            rondel_id: rondel1.id,
            tube_cilindrical_section_length_min: 148,
            tube_cilindrical_section_length_max: 150,
            membrane_thickness_min: 0.06,
            membrane_thickness_max: 0.13,
            tube_diameter_min: 27.9,
            tube_diameter_max: 28.1,
            tube_cilindrical_section_thickness_min: 0.09,
            tube_cilindrical_section_thickness_max: 0.16,
            tube_rigidity_min: 4,
            tube_rigidity_max: 8,
            external_thread_value: "М11х1.5",
          },
        ],
      },
      varnish_tresholds: {
        create: [
          {
            varnish_machine_speed_min: 65,
            varnish_machine_speed_max: 83,
            total_air_pressure_min: 6.3,
            total_air_pressure_max: 7,
            feed_can_air_pressure_min: 3.5,
            feed_can_air_pressure_max: 4,
            nozzle_regulator_air_pressure_min: 3.5,
            nozzle_regulator_air_pressure_max: 4.5,
            cells_speed_min: 1000,
            cells_speed_max: 1200,
            injection_a_start_position_min: 1600,
            injection_a_start_position_max: 2400,
            injection_b_start_position_min: 1600,
            injection_b_start_position_max: 2400,
            injection_c_start_position_min: 2200,
            injection_c_start_position_max: 2800,
            injection_d_start_position_min: 2200,
            injection_d_start_position_max: 2800,
            injection_a_end_position_min: 4400,
            injection_a_end_position_max: 4800,
            injection_b_end_position_min: 4400,
            injection_b_end_position_max: 4800,
            injection_c_end_position_min: 4400,
            injection_c_end_position_max: 4800,
            injection_d_end_position_min: 4400,
            injection_d_end_position_max: 4800,
            tube_molding_start_position_min: 500,
            tube_molding_start_position_max: 650,
            tube_molding_end_position_min: 3000,
            tube_molding_end_position_max: 3100,
            polimerization_furnace_temp_min: 280,
            polimerization_furnace_temp_max: 320,
            internal_varnish_porosity_min: 0,
            internal_varnish_porosity_max: 15,
          },
        ],
      },
      offset_tresholds: {
        create: [
          {
            printing_machine_speed_min: 75,
            printing_machine_speed_max: 85,
            total_air_pressure_min: 6,
            total_air_pressure_max: 7,
            padding_furnace_temp_min: 155,
            padding_furnace_temp_max: 175,
            offset_furnace_temp_min: 155,
            offset_furnace_temp_max: 175,
            printer_motor_min: 500,
            printer_motor_max: 620,
            base_covers_holders_motor_min: 1000,
            base_covers_holders_motor_max: 1300,
            base_covers_station_motor_min: 700,
            base_covers_station_motor_max: 850,
            // imprint_quantity_printed_box_1_min :0,
            // imprint_quantity_printed_box_1_max :0,
            imprint_quantity_printed_box_2_min: 25,
            imprint_quantity_printed_box_2_max: 50,
            imprint_quantity_printed_box_3_min: 4,
            imprint_quantity_printed_box_3_max: 10,
            imprint_quantity_printed_box_4_min: 4,
            imprint_quantity_printed_box_4_max: 7,
            imprint_quantity_printed_box_5_min: 4,
            imprint_quantity_printed_box_5_max: 7,
            // imprint_quantity_printed_box_6_min :0,
            // imprint_quantity_printed_box_6_max :0,
            ink_supply_time_min: 1.0,
            ink_supply_time_max: 1.5,
          },
        ],
      },
      sealant_tresholds: {
        create: [
          {
            cap_machine_speed_min: 70,
            cap_machine_speed_max: 85,
            total_air_pressure_min: 6,
            total_air_pressure_max: 7,
            holders_forward_min: 3200,
            holders_forward_max: 3900,
            holders_opening_left_min: 300,
            holders_opening_left_max: 370,
            holders_opening_right_min: 300,
            holders_opening_right_max: 370,
            holders_closing_min: 1100,
            holders_closing_max: 1250,
            injection_a_start_min: 3485,
            injection_a_start_max: 3490,
            injection_b_start_min: 3485,
            injection_b_start_max: 3490,
            injection_a_end_min: 3820,
            injection_a_end_max: 3820,
            injection_b_end_min: 3820,
            injection_b_end_max: 3820,
            injection_tube_orientation_start_min: 1400,
            injection_tube_orientation_start_max: 1550,
            injection_tube_orientation_end_min: 3000,
            injection_tube_orientation_end_max: 3300,
            latex_ring_padding_min: 3,
            latex_ring_padding_max: 4,
            latex_ring_width_min: 8,
            latex_ring_width_max: 12,
            tube_rigidity_min: 8,
            tube_rigidity_max: 13,
            cap_unscrewing_torque_min: 5,
            cap_unscrewing_torque_max: 30,
          },
        ],
      },
    },
  });
  console.log(product6);

  const product7 = await prisma.product.upsert({
    where: { code: "057814" },
    update: {},
    create: {
      code: "057814",
      marking: "D35xL160_Prince",
      name: "Туба PRINCE BASE 100 мл D 35 мм металлическая 2023",
      extrusion_tresholds: {
        create: [
          {
            press_speed_min: 70,
            press_speed_max: 80,
            blow_time_min: 13,
            blow_time_max: 15,
            turning_machine_speed_min: 70,
            turning_machine_speed_max: 83,
            annealing_furnace_temp_min: 370,
            annealing_furnace_temp_max: 390,
            rondel_id: rondel1.id,
            tube_cilindrical_section_length_min: 159,
            tube_cilindrical_section_length_max: 161,
            membrane_thickness_min: 0.06,
            membrane_thickness_max: 0.13,
            tube_diameter_min: 34.9,
            tube_diameter_max: 35.1,
            tube_cilindrical_section_thickness_min: 0.09,
            tube_cilindrical_section_thickness_max: 0.16,
            tube_rigidity_min: 8,
            tube_rigidity_max: 13,
            external_thread_value: "М11х1.5",
          },
        ],
      },
      varnish_tresholds: {
        create: [
          {
            varnish_machine_speed_min: 75,
            varnish_machine_speed_max: 85,
            total_air_pressure_min: 6.3,
            total_air_pressure_max: 7,
            feed_can_air_pressure_min: 3.5,
            feed_can_air_pressure_max: 4,
            nozzle_regulator_air_pressure_min: 3.5,
            nozzle_regulator_air_pressure_max: 4.0,
            cells_speed_min: 900,
            cells_speed_max: 1100,
            injection_a_start_position_min: 1600,
            injection_a_start_position_max: 2400,
            injection_b_start_position_min: 1600,
            injection_b_start_position_max: 2400,
            injection_c_start_position_min: 1800,
            injection_c_start_position_max: 2200,
            injection_d_start_position_min: 1800,
            injection_d_start_position_max: 2200,
            injection_a_end_position_min: 4400,
            injection_a_end_position_max: 4800,
            injection_b_end_position_min: 4400,
            injection_b_end_position_max: 4800,
            injection_c_end_position_min: 4400,
            injection_c_end_position_max: 4800,
            injection_d_end_position_min: 4400,
            injection_d_end_position_max: 4800,
            tube_molding_start_position_min: 500,
            tube_molding_start_position_max: 650,
            tube_molding_end_position_min: 3000,
            tube_molding_end_position_max: 3100,
            polimerization_furnace_temp_min: 280,
            polimerization_furnace_temp_max: 310,
            internal_varnish_porosity_min: 0,
            internal_varnish_porosity_max: 15,
          },
        ],
      },
      offset_tresholds: {
        create: [
          {
            printing_machine_speed_min: 75,
            printing_machine_speed_max: 85,
            total_air_pressure_min: 6,
            total_air_pressure_max: 7,
            padding_furnace_temp_min: 155,
            padding_furnace_temp_max: 175,
            offset_furnace_temp_min: 155,
            offset_furnace_temp_max: 175,
            printer_motor_min: 450,
            printer_motor_max: 540,
            base_covers_holders_motor_min: 1000,
            base_covers_holders_motor_max: 1100,
            base_covers_station_motor_min: 550,
            base_covers_station_motor_max: 620,
            // imprint_quantity_printed_box_1_min :0,
            // imprint_quantity_printed_box_1_max :0,
            imprint_quantity_printed_box_2_min: 8,
            imprint_quantity_printed_box_2_max: 14,
            imprint_quantity_printed_box_3_min: 40,
            imprint_quantity_printed_box_3_max: 49,
            imprint_quantity_printed_box_4_min: 13,
            imprint_quantity_printed_box_4_max: 19,
            imprint_quantity_printed_box_5_min: 25,
            imprint_quantity_printed_box_5_max: 37,
            // imprint_quantity_printed_box_6_min :0,
            // imprint_quantity_printed_box_6_max :0,
            ink_supply_time_min: 1.0,
            ink_supply_time_max: 1.8,
          },
        ],
      },
      sealant_tresholds: {
        create: [
          {
            cap_machine_speed_min: 70,
            cap_machine_speed_max: 85,
            total_air_pressure_min: 6,
            total_air_pressure_max: 7,
            holders_forward_min: 3400,
            holders_forward_max: 3600,
            holders_opening_left_min: 530,
            holders_opening_left_max: 630,
            holders_opening_right_min: 530,
            holders_opening_right_max: 630,
            holders_closing_min: 1500,
            holders_closing_max: 1600,
            injection_a_start_min: 2430,
            injection_a_start_max: 5412,
            injection_b_start_min: 2430,
            injection_b_start_max: 5412,
            injection_a_end_min: 2700,
            injection_a_end_max: 2950,
            injection_b_end_min: 2700,
            injection_b_end_max: 2950,
            injection_tube_orientation_start_min: 400,
            injection_tube_orientation_start_max: 550,
            injection_tube_orientation_end_min: 1800,
            injection_tube_orientation_end_max: 1200,
            latex_ring_padding_min: 3,
            latex_ring_padding_max: 4,
            latex_ring_width_min: 8,
            latex_ring_width_max: 12,
            tube_rigidity_min: 8,
            tube_rigidity_max: 19,
            cap_unscrewing_torque_min: 5,
            cap_unscrewing_torque_max: 50,
          },
        ],
      },
    },
  });
  console.log(product7);

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

  const batch4 = await prisma.batch.upsert({
    where: { name: "129A5" },
    update: {},
    create: {
      name: "129A5",
    },
  });
  console.log(batch4);

  const batch5 = await prisma.batch.upsert({
    where: { name: "131A5" },
    update: {},
    create: {
      name: "131A5",
    },
  });
  console.log(batch5);

  const batch6 = await prisma.batch.upsert({
    where: { name: "133A5" },
    update: {},
    create: {
      name: "133A5",
    },
  });
  console.log(batch6);

  const batch7 = await prisma.batch.upsert({
    where: { name: "137A5" },
    update: {},
    create: {
      name: "137A5",
    },
  });
  console.log(batch7);

  const summary1 = await prisma.summary.create({
    data: {
      product_id: product1.id,
      batch_id: batch1.id,
      conveyor_id: conveyor1.id,
      plan: 40000,
      isActive: true,
      specifications: {
        create: [
          { material: { connect: { code: "068866" } } },
          { material: { connect: { code: "067792" } } },
          { material: { connect: { code: "069530" } } },
          { material: { connect: { code: "068815" } } },
          { material: { connect: { code: "069537" } } },
          { material: { connect: { code: "070177" } } },
          { material: { connect: { code: "071056" } } },
          { material: { connect: { code: "071076" } } },
          { material: { connect: { code: "070321" } } },
        ],
      },
    },
  });
  console.log(summary1);

  const summary2 = await prisma.summary.create({
    data: {
      product_id: product2.id,
      batch_id: batch2.id,
      conveyor_id: conveyor2.id,
      plan: 40000,
      isActive: true,
      specifications: {
        create: [
          { material: { connect: { code: "068866" } } },
          { material: { connect: { code: "067792" } } },
          { material: { connect: { code: "068972" } } },
          { material: { connect: { code: "068815" } } },
          { material: { connect: { code: "069537" } } },
          { material: { connect: { code: "069193" } } },
          { material: { connect: { code: "071056" } } },
          { material: { connect: { code: "071076" } } },
          { material: { connect: { code: "063754" } } },
        ],
      },
    },
  });
  console.log(summary2);

  const summary3 = await prisma.summary.create({
    data: {
      product_id: product3.id,
      batch_id: batch3.id,
      conveyor_id: conveyor1.id,
      plan: 40000,
      specifications: {
        create: [
          { material: { connect: { code: "068866" } } },
          { material: { connect: { code: "067792" } } },
          { material: { connect: { code: "068972" } } },
          { material: { connect: { code: "068815" } } },
          { material: { connect: { code: "069537" } } },
          { material: { connect: { code: "068821" } } },
          { material: { connect: { code: "068819" } } },
          { material: { connect: { code: "071056" } } },
          { material: { connect: { code: "071076" } } },
          { material: { connect: { code: "063754" } } },
        ],
      },
    },
  });
  console.log(summary3);

  const summary4 = await prisma.summary.create({
    data: {
      product_id: product4.id,
      batch_id: batch4.id,
      conveyor_id: conveyor1.id,
      plan: 40000,
      specifications: {
        create: [
          { material: { connect: { code: "068813" } } },
          { material: { connect: { code: "067792" } } },
          { material: { connect: { code: "069530" } } },
          { material: { connect: { code: "068815" } } },
          { material: { connect: { code: "069537" } } },
          { material: { connect: { code: "068821" } } },
          { material: { connect: { code: "071056" } } },
          { material: { connect: { code: "071076" } } },
          { material: { connect: { code: "063755" } } },
        ],
      },
    },
  });
  console.log(summary4);

  const summary5 = await prisma.summary.create({
    data: {
      product_id: product5.id,
      batch_id: batch5.id,
      conveyor_id: conveyor1.id,
      plan: 40000,
      specifications: {
        create: [
          { material: { connect: { code: "068866" } } },
          { material: { connect: { code: "067792" } } },
          { material: { connect: { code: "069530" } } },
          { material: { connect: { code: "068815" } } },
          { material: { connect: { code: "069537" } } },
          { material: { connect: { code: "069336" } } },
          { material: { connect: { code: "068821" } } },
          { material: { connect: { code: "071056" } } },
          { material: { connect: { code: "071076" } } },
          { material: { connect: { code: "063755" } } },
        ],
      },
    },
  });
  console.log(summary5);

  const summary6 = await prisma.summary.create({
    data: {
      product_id: product6.id,
      batch_id: batch6.id,
      conveyor_id: conveyor1.id,
      plan: 40000,
      specifications: {
        create: [
          { material: { connect: { code: "068866" } } },
          { material: { connect: { code: "067792" } } },
          { material: { connect: { code: "068972" } } },
          { material: { connect: { code: "068815" } } },
          { material: { connect: { code: "069537" } } },
          { material: { connect: { code: "068821" } } },
          { material: { connect: { code: "068823" } } },
          { material: { connect: { code: "068822" } } },
          { material: { connect: { code: "071056" } } },
          { material: { connect: { code: "071076" } } },
          { material: { connect: { code: "069579" } } },
        ],
      },
    },
  });
  console.log(summary6);

  const summary7 = await prisma.summary.create({
    data: {
      product_id: product7.id,
      batch_id: batch7.id,
      conveyor_id: conveyor1.id,
      plan: 40000,
      specifications: {
        create: [
          { material: { connect: { code: "068868" } } },
          { material: { connect: { code: "067792" } } },
          { material: { connect: { code: "068972" } } },
          { material: { connect: { code: "068815" } } },
          { material: { connect: { code: "069537" } } },
          { material: { connect: { code: "068821" } } },
          { material: { connect: { code: "068823" } } },
          { material: { connect: { code: "068822" } } },
          { material: { connect: { code: "071056" } } },
          { material: { connect: { code: "071076" } } },
          { material: { connect: { code: "063756" } } },
        ],
      },
    },
  });
  console.log(summary7);

  const picture1 = await prisma.pictures.create({
    data: {
      product_id: product2.id,
      src: "030874.jpg",
    },
  });
  console.log(picture1);
  const picture2 = await prisma.pictures.create({
    data: {
      product_id: product2.id,
      src: "030874_1.jpg",
    },
  });
  console.log(picture2);

  const picture3 = await prisma.pictures.create({
    data: {
      product_id: product1.id,
      src: "002676.jpg",
    },
  });
  console.log(picture3);

  const picture4 = await prisma.pictures.create({
    data: {
      product_id: product1.id,
      src: "002676_1.jpg",
    },
  });
  console.log(picture4);

  const picture5 = await prisma.pictures.create({
    data: {
      product_id: product3.id,
      src: "011295.jpg",
    },
  });
  console.log(picture5);

  const picture6 = await prisma.pictures.create({
    data: {
      product_id: product3.id,
      src: "011295_1.jpg",
    },
  });
  console.log(picture6);

  const picture7 = await prisma.pictures.create({
    data: {
      product_id: product4.id,
      src: "062625.jpg",
    },
  });
  console.log(picture7);

  const picture8 = await prisma.pictures.create({
    data: {
      product_id: product4.id,
      src: "062625_1.jpg",
    },
  });
  console.log(picture8);

  const picture9 = await prisma.pictures.create({
    data: {
      product_id: product5.id,
      src: "045771.jpg",
    },
  });
  console.log(picture9);

  const picture10 = await prisma.pictures.create({
    data: {
      product_id: product5.id,
      src: "045771_1.jpg",
    },
  });
  console.log(picture10);

  const picture11 = await prisma.pictures.create({
    data: {
      product_id: product6.id,
      src: "057785.jpg",
    },
  });
  console.log(picture11);

  const picture12 = await prisma.pictures.create({
    data: {
      product_id: product6.id,
      src: "057785_1.jpg",
    },
  });
  console.log(picture12);

  const picture13 = await prisma.pictures.create({
    data: {
      product_id: product7.id,
      src: "057814.jpg",
    },
  });
  console.log(picture13);

  const picture14 = await prisma.pictures.create({
    data: {
      product_id: product7.id,
      src: "057814_1.jpg",
    },
  });
  console.log(picture14);

  //   // for (let index = 0; index < 100; index++) {
  //   //   await prisma.extrusionHardwareParamsRecord.create({
  //   //     data: {
  //   //       summary_id: summary3.id,
  //   //       counter_value: 100,
  //   //       press_speed: 55,
  //   //       blow_time: 15,
  //   //       turning_machine_speed: 75,
  //   //       annealing_furnace_temp: 400,
  //   //       rondel_type_id: rondel1.id,
  //   //       employee_id: employee1.id,
  //   //     },
  //   //   });
  //   // }

  // const raw_material_1 = await prisma.material.create({
  //   data: {
  //     code: "068866",
  //     name: "Рондоль D28*L129 ИНКОМПРО (27,7*3,8 мм)",
  //     post_number: 1,
  //   },
  // });
  // console.log(raw_material_1);
  // const raw_material_1 = await prisma.material.create({
  //   data: {
  //     code: "068866",
  //     name: "Рондоль D28*L129 ИНКОМПРО (27,7*3,8 мм)",
  //     post_number: 1,
  //   },
  // });
  // console.log(raw_material_1);

  // const raw_material_2 = await prisma.material.create({
  //   data: {
  //     code: "067792",
  //     name: "Cтеарат цинка",
  //     post_number: 1,
  //   },
  // });
  // console.log(raw_material_2);

  // const raw_material_3 = await prisma.material.create({
  //   data: {
  //     code: "068974",
  //     name: "Латексная паста-герметик VPL NOVACAN T-D 125",
  //     post_number: 4,
  //   },
  // });
  // console.log(raw_material_3);

  // const raw_material_4 = await prisma.material.create({
  //   data: {
  //     code: "068972",
  //     name: "Внутренний лак бежевый VPL NOVACAN T-IL300",
  //     post_number: 2,
  //   },
  // });
  // console.log(raw_material_4);

  // const raw_material_5 = await prisma.material.create({
  //   data: {
  //     code: "068815",
  //     name: "Внешний белый грунт VPL NOVACAN T-W 100/1",
  //     post_number: 3,
  //   },
  // });
  // console.log(raw_material_5);

  // const raw_material_6 = await prisma.material.create({
  //   data: {
  //     code: "069537",
  //     name: "Растворитель для внешнего грунта METALL DECOR BS-277",
  //     post_number: 3,
  //   },
  // });
  // console.log(raw_material_6);

  // const raw_material_7 = await prisma.material.create({
  //   data: {
  //     code: "069193",
  //     name: "Краска Синия TV-Pantone 2758C",
  //     post_number: 3,
  //   },
  // });
  // console.log(raw_material_7);

  // const raw_material_8 = await prisma.material.create({
  //   data: {
  //     code: "063754",
  //     name: "Бушон РК 214F, белый (LOVE, CELEBRITY)",
  //     post_number: 4,
  //   },
  // });
  // console.log(raw_material_8);

  // const lot1 = await prisma.lot.create({
  //   data: {
  //     value: "1234567890123456789",
  //     material_id: raw_material_8.id,
  //   },
  // });
  // console.log(lot1);

  // for (let index = 0; index < 40; index++) {
  //   await prisma.consumedMaterial.create({
  //     data: {
  //       summary_id: summary3.id,
  //       material_id: raw_material_1.id,
  //       lot_id: lot1.id,
  //       employee_id: employee1.id,
  //     },
  //   });
  // }

  // const ext_trhld_1 = await prisma.extrusionTreshold.create({
  //   data: {
  //     product_id: product1.id,
  //     press_speed_min: 70,
  //     press_speed_max: 80,
  //     blow_time_min: 13,
  //     blow_time_max: 20,
  //     turning_machine_speed_min: 70,
  //     turning_machine_speed_max: 83,
  //     annealing_furnace_temp_min: 380,
  //     annealing_furnace_temp_max: 420,
  //     rondel_id: rondel1.id,
  //     tube_cilindrical_section_length_min: 128,
  //     tube_cilindrical_section_length_max: 130,
  //     membrane_thickness_min: 0.06,
  //     membrane_thickness_max: 0.13,
  //     tube_diameter_min: 27.9,
  //     tube_diameter_max: 28.2,
  //     tube_cilindrical_section_thickness_min: 0.09,
  //     tube_cilindrical_section_thickness_max: 0.16,
  //     tube_rigidity_min: 4,
  //     tube_rigidity_max: 8,
  //     external_thread_value: "М11х1.5",
  //   },
  // });

  // const ext_trhld_2 = await prisma.extrusionTreshold.create({
  //   data: {
  //     product_id: product2.id,
  //     press_speed_min: 70,
  //     press_speed_max: 80,
  //     blow_time_min: 13,
  //     blow_time_max: 20,
  //     turning_machine_speed_min: 70,
  //     turning_machine_speed_max: 83,
  //     annealing_furnace_temp_min: 380,
  //     annealing_furnace_temp_max: 420,
  //     rondel_id: rondel1.id,
  //     tube_cilindrical_section_length_min: 128,
  //     tube_cilindrical_section_length_max: 130,
  //     membrane_thickness_min: 0.06,
  //     membrane_thickness_max: 0.13,
  //     tube_diameter_min: 27.9,
  //     tube_diameter_max: 28.2,
  //     tube_cilindrical_section_thickness_min: 0.09,
  //     tube_cilindrical_section_thickness_max: 0.16,
  //     tube_rigidity_min: 4,
  //     tube_rigidity_max: 8,
  //     external_thread_value: "М11х1.5",
  //   },
  // });

  // const varnish_trshld = await prisma.varnishTreshold.create({
  //   data: {
  //     product_id: product2.id,
  //     varnish_machine_speed_min: 75,
  //     varnish_machine_speed_max: 83,
  //     total_air_pressure_min: 6.3,
  //     total_air_pressure_max: 7,
  //     feed_can_air_pressure_min: 3.5,
  //     feed_can_air_pressure_max: 4,
  //     nozzle_regulator_air_pressure_min: 3.5,
  //     nozzle_regulator_air_pressure_max: 4.5,
  //     cells_speed_min: 1000,
  //     cells_speed_max: 1200,
  //     injection_a_start_position_min: 1600,
  //     injection_a_start_position_max: 2400,
  //     injection_b_start_position_min: 1600,
  //     injection_b_start_position_max: 2400,
  //     injection_c_start_position_min: 2200,
  //     injection_c_start_position_max: 2800,
  //     injection_d_start_position_min: 2200,
  //     injection_d_start_position_max: 2800,
  //     injection_a_end_position_min: 4000,
  //     injection_a_end_position_max: 4200,
  //     injection_b_end_position_min: 4000,
  //     injection_b_end_position_max: 4200,
  //     injection_c_end_position_min: 4000,
  //     injection_c_end_position_max: 4200,
  //     injection_d_end_position_min: 4000,
  //     injection_d_end_position_max: 4200,
  //     tube_molding_start_position_min: 580,
  //     tube_molding_start_position_max: 620,
  //     tube_molding_end_position_min: 2980,
  //     tube_molding_end_position_max: 3100,
  //     polimerization_furnace_temp_min: 280,
  //     polimerization_furnace_temp_max: 325,
  //     internal_varnish_porosity_min: 0,
  //     internal_varnish_porosity_max: 15,
  //   },
  // });

  // console.log(varnish_trshld);

  // const sealant_trshld = await prisma.sealantTreshold.create({
  //   data: {
  //     product_id: product2.id,
  //     cap_machine_speed_min: 70,
  //     cap_machine_speed_max: 85,
  //     total_air_pressure_min: 6,
  //     total_air_pressure_max: 7,
  //     holders_forward_min: 3400,
  //     holders_forward_max: 3700,
  //     holders_opening_left_min: 350,
  //     holders_opening_left_max: 450,
  //     holders_opening_right_min: 350,
  //     holders_opening_right_max: 450,
  //     holders_closing_min: 1150,
  //     holders_closing_max: 1250,
  //     injection_a_start_min: 3450,
  //     injection_a_start_max: 3530,
  //     injection_b_start_min: 3450,
  //     injection_b_start_max: 3530,
  //     injection_a_end_min: 3750,
  //     injection_a_end_max: 3830,
  //     injection_b_end_min: 3750,
  //     injection_b_end_max: 3830,
  //     injection_tube_orientation_start_min: 1450,
  //     injection_tube_orientation_start_max: 1520,
  //     injection_tube_orientation_end_min: 3000,
  //     injection_tube_orientation_end_max: 31000,
  //     latex_ring_padding_min: 3,
  //     latex_ring_padding_max: 4,
  //     latex_ring_width_min: 8,
  //     latex_ring_width_max: 12,
  //     tube_rigidity_min: 8,
  //     tube_rigidity_max: 13,
  //     cap_unscrewing_torque_min: 5,
  //     cap_unscrewing_torque_max: 30,
  //   },
  // });
  // console.log(sealant_trshld);

  // const offset_trhld_1 = await prisma.offsetTreshold.create({
  //   data: {
  //     product_id: product2.id,
  //     printing_machine_speed_min: 75,
  //     printing_machine_speed_max: 85,
  //     total_air_pressure_min: 6,
  //     total_air_pressure_max: 7,
  //     padding_furnace_temp_min: 155,
  //     padding_furnace_temp_max: 175,
  //     offset_furnace_temp_min: 155,
  //     offset_furnace_temp_max: 175,
  //     printer_motor_min: 450,
  //     printer_motor_max: 620,
  //     base_covers_holders_motor_min: 800,
  //     base_covers_holders_motor_max: 1250,
  //     base_covers_station_motor_min: 450,
  //     base_covers_station_motor_max: 820,
  //     // imprint_quantity_printed_box_1_min :0,
  //     // imprint_quantity_printed_box_1_max :0,
  //     // imprint_quantity_printed_box_2_min :0,
  //     // imprint_quantity_printed_box_2_max :0,
  //     imprint_quantity_printed_box_3_min: 7,
  //     imprint_quantity_printed_box_3_max: 15,
  //     imprint_quantity_printed_box_4_min: 7,
  //     imprint_quantity_printed_box_4_max: 15,
  //     // imprint_quantity_printed_box_5_min :0,
  //     // imprint_quantity_printed_box_5_max :0,
  //     // imprint_quantity_printed_box_6_min :0,
  //     // imprint_quantity_printed_box_6_max :0,
  //     ink_supply_time_min: 0.4,
  //     ink_supply_time_max: 1.0,
  //   },
  // });

  // console.log(offset_trhld_1);

  // const summary_raw_materials_1 = await prisma.specification.create({
  //   data: {
  //     summary_id: summary3.id,
  //     material_id: raw_material_1.id,
  //   },
  // });
  // console.log(summary_raw_materials_1);

  // const summary_raw_materials_2 = await prisma.specification.create({
  //   data: {
  //     summary_id: summary3.id,
  //     material_id: raw_material_2.id,
  //   },
  // });
  // console.log(summary_raw_materials_2);

  // const summary_raw_materials_3 = await prisma.specification.create({
  //   data: {
  //     summary_id: summary3.id,
  //     material_id: raw_material_3.id,
  //   },
  // });
  // console.log(summary_raw_materials_3);

  // const summary_raw_materials_4 = await prisma.specification.create({
  //   data: {
  //     summary_id: summary3.id,
  //     material_id: raw_material_4.id,
  //   },
  // });
  // console.log(summary_raw_materials_4);
  // const summary_raw_materials_5 = await prisma.specification.create({
  //   data: {
  //     summary_id: summary3.id,
  //     material_id: raw_material_5.id,
  //   },
  // });
  // console.log(summary_raw_materials_5);
  // const summary_raw_materials_6 = await prisma.specification.create({
  //   data: {
  //     summary_id: summary3.id,
  //     material_id: raw_material_6.id,
  //   },
  // });
  // console.log(summary_raw_materials_6);
  // const summary_raw_materials_7 = await prisma.specification.create({
  //   data: {
  //     summary_id: summary3.id,
  //     material_id: raw_material_7.id,
  //   },
  // });
  // console.log(summary_raw_materials_7);
  // const summary_raw_materials_8 = await prisma.specification.create({
  //   data: {
  //     summary_id: summary3.id,
  //     material_id: raw_material_8.id,
  //   },
  // });
  // console.log(summary_raw_materials_8);

  for (let index = 1; index < 5; index++) {
    await prisma.note.create({
      data: {
        summary_id: summary3.id,
        post_id: index,
        note: `Комментарий к посту ${index}`,
      },
    });
  }

  for (let index = 0; index < 30; index++) {
    await prisma.extrusionParam.create({
      data: {
        summary_id: summary3.id,
        counter_value: 0 + index * 1500,
        press_speed: 72,
        blow_time: 14,
        turning_machine_speed: 78,
        annealing_furnace_temp: 400,
        rondel_id: rondel2.id,
        tube_cilindrical_section_length: 132,
        membrane_thickness: 0.12,
        tube_diameter: 38,
        tube_cilindrical_section_thickness: 0.23,
        tube_rigidity: 6,
        tube_cutting_quality: true,
        tightness: true,
        external_thread_quality: true,
        employee_id: employee1.id,
        createdAt: new Date(new Date(new Date().setHours(0, 0, 0)).getTime() + 1000 * 60 * 30 * index),
      },
    });
  }

  for (let index = 0; index < 30; index++) {
    await prisma.varnishParam.create({
      data: {
        summary_id: summary3.id,
        counter_value: 0 + index * 1500,

        varnish_machine_speed: 70,
        total_air_pressure: 4.5,
        feed_can_air_pressure: 3.4,
        nozzle_regulator_air_pressure: 1.2,
        cells_speed: 12,
        injection_a_start_position: 100,
        injection_b_start_position: 100,
        injection_c_start_position: 100,
        injection_d_start_position: 100,
        injection_a_end_position: 100,
        injection_b_end_position: 100,
        injection_c_end_position: 100,
        injection_d_end_position: 100,
        tube_molding_start_position: 100,
        tube_molding_end_position: 100,
        polimerization_furnace_temp: 100,
        internal_varnish_porosity: 100,
        internal_sectional_view: true,
        aluminium_clearance_lack: false,
        unpainting_lack: false,

        employee_id: employee1.id,
        createdAt: new Date(new Date(new Date().setHours(0, 0, 0)).getTime() + 1000 * 60 * 10 * index),
      },
    });
  }

  for (let index = 0; index < 30; index++) {
    await prisma.sealantParam.create({
      data: {
        summary_id: summary3.id,
        counter_value: 0 + index * 1113,

        cap_machine_speed: 1234,
        total_air_pressure: 1234,
        holders_forward: 1234,
        holders_opening_left: 1234,
        holders_opening_right: 1234,
        holders_closing: 1234,
        injection_a_start: 1234,
        injection_b_start: 1234,
        injection_a_end: 1234,
        injection_b_end: 1234,
        injection_tube_orientation_start: 1234,
        injection_tube_orientation_end: 1234,
        is_cap_surface_smooth: true,
        latex_ring_padding: 12,
        latex_ring_width: 12,
        tube_rigidity: 12,
        cap_unscrewing_torque: 12,

        employee_id: employee1.id,
        createdAt: new Date(new Date(new Date().setHours(0, 0, 0)).getTime() + 1000 * 60 * 10 * index),
      },
    });
  }

  for (let index = 0; index < 30; index++) {
    await prisma.offsetParam.create({
      data: {
        summary_id: summary3.id,
        counter_value: 0 + index * 1500,

        printing_machine_speed: 75,

        total_air_pressure: 6,

        padding_furnace_temp: 155,

        offset_furnace_temp: 155,

        printer_motor: 450,

        base_covers_holders_motor: 800,

        base_covers_station_motor: 450,

        // imprint_quantity_printed_box_1_min :0,

        // imprint_quantity_printed_box_2_min :0,

        imprint_quantity_printed_box_3: 7,

        imprint_quantity_printed_box_4: 7,

        // imprint_quantity_printed_box_5_min :0,
        // imprint_quantity_printed_box_5_max :0,
        // imprint_quantity_printed_box_6_min :0,
        // imprint_quantity_printed_box_6_max :0,
        ink_supply_time: 0.4,

        employee_id: employee1.id,
        createdAt: new Date(new Date(new Date().setHours(0, 0, 0)).getTime() + 1000 * 60 * 30 * index),
      },
    });
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
