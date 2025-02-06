-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'SHOPKEEPER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "document" VARCHAR(14) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "balance" REAL NOT NULL,
    "type" "UserType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_document_key" ON "User"("document");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
