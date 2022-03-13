import { Bin } from "@prisma/client";
import { mock } from "jest-mock-extended";
import { BinController, CreateBinDto } from "./BinController";
import { Context, MockContext, createMockContext } from './context'

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
      const binDto: CreateBinDto = {
        itemId: 1,
        name: '',
        shelfId: null,
        shelfX: null,
        shelfY: null
      };

      const bin: Bin = Object.assign(binDto, {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Omit<Bin, keyof CreateBinDto>);

      //@ts-expect-error Mock Typings are weird
      mockCtx.prisma.bin.create.mockResolvedValueOnce(bin);

      expect(binController.create(binDto)).resolves.toEqual(bin);
    })
  });


  describe('.getAll', () => {
    it('Should collect and return all data from the database', () => {
      const bins: Bin[] = [
        {
          id: 1,
          itemId: 1,
          name: 'Bin1',
          shelfId: null,
          shelfX: null,
          shelfY: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          itemId: 2,
          name: 'Bin2',
          shelfId: null,
          shelfX: null,
          shelfY: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ];

      mockCtx.prisma.bin.findMany.mockResolvedValueOnce(bins);

      expect(binController.getAll()).resolves.toEqual(bins);
    })
  });

  describe('.getById', () => {
    it('Should collect and return data from the database', () => {
      const bin: Bin = {
        id: 1,
        itemId: 1,
        name: 'Bin1',
        shelfId: null,
        shelfX: null,
        shelfY: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockCtx.prisma.bin.findUnique.mockResolvedValueOnce(bin);

      expect(binController.getById(1)).resolves.toEqual(bin);
    })
  });

  describe('.update', () => {
    it('Should update data in the database', () => {
      const bin: Bin = {
        id: 1,
        itemId: 1,
        name: 'Bin1',
        shelfId: null,
        shelfX: null,
        shelfY: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockCtx.prisma.bin.update.mockResolvedValueOnce(bin);

      expect(binController.update(1, bin)).resolves.toEqual(bin);
    })
  });

  describe('.delete', () => {
    it('Should delete data from the database', () => {
      const bin: Bin = {
        id: 1,
        itemId: 1,
        name: 'Bin1',
        shelfId: null,
        shelfX: null,
        shelfY: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockCtx.prisma.bin.delete.mockResolvedValueOnce(bin);

      expect(binController.delete(1)).resolves.toEqual(bin);
    })
  });

  describe('.getRouter', () => {
    it('Should return a router', () => {
      expect(binController.getRouter()).toBeDefined();
    });
  });
});