/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `MosqueUser` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "MosqueUser_userId_mosqueId_key";

-- CreateIndex
CREATE UNIQUE INDEX "MosqueUser_userId_key" ON "MosqueUser"("userId");
