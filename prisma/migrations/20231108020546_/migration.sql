/*
  Warnings:

  - The primary key for the `Snippet` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Snippet" DROP CONSTRAINT "Snippet_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Snippet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Snippet_id_seq";
