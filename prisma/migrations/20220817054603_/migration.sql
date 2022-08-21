-- CreateTable
CREATE TABLE "RegionScore" (
    "uid" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "score" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "RegionScore_pkey" PRIMARY KEY ("uid")
);
