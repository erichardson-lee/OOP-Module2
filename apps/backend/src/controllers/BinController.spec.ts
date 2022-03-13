import { BinController, BinTestData } from "./BinController";
import { Context, MockContext, createMockContext } from '../context'
import { TestData } from "./testData";

const TestData = <BinTestData>({
  list: [
    {
      id: 1,
      name: 'Test Bin 1',
      itemId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      shelfId: null,
      shelfX: null,
      shelfY: null
    },
    {
      id: 2,
      name: 'Test Bin 2',
      itemId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      shelfId: null,
      shelfX: null,
      shelfY: null
    }
  ],

  single: {
    createData: {
      itemId: 1,
      name: 'Test Bin 1',
      shelfId: null,
      shelfX: null,
      shelfY: null
    },
    data: {
      id: 1,
      itemId: 1,
      name: 'Test Bin 1',
      shelfId: null,
      shelfX: null,
      shelfY: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    updateData: {
      name: 'Test Bin 1',
    }
  }
});

describe('BinController', () => {
  let binController: BinController;
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    binController = new BinController(ctx.prisma);
  });

  it('Should be defined', () => {
    expect(binController).toBeDefined();
  });

  describe('.create', () => {
    it('Should insert correct data to the database', () => {

      //@ts-expect-error Mock Typings are weird
      mockCtx.prisma.bin.create.mockResolvedValueOnce(TestData.single.data);

      expect(binController.create(TestData.single.createData)).resolves.toEqual(TestData.single.data);
    })
  });


  describe('.getAll', () => {
    it('Should collect and return all data from the database', () => {
      mockCtx.prisma.bin.findMany.mockResolvedValueOnce(TestData.list);

      expect(binController.getAll()).resolves.toEqual(TestData.list);
    })
  });

  describe('.getById', () => {
    it('Should collect and return data from the database', () => {
      mockCtx.prisma.bin.findUnique.mockResolvedValueOnce(TestData.single.data);

      expect(binController.getById(TestData.single.data.id)).resolves.toEqual(TestData.single.data);
    })
  });

  describe('.update', () => {
    it('Should update data in the database', () => {
      mockCtx.prisma.bin.update.mockResolvedValueOnce(TestData.single.data);

      expect(binController.update(TestData.single.data.id, TestData.single.updateData)).resolves.toEqual(TestData.single.data);
    })
  });

  describe('.delete', () => {
    it('Should delete data from the database', () => {
      mockCtx.prisma.bin.delete.mockResolvedValueOnce(TestData.single.data);

      expect(binController.delete(TestData.single.data.id)).resolves.toEqual(TestData.single.data);
    })
  });

  describe('.getRouter', () => {
    it('Should return a router', () => {
      expect(binController.getRouter()).toBeDefined();
    });
  });
});