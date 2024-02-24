-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'VENDOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role";
