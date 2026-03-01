-- AlterTable
ALTER TABLE "Mustahik" ADD COLUMN     "wilayahId" TEXT;

-- CreateTable
CREATE TABLE "Wilayah" (
    "id" TEXT NOT NULL,
    "mosqueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wilayah_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wilayah_mosqueId_name_key" ON "Wilayah"("mosqueId", "name");

-- AddForeignKey
ALTER TABLE "Mustahik" ADD CONSTRAINT "Mustahik_wilayahId_fkey" FOREIGN KEY ("wilayahId") REFERENCES "Wilayah"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wilayah" ADD CONSTRAINT "Wilayah_mosqueId_fkey" FOREIGN KEY ("mosqueId") REFERENCES "Mosque"("id") ON DELETE CASCADE ON UPDATE CASCADE;
