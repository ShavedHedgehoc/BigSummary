import { AutoIncrement, Column, DataType, PrimaryKey, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import TubeRecord from "src/tube_records/tube_records.model";

interface TubeParameterCreationsAttrs {}

@Table({ tableName: "tube_parameters", createdAt: false, updatedAt: false })
export default class TubeParameter extends Model<TubeParameter, TubeParameterCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ForeignKey(() => TubeRecord)
  @Column
  tube_record_id: number;

  @Column({ type: DataType.INTEGER })
  press_speed_min: number;

  @Column({ type: DataType.INTEGER })
  press_speed_max: number;

  @Column({ type: DataType.INTEGER })
  molding_time_min: number;

  @Column({ type: DataType.INTEGER })
  molding_time_max: number;

  @Column({ type: DataType.INTEGER })
  turning_automate_speed_min: number;

  @Column({ type: DataType.INTEGER })
  turning_automate_speed_max: number;

  @Column({ type: DataType.INTEGER })
  annealing_furnace_temp_min: number;

  @Column({ type: DataType.INTEGER })
  annealing_furnace_temp_max: number;

  @Column({ type: DataType.INTEGER })
  cap_machine_speed_min: number;

  @Column({ type: DataType.INTEGER })
  cap_machine_speed_max: number;

  @Column({ type: DataType.FLOAT })
  caps_machine_air_pressure_min: number;

  @Column({ type: DataType.FLOAT })
  caps_machine_air_pressure_max: number;

  @Column({ type: DataType.INTEGER })
  grips_forward_min: number;

  @Column({ type: DataType.INTEGER })
  grips_forward_max: number;

  @Column({ type: DataType.INTEGER })
  grips_opening_left_min: number;

  @Column({ type: DataType.INTEGER })
  grips_opening_left_max: number;

  @Column({ type: DataType.INTEGER })
  grips_opening_right_min: number;

  @Column({ type: DataType.INTEGER })
  grips_opening_right_max: number;

  @Column({ type: DataType.INTEGER })
  grips_closing_min: number;

  @Column({ type: DataType.INTEGER })
  grips_closing_max: number;

  @Column({ type: DataType.INTEGER })
  injection_start_min: number;

  @Column({ type: DataType.INTEGER })
  injection_start_max: number;

  @Column({ type: DataType.INTEGER })
  injection_end_min: number;

  @Column({ type: DataType.INTEGER })
  injection_end_max: number;

  @Column({ type: DataType.INTEGER })
  tube_start_position_min: number;

  @Column({ type: DataType.INTEGER })
  tube_start_position_max: number;

  @Column({ type: DataType.INTEGER })
  tube_end_position_min: number;

  @Column({ type: DataType.INTEGER })
  tube_end_position_max: number;

  @Column({ type: DataType.INTEGER })
  padding_machine_speed_min: number;

  @Column({ type: DataType.INTEGER })
  padding_machine_speed_max: number;

  @Column({ type: DataType.FLOAT })
  padding_machine_air_pressure_min: number;

  @Column({ type: DataType.FLOAT })
  padding_machine_air_pressure_max: number;

  @Column({ type: DataType.INTEGER })
  padding_furnace_temp_min: number;

  @Column({ type: DataType.INTEGER })
  padding_furnace_temp_max: number;

  @Column({ type: DataType.INTEGER })
  offset_furnace_temp_min: number;

  @Column({ type: DataType.INTEGER })
  offset_furnace_temp_max: number;

  @Column({ type: DataType.INTEGER })
  printer_motor_speed_min: number;

  @Column({ type: DataType.INTEGER })
  printer_motor_speed_max: number;

  @Column({ type: DataType.INTEGER })
  holders_motor_speed_min: number;

  @Column({ type: DataType.INTEGER })
  holders_motor_speed_max: number;

  @Column({ type: DataType.INTEGER })
  station_motor_speed_min: number;

  @Column({ type: DataType.INTEGER })
  station_motor_speed_max: number;

  @Column({ type: DataType.INTEGER })
  ink_injection_time_min: number;

  @Column({ type: DataType.INTEGER })
  ink_injection_time_max: number;

  @Column({ type: DataType.INTEGER })
  lacquer_machine_speed_min: number;

  @Column({ type: DataType.INTEGER })
  lacquer_machine_speed_max: number;

  @Column({ type: DataType.FLOAT })
  lacquer_machine_air_pressure_min: number;

  @Column({ type: DataType.FLOAT })
  lacquer_machine_air_pressure_max: number;

  @Column({ type: DataType.FLOAT })
  feed_can_air_pressure_min: number;

  @Column({ type: DataType.FLOAT })
  feed_can_air_pressure_max: number;

  @Column({ type: DataType.FLOAT })
  nozzle_regulator_air_pressure_min: number;

  @Column({ type: DataType.FLOAT })
  nozzle_regulator_air_pressure_max: number;

  @Column({ type: DataType.INTEGER })
  cells_speed_min: number;

  @Column({ type: DataType.INTEGER })
  cells_speed_max: number;

  @Column({ type: DataType.INTEGER })
  injection_start_position_min: number;

  @Column({ type: DataType.INTEGER })
  injection_start_position_max: number;

  @Column({ type: DataType.INTEGER })
  injection_end_position_min: number;

  @Column({ type: DataType.INTEGER })
  injection_end_position_max: number;

  @Column({ type: DataType.INTEGER })
  tube_molding_start_position_min: number;

  @Column({ type: DataType.INTEGER })
  tube_molding_start_position_max: number;

  @Column({ type: DataType.INTEGER })
  tube_molding_end_position_min: number;

  @Column({ type: DataType.INTEGER })
  tube_molding_end_position_max: number;

  @Column({ type: DataType.INTEGER })
  polimerrization_furnace_temperature_min: number;

  @Column({ type: DataType.INTEGER })
  polimerrization_furnace_temperature_max: number;

  @BelongsTo(() => TubeRecord)
  tube_record: TubeRecord;
}
