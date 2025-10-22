/*
  Warnings:

  - You are about to drop the column `allowIndexing` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `profileVisibility` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `showOnlineStatus` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "allowIndexing",
DROP COLUMN "profileVisibility",
DROP COLUMN "showOnlineStatus";
