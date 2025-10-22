/*
  Warnings:

  - You are about to drop the column `autoOrganize` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `defaultFolderId` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `generateThumbnails` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "autoOrganize",
DROP COLUMN "defaultFolderId",
DROP COLUMN "generateThumbnails",
ADD COLUMN     "autoGenerateThumbnails" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "deduplicateFiles" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "defaultUploadFolder" TEXT NOT NULL DEFAULT '/';
