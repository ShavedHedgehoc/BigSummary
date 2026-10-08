/*
  Warnings:

  - You are about to drop the `tube_assembly` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tube_conveyor_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tube_conveyors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tube_histories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tube_histories_notes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tube_history_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tube_materials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tube_parameters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tube_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tube_records` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tube_sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tube_specifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tube_assembly" DROP CONSTRAINT "tube_assembly_tube_conveyor_post_id_fkey";

-- DropForeignKey
ALTER TABLE "tube_assembly" DROP CONSTRAINT "tube_assembly_tube_material_id_fkey";

-- DropForeignKey
ALTER TABLE "tube_assembly" DROP CONSTRAINT "tube_assembly_tube_record_id_fkey";

-- DropForeignKey
ALTER TABLE "tube_histories" DROP CONSTRAINT "tube_histories_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "tube_histories" DROP CONSTRAINT "tube_histories_tube_history_note_id_fkey";

-- DropForeignKey
ALTER TABLE "tube_histories" DROP CONSTRAINT "tube_histories_tube_history_type_id_fkey";

-- DropForeignKey
ALTER TABLE "tube_histories" DROP CONSTRAINT "tube_histories_tube_record_id_fkey";

-- DropForeignKey
ALTER TABLE "tube_parameters" DROP CONSTRAINT "tube_parameters_tube_record_id_fkey";

-- DropForeignKey
ALTER TABLE "tube_records" DROP CONSTRAINT "tube_records_boil_id_fkey";

-- DropForeignKey
ALTER TABLE "tube_records" DROP CONSTRAINT "tube_records_tube_conveyor_id_fkey";

-- DropForeignKey
ALTER TABLE "tube_records" DROP CONSTRAINT "tube_records_tube_product_id_fkey";

-- DropForeignKey
ALTER TABLE "tube_sessions" DROP CONSTRAINT "tube_sessions_conveyor_id_fkey";

-- DropForeignKey
ALTER TABLE "tube_sessions" DROP CONSTRAINT "tube_sessions_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "tube_specifications" DROP CONSTRAINT "tube_specifications_tube_material_id_fkey";

-- DropForeignKey
ALTER TABLE "tube_specifications" DROP CONSTRAINT "tube_specifications_tube_product_id_fkey";

-- DropTable
DROP TABLE "tube_assembly";

-- DropTable
DROP TABLE "tube_conveyor_posts";

-- DropTable
DROP TABLE "tube_conveyors";

-- DropTable
DROP TABLE "tube_histories";

-- DropTable
DROP TABLE "tube_histories_notes";

-- DropTable
DROP TABLE "tube_history_types";

-- DropTable
DROP TABLE "tube_materials";

-- DropTable
DROP TABLE "tube_parameters";

-- DropTable
DROP TABLE "tube_products";

-- DropTable
DROP TABLE "tube_records";

-- DropTable
DROP TABLE "tube_sessions";

-- DropTable
DROP TABLE "tube_specifications";
