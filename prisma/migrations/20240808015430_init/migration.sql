/*
  Warnings:

  - Changed the type of `type` on the `deals` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AppType" AS ENUM ('APP', 'GAME');

-- AlterTable
ALTER TABLE "deals" DROP COLUMN "type",
ADD COLUMN     "type" "AppType" NOT NULL;

-- CreateIndex
CREATE INDEX "deals_type_idx" ON "deals"("type");
