/*
  Warnings:

  - A unique constraint covering the columns `[acronym]` on the table `Program` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `acronym` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "acronym" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Program_acronym_key" ON "Program"("acronym");
