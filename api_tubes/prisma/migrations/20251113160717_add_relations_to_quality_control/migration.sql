/*
  Warnings:

  - Added the required column `summary_id` to the `extrusion_quality_control_params_records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `production_id` to the `extrusion_quality_control_tresholds_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "extrusion_quality_control_params_records" ADD COLUMN     "summary_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "extrusion_quality_control_tresholds_records" ADD COLUMN     "production_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "extrusion_quality_control_tresholds_records" ADD CONSTRAINT "extrusion_quality_control_tresholds_records_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "productions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_quality_control_params_records" ADD CONSTRAINT "extrusion_quality_control_params_records_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summary_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;
