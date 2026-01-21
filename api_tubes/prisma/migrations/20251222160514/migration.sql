-- DropForeignKey
ALTER TABLE "extrusion_statuses" DROP CONSTRAINT "extrusion_statuses_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "offset_statuses" DROP CONSTRAINT "offset_statuses_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "sealant_statuses" DROP CONSTRAINT "sealant_statuses_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "varnish_statuses" DROP CONSTRAINT "varnish_statuses_summary_id_fkey";

-- AddForeignKey
ALTER TABLE "extrusion_statuses" ADD CONSTRAINT "extrusion_statuses_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "varnish_statuses" ADD CONSTRAINT "varnish_statuses_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offset_statuses" ADD CONSTRAINT "offset_statuses_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sealant_statuses" ADD CONSTRAINT "sealant_statuses_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
