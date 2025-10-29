import { pgTable, uniqueIndex, serial, text, foreignKey, integer, timestamp, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const employee = pgTable("Employee", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	barcode: text().notNull(),
}, (table) => [
	uniqueIndex("Employee_barcode_key").using("btree", table.barcode.asc().nullsLast().op("text_ops")),
]);

export const production = pgTable("Production", {
	id: serial().primaryKey().notNull(),
	code: text().notNull(),
	marking: text().notNull(),
	name: text().notNull(),
}, (table) => [
	uniqueIndex("Production_code_key").using("btree", table.code.asc().nullsLast().op("text_ops")),
]);

export const extrusionHardwareParamsRecord = pgTable("ExtrusionHardwareParamsRecord", {
	id: serial().primaryKey().notNull(),
	annealingFurnaceTemp: integer("annealing_furnace_temp").notNull(),
	blowTime: integer("blow_time").notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	employeeId: integer("employee_id").notNull(),
	pressSpeed: integer("press_speed").notNull(),
	summaryId: integer("summary_id").notNull(),
	turningMachineSpeed: integer("turning_machine_speed").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.summaryId],
			foreignColumns: [summary.id],
			name: "ExtrusionHardwareParamsRecord_summary_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employee.id],
			name: "ExtrusionHardwareParamsRecord_employee_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const summary = pgTable("Summary", {
	id: serial().primaryKey().notNull(),
	productionId: integer("production_id").notNull(),
	batchId: integer("batch_id").notNull(),
	conveyorId: integer("conveyor_id").notNull(),
	plan: integer().notNull(),
	isActive: boolean().default(false).notNull(),
	isFinished: boolean().default(false).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productionId],
			foreignColumns: [production.id],
			name: "Summary_production_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.batchId],
			foreignColumns: [batch.id],
			name: "Summary_batch_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.conveyorId],
			foreignColumns: [conveyor.id],
			name: "Summary_conveyor_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const batch = pgTable("Batch", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
}, (table) => [
	uniqueIndex("Batch_name_key").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);

export const conveyor = pgTable("Conveyor", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
}, (table) => [
	uniqueIndex("Conveyor_name_key").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);

export const extrusionHardwareTresholdsRecord = pgTable("ExtrusionHardwareTresholdsRecord", {
	id: serial().primaryKey().notNull(),
	productionId: integer("production_id").notNull(),
	pressSpeedMin: integer("press_speed_min").notNull(),
	pressSpeedMax: integer("press_speed_max").notNull(),
	blowTimeMin: integer("blow_time_min").notNull(),
	blowTimeMax: integer("blow_time_max").notNull(),
	turningMachineSpeedMin: integer("turning_machine_speed_min").notNull(),
	turningMachineSpeedMax: integer("turning_machine_speed_max").notNull(),
	annealingFurnaceTempMin: integer("annealing_furnace_temp_min").notNull(),
	annealingFurnaceTempMax: integer("annealing_furnace_temp_max").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productionId],
			foreignColumns: [production.id],
			name: "ExtrusionHardwareTresholdsRecord_production_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);
