/*
  Warnings:

  - You are about to drop the column `birthdate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MustahikCategory" AS ENUM ('FAKIR', 'MISKIN', 'AMIL', 'MUALAF', 'GHARIM', 'FISABILILLAH', 'IBNU_SABIL');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('CASH', 'RICE');

-- CreateEnum
CREATE TYPE "MosqueRole" AS ENUM ('MANAGER', 'DISTRIBUTOR');

-- CreateEnum
CREATE TYPE "DistributionStatus" AS ENUM ('PENDING', 'DISTRIBUTED');

-- DropIndex
DROP INDEX "User_phone_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthdate",
DROP COLUMN "emailVerified",
DROP COLUMN "gender",
DROP COLUMN "image",
DROP COLUMN "phone",
DROP COLUMN "updatedAt",
DROP COLUMN "username";

-- CreateTable
CREATE TABLE "Mosque" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mosque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MosqueUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mosqueId" TEXT NOT NULL,
    "role" "MosqueRole" NOT NULL,

    CONSTRAINT "MosqueUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mustahik" (
    "id" TEXT NOT NULL,
    "mosqueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "category" "MustahikCategory" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Mustahik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Muzakki" (
    "id" TEXT NOT NULL,
    "mosqueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,

    CONSTRAINT "Muzakki_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZakatTransaction" (
    "id" TEXT NOT NULL,
    "mosqueId" TEXT NOT NULL,
    "muzakkiId" TEXT NOT NULL,
    "assetType" "AssetType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "createdById" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ZakatTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetConversion" (
    "id" TEXT NOT NULL,
    "mosqueId" TEXT NOT NULL,
    "fromAsset" "AssetType" NOT NULL,
    "toAsset" "AssetType" NOT NULL,
    "fromAmount" DECIMAL(65,30) NOT NULL,
    "toAmount" DECIMAL(65,30) NOT NULL,
    "rate" DECIMAL(65,30) NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssetConversion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DistributionProgram" (
    "id" TEXT NOT NULL,
    "mosqueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "totalFund" DECIMAL(65,30),
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DistributionProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DistributionItem" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "mustahikId" TEXT NOT NULL,
    "distributorId" TEXT NOT NULL,
    "assetType" "AssetType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" "DistributionStatus" NOT NULL DEFAULT 'PENDING',
    "distributedAt" TIMESTAMP(3),

    CONSTRAINT "DistributionItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MosqueUser_userId_mosqueId_key" ON "MosqueUser"("userId", "mosqueId");

-- AddForeignKey
ALTER TABLE "MosqueUser" ADD CONSTRAINT "MosqueUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MosqueUser" ADD CONSTRAINT "MosqueUser_mosqueId_fkey" FOREIGN KEY ("mosqueId") REFERENCES "Mosque"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mustahik" ADD CONSTRAINT "Mustahik_mosqueId_fkey" FOREIGN KEY ("mosqueId") REFERENCES "Mosque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Muzakki" ADD CONSTRAINT "Muzakki_mosqueId_fkey" FOREIGN KEY ("mosqueId") REFERENCES "Mosque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZakatTransaction" ADD CONSTRAINT "ZakatTransaction_mosqueId_fkey" FOREIGN KEY ("mosqueId") REFERENCES "Mosque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZakatTransaction" ADD CONSTRAINT "ZakatTransaction_muzakkiId_fkey" FOREIGN KEY ("muzakkiId") REFERENCES "Muzakki"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZakatTransaction" ADD CONSTRAINT "ZakatTransaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetConversion" ADD CONSTRAINT "AssetConversion_mosqueId_fkey" FOREIGN KEY ("mosqueId") REFERENCES "Mosque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetConversion" ADD CONSTRAINT "AssetConversion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistributionProgram" ADD CONSTRAINT "DistributionProgram_mosqueId_fkey" FOREIGN KEY ("mosqueId") REFERENCES "Mosque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistributionProgram" ADD CONSTRAINT "DistributionProgram_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistributionItem" ADD CONSTRAINT "DistributionItem_programId_fkey" FOREIGN KEY ("programId") REFERENCES "DistributionProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistributionItem" ADD CONSTRAINT "DistributionItem_mustahikId_fkey" FOREIGN KEY ("mustahikId") REFERENCES "Mustahik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistributionItem" ADD CONSTRAINT "DistributionItem_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
