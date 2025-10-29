-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "Employee" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"barcode" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Production" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"marking" text NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ExtrusionHardwareParamsRecord" (
	"id" serial PRIMARY KEY NOT NULL,
	"annealing_furnace_temp" integer NOT NULL,
	"blow_time" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"employee_id" integer NOT NULL,
	"press_speed" integer NOT NULL,
	"summary_id" integer NOT NULL,
	"turning_machine_speed" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Summary" (
	"id" serial PRIMARY KEY NOT NULL,
	"production_id" integer NOT NULL,
	"batch_id" integer NOT NULL,
	"conveyor_id" integer NOT NULL,
	"plan" integer NOT NULL,
	"isActive" boolean DEFAULT false NOT NULL,
	"isFinished" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Batch" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Conveyor" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ExtrusionHardwareTresholdsRecord" (
	"id" serial PRIMARY KEY NOT NULL,
	"production_id" integer NOT NULL,
	"press_speed_min" integer NOT NULL,
	"press_speed_max" integer NOT NULL,
	"blow_time_min" integer NOT NULL,
	"blow_time_max" integer NOT NULL,
	"turning_machine_speed_min" integer NOT NULL,
	"turning_machine_speed_max" integer NOT NULL,
	"annealing_furnace_temp_min" integer NOT NULL,
	"annealing_furnace_temp_max" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ExtrusionHardwareParamsRecord" ADD CONSTRAINT "ExtrusionHardwareParamsRecord_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "public"."Summary"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ExtrusionHardwareParamsRecord" ADD CONSTRAINT "ExtrusionHardwareParamsRecord_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."Employee"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "public"."Production"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "public"."Batch"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_conveyor_id_fkey" FOREIGN KEY ("conveyor_id") REFERENCES "public"."Conveyor"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ExtrusionHardwareTresholdsRecord" ADD CONSTRAINT "ExtrusionHardwareTresholdsRecord_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "public"."Production"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "Employee_barcode_key" ON "Employee" USING btree ("barcode" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Production_code_key" ON "Production" USING btree ("code" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Batch_name_key" ON "Batch" USING btree ("name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Conveyor_name_key" ON "Conveyor" USING btree ("name" text_ops);
*/