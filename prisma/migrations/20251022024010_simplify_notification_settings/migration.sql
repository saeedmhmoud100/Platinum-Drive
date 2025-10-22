/*
  Warnings:

  - You are about to drop the column `desktopNotifications` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `emailNotifications` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `notifyOnComment` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `notifyOnFileExpiry` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `notifyOnLoginAttempt` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `notifyOnMention` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `notifyOnShare` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `pushNotifications` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "desktopNotifications",
DROP COLUMN "emailNotifications",
DROP COLUMN "notifyOnComment",
DROP COLUMN "notifyOnFileExpiry",
DROP COLUMN "notifyOnLoginAttempt",
DROP COLUMN "notifyOnMention",
DROP COLUMN "notifyOnShare",
DROP COLUMN "pushNotifications",
ADD COLUMN     "notifyOnFileActivity" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notifyOnSharedLink" BOOLEAN NOT NULL DEFAULT true;
