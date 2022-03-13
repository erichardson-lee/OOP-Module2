import { Bin, Prisma, PrismaClient } from '@prisma/client'
import bodyParser from 'body-parser';
import { Router } from 'express';
import { TestData } from './testData';

export interface CreateBinDto extends Omit<Bin, 'id' | 'createdAt' | 'updatedAt'> { }
export interface UpdateBinDto extends Partial<CreateBinDto> { }
export type BinTestData = TestData<Bin, CreateBinDto, UpdateBinDto>;


export class BinController {
  model: Prisma.BinDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor(private prisma: PrismaClient = new PrismaClient()) {
    this.model = prisma.bin;
  }

  getAll() {
    return this.model.findMany();
  }

  getById(id: number) {
    return this.model.findUnique({ where: { id } });
  }

  create(data: CreateBinDto) {
    return this.model.create({ data });
  }

  update(id: number, data: UpdateBinDto) {
    return this.model.update({ data, where: { id } })
  }

  delete(id: number) {
    return this.model.delete({ where: { id } })
  }

  getRouter(): Router {
    const router = Router()

    router.use(bodyParser.json())

    router.get('/', (_, res) => {
      res.json(this.getAll());
    })

    router.get('/:id', (req, res) => {
      const id: number = parseInt(req.params.id);

      if (Number.isNaN(id))
        return res.status(400).json({ error: 'Invalid id' });

      res.json(this.getById(id));
    })

    router.post('/', (req, res) => {
      const data: Bin = req.body;

      if (!data)
        return res.status(400).json({ error: 'Invalid data' });

      res.json(this.create(data));
    })

    router.put('/:id', (req, res) => {
      const id: number = parseInt(req.params.id);
      const data: Bin = req.body;

      if (Number.isNaN(id))
        return res.status(400).json({ error: 'Invalid id' });

      if (!data)
        return res.status(400).json({ error: 'Invalid data' });

      res.json(this.update(id, data));
    })

    router.delete('/:id', (req, res) => {
      const id: number = parseInt(req.params.id);

      if (Number.isNaN(id))
        return res.status(400).json({ error: 'Invalid id' });

      res.json(this.delete(id));
    })

    return router;
  }

}