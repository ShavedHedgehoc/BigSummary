-- CreateTable
CREATE TABLE "varnish_defects" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "varnish_defects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offset_defects" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "offset_defects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sealant_defects" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "sealant_defects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "varnish_defects_summary_id_key" ON "varnish_defects"("summary_id");

-- CreateIndex
CREATE UNIQUE INDEX "offset_defects_summary_id_key" ON "offset_defects"("summary_id");

-- CreateIndex
CREATE UNIQUE INDEX "sealant_defects_summary_id_key" ON "sealant_defects"("summary_id");

-- AddForeignKey
ALTER TABLE "varnish_defects" ADD CONSTRAINT "varnish_defects_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offset_defects" ADD CONSTRAINT "offset_defects_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sealant_defects" ADD CONSTRAINT "sealant_defects_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
