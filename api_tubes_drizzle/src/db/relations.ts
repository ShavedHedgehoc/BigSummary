import { relations } from "drizzle-orm/relations";
import { summary, extrusionHardwareParamsRecord, employee, production, batch, conveyor, extrusionHardwareTresholdsRecord } from "./schema";

export const extrusionHardwareParamsRecordRelations = relations(extrusionHardwareParamsRecord, ({one}) => ({
	summary: one(summary, {
		fields: [extrusionHardwareParamsRecord.summaryId],
		references: [summary.id]
	}),
	employee: one(employee, {
		fields: [extrusionHardwareParamsRecord.employeeId],
		references: [employee.id]
	}),
}));

export const summaryRelations = relations(summary, ({one, many}) => ({
	extrusionHardwareParamsRecords: many(extrusionHardwareParamsRecord),
	production: one(production, {
		fields: [summary.productionId],
		references: [production.id]
	}),
	batch: one(batch, {
		fields: [summary.batchId],
		references: [batch.id]
	}),
	conveyor: one(conveyor, {
		fields: [summary.conveyorId],
		references: [conveyor.id]
	}),
}));

export const employeeRelations = relations(employee, ({many}) => ({
	extrusionHardwareParamsRecords: many(extrusionHardwareParamsRecord),
}));

export const productionRelations = relations(production, ({many}) => ({
	summaries: many(summary),
	extrusionHardwareTresholdsRecords: many(extrusionHardwareTresholdsRecord),
}));

export const batchRelations = relations(batch, ({many}) => ({
	summaries: many(summary),
}));

export const conveyorRelations = relations(conveyor, ({many}) => ({
	summaries: many(summary),
}));

export const extrusionHardwareTresholdsRecordRelations = relations(extrusionHardwareTresholdsRecord, ({one}) => ({
	production: one(production, {
		fields: [extrusionHardwareTresholdsRecord.productionId],
		references: [production.id]
	}),
}));