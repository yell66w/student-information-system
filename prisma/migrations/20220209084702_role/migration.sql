-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADMIN');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'STUDENT';
