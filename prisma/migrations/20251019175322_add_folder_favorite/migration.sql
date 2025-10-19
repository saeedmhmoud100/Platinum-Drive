-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Folder_isFavorite_idx" ON "Folder"("isFavorite");
