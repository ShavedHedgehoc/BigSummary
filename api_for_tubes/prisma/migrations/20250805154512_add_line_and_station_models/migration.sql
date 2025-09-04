-- CreateTable
CREATE TABLE "public"."Line" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Station" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "line_id" INTEGER NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Station" ADD CONSTRAINT "Station_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "public"."Line"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
