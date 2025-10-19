-- AlterTable
ALTER TABLE "File" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "File_isFavorite_idx" ON "File"("isFavorite");
