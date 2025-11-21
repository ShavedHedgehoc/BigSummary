-- CreateTable
CREATE TABLE "Pictures" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "src" TEXT NOT NULL,

    CONSTRAINT "Pictures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pictures" ADD CONSTRAINT "Pictures_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
