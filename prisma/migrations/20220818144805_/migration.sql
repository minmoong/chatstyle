/*
  Warnings:

  - The primary key for the `RegionScore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `RegionScore` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RegionScore" DROP CONSTRAINT "RegionScore_pkey",
DROP COLUMN "uid",
ADD CONSTRAINT "RegionScore_pkey" PRIMARY KEY ("region");
