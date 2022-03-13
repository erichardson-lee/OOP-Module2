import { ItemController, ItemTestData } from "./ItemController";
import { Context, MockContext, createMockContext } from '../context'
import { TestData } from "./testData";

const TestData = <ItemTestData>({
  list: [
    {
      id: 1,
      name: 'Test Item 1',
      weight: 1.23456,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Test Item 2',
      weight: 2.34567,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],

  single: {
    data: {
      id: 1,
      name: 'Test Item 1',
      weight: 1.23456,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    createData: {
      name: 'Test Item 1',
      weight: 1.23456,
    },
    updateData: {
      name: 'Test Item 1',
    }
  }
});

describe('ItemController', () => {
  let itemController: ItemController;
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    itemController = new ItemController(ctx.prisma);
  });

  it('Should be defined', () => {
    expect(itemController).toBeDefined();
  });

  describe('.create', () => {
    it('Should insert correct data to the database', () => {

      //@ts-ignore Mock Typings are weird
      mockCtx.prisma.item.create.mockResolvedValueOnce(TestData.single.data);

      expect(itemController.create(TestData.single.createData)).resolves.toEqual(TestData.single.data);
    })
  });


  describe('.getAll', () => {
    it('Should collect and return all data from the database', () => {
      mockCtx.prisma.item.findMany.mockResolvedValueOnce(TestData.list);

      expect(itemController.getAll()).resolves.toEqual(TestData.list);
    })
  });

  describe('.getById', () => {
    it('Should collect and return data from the database', () => {
      mockCtx.prisma.item.findUnique.mockResolvedValueOnce(TestData.single.data);

      expect(itemController.getById(TestData.single.data.id)).resolves.toEqual(TestData.single.data);
    })
  });

  describe('.update', () => {
    it('Should update data in the database', () => {
      mockCtx.prisma.item.update.mockResolvedValueOnce(TestData.single.data);

      expect(itemController.update(TestData.single.data.id, TestData.single.updateData)).resolves.toEqual(TestData.single.data);
    })
  });

  describe('.delete', () => {
    it('Should delete data from the database', () => {
      mockCtx.prisma.item.delete.mockResolvedValueOnce(TestData.single.data);

      expect(itemController.delete(TestData.single.data.id)).resolves.toEqual(TestData.single.data);
    })
  });

  describe('.getRouter', () => {
    it('Should return a router', () => {
      expect(itemController.getRouter()).toBeDefined();
    });
  });
});