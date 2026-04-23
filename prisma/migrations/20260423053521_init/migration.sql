-- CreateEnum
CREATE TYPE "Status" AS ENUM ('wip', 'maintained', 'archived');

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[]
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "status" "Status" NOT NULL
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "lastUpdated" (
    "lastUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Now" (
    "id" TEXT NOT NULL,
    "contents" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkExperience_id_key" ON "WorkExperience"("id");

-- CreateIndex
CREATE UNIQUE INDEX "lastUpdated_lastUpdate_key" ON "lastUpdated"("lastUpdate");

-- CreateIndex
CREATE UNIQUE INDEX "Now_id_key" ON "Now"("id");
