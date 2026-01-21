-- CreateTable
CREATE TABLE "defects" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "defects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "defects" ADD CONSTRAINT "defects_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
