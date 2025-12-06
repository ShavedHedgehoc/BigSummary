-- CreateTable
CREATE TABLE "varnish_sop_pictures" (
    "id" SERIAL NOT NULL,
    "operation_id" INTEGER NOT NULL,
    "src" TEXT NOT NULL,

    CONSTRAINT "varnish_sop_pictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offset_sop_pictures" (
    "id" SERIAL NOT NULL,
    "operation_id" INTEGER NOT NULL,
    "src" TEXT NOT NULL,

    CONSTRAINT "offset_sop_pictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sealant_sop_pictures" (
    "id" SERIAL NOT NULL,
    "operation_id" INTEGER NOT NULL,
    "src" TEXT NOT NULL,

    CONSTRAINT "sealant_sop_pictures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "varnish_sop_pictures" ADD CONSTRAINT "varnish_sop_pictures_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "varnish_operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offset_sop_pictures" ADD CONSTRAINT "offset_sop_pictures_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "offset_operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sealant_sop_pictures" ADD CONSTRAINT "sealant_sop_pictures_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "sealant_operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
