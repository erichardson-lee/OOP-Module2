import { Shelf } from "@prisma/client";
import { ShelfController, CreateShelfDto, UpdateShelfDto, ShelfTestData } from "./ShelfController";
import { Context, MockContext, createMockContext } from './context'
import { TestData } from "./testData";

const TestData = <ShelfTestData>(
  {
    list: [
      {
        id: 1,
        name: 'Test Shelf 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Test Shelf 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],

    single: {
      createData: {
        name: 'Test Shelf 1',
      },
      data: {
        id: 1,
        name: 'Test Shelf 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      updateData: {
        name: 'Test Shelf 1',
      }
    }
  }
);

describe('ShelfController', () => {
  let shelfController: ShelfController;
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    shelfController = new ShelfController(ctx.prisma);
  });

  it('Should be defined', () => {
    expect(shelfController).toBeDefined();
  });

  describe('.create', () => {
    it('Should insert correct data to the database', () => {

      //@ts-expect-error Mock Typings are weird
      mockCtx.prisma.shelf.create.mockResolvedValueOnce(TestData.single.data);

      expect(shelfController.create(TestData.single.createData)).resolves.toEqual(TestData.single.data);
    })
  });


  describe('.getAll', () => {
    it('Should collect and return all data from the database', () => {
      mockCtx.prisma.shelf.findMany.mockResolvedValueOnce(TestData.list);

      expect(shelfController.getAll()).resolves.toEqual(TestData.list);
    })
  });

  describe('.getById', () => {
    it('Should collect and return data from the database', () => {
      mockCtx.prisma.shelf.findUnique.mockResolvedValueOnce(TestData.single.data);

      expect(shelfController.getById(TestData.single.data.id)).resolves.toEqual(TestData.single.data);
    })
  });

  describe('.update', () => {
    it('Should update data in the database', () => {
      mockCtx.prisma.shelf.update.mockResolvedValueOnce(TestData.single.data);

      expect(shelfController.update(TestData.single.data.id, TestData.single.updateData)).resolves.toEqual(TestData.single.data);
    })
  });

  describe('.delete', () => {
    it('Should delete data from the database', () => {
      mockCtx.prisma.shelf.delete.mockResolvedValueOnce(TestData.single.data);

      expect(shelfController.delete(TestData.single.data.id)).resolves.toEqual(TestData.single.data);
    })
  });

  describe('.getRouter', () => {
    it('Should return a router', () => {
      expect(shelfController.getRouter()).toBeDefined();
    });
  });
});