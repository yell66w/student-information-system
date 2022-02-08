/*
  Warnings:

  - A unique constraint covering the columns `[acronym]` on the table `College` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `acronym` to the `College` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "College" ADD COLUMN     "acronym" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "College_acronym_key" ON "College"("acronym");
