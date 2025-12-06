-- CreateTable
CREATE TABLE "printer_api" (
    "id" SERIAL NOT NULL,
    "conveyor_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "printer_api_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "printer_api" ADD CONSTRAINT "printer_api_conveyor_id_fkey" FOREIGN KEY ("conveyor_id") REFERENCES "conveyors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
