-- CreateTable
CREATE TABLE "RegionScore" (
    "region" TEXT NOT NULL,
    "score" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "RegionScore_pkey" PRIMARY KEY ("region")
);
