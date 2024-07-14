/*
  Warnings:

  - You are about to drop the column `downvote` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `reputation_score` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `upvote` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "downvote",
DROP COLUMN "reputation_score",
DROP COLUMN "upvote";
