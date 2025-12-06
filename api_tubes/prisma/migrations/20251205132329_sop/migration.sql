-- CreateTable
CREATE TABLE "extrusion_sop_pictures" (
    "id" SERIAL NOT NULL,
    "operation_id" INTEGER NOT NULL,
    "src" TEXT NOT NULL,

    CONSTRAINT "extrusion_sop_pictures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "extrusion_sop_pictures" ADD CONSTRAINT "extrusion_sop_pictures_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "extrusion_operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
