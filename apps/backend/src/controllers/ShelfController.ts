import { Shelf, Prisma, PrismaClient } from '@prisma/client'
import { Controller } from './Controller';
import { TestData } from './testData';

export interface CreateShelfDto extends Omit<Shelf, 'id' | 'createdAt' | 'updatedAt'> { }
export interface UpdateShelfDto extends Partial<CreateShelfDto> { }
export type ShelfTestData = TestData<Shelf, CreateShelfDto, UpdateShelfDto>;

export class ShelfController extends Controller<Shelf, CreateShelfDto, UpdateShelfDto> {
  private model: Prisma.ShelfDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor(prisma?: PrismaClient) {
    super(prisma)

    this.model = prisma.shelf;
  }

  async getAll() {
    return await this.model.findMany();
  }

  async getById(id: number) {
    return await this.model.findUnique({ where: { id } });
  }

  async create(data: CreateShelfDto) {
    return await this.model.create({ data });
  }

  async update(id: number, data: UpdateShelfDto) {
    return await this.model.update({ data, where: { id } })
  }

  async delete(id: number) {
    return await this.model.delete({ where: { id } })
  }

}