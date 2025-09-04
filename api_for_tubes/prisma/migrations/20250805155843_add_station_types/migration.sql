/*
  Warnings:

  - Added the required column `position` to the `Station` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."StationPosition" AS ENUM ('Press', 'Lacque', 'Caps', 'Offset');

-- AlterTable
ALTER TABLE "public"."Station" ADD COLUMN     "position" "public"."StationPosition" NOT NULL;
