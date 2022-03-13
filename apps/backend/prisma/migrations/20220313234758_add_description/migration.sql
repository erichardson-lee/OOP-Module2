-- DropForeignKey
ALTER TABLE "Bin" DROP CONSTRAINT "Bin_itemId_fkey";

-- AlterTable
ALTER TABLE "Bin" ALTER COLUMN "itemId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "Bin" ADD CONSTRAINT "Bin_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
