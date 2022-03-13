import { Item, Prisma, PrismaClient } from '@prisma/client'
import { Controller } from './Controller';
import { TestData } from './testData';

export interface CreateItemDto extends Omit<Item, 'id' | 'createdAt' | 'updatedAt'> { }
export interface UpdateItemDto extends Partial<CreateItemDto> { }
export type ItemTestData = TestData<Item, CreateItemDto, UpdateItemDto>;

export class ItemController extends Controller<Item, CreateItemDto, UpdateItemDto> {
  private model: Prisma.ItemDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor(prisma?: PrismaClient) {
    super(prisma)

    this.model = prisma.item;
  }

  async getAll() {
    return await this.model.findMany();
  }

  async getById(id: number) {
    return await this.model.findUnique({ where: { id } });
  }

  async create(data: CreateItemDto) {
    return await this.model.create({ data });
  }

  async update(id: number, data: UpdateItemDto) {
    return await this.model.update({ data, where: { id } })
  }

  async delete(id: number) {
    return await this.model.delete({ where: { id } })
  }
}