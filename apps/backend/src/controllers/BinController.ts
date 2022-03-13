import { Bin, Prisma, PrismaClient } from '@prisma/client'
import { Controller } from './Controller';
import { TestData } from './testData';

export interface CreateBinDto extends Omit<Bin, 'id' | 'createdAt' | 'updatedAt'> { }
export interface UpdateBinDto extends Partial<CreateBinDto> { }
export type BinTestData = TestData<Bin, CreateBinDto, UpdateBinDto>;


export class BinController extends Controller<Bin, CreateBinDto, UpdateBinDto> {
  model: Prisma.BinDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor(prisma?: PrismaClient) {
    super(prisma);

    this.model = prisma.bin;
  }

  async getAll() {
    return await this.model.findMany();
  }

  async getById(id: number) {
    return await this.model.findUnique({ where: { id } });
  }

  async create(data: CreateBinDto) {
    return await this.model.create({ data });
  }

  async update(id: number, data: UpdateBinDto) {
    return await this.model.update({ data, where: { id } })
  }

  async delete(id: number) {
    return await this.model.delete({ where: { id } })
  }
}