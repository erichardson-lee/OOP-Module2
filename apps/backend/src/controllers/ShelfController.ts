import { Shelf, Prisma, PrismaClient } from '@prisma/client'
import bodyParser from 'body-parser';
import { Router } from 'express';
import { TestData } from './testData';

export interface CreateShelfDto extends Omit<Shelf, 'id' | 'createdAt' | 'updatedAt'> { }
export interface UpdateShelfDto extends Partial<CreateShelfDto> { }
export type ShelfTestData = TestData<Shelf, CreateShelfDto, UpdateShelfDto>;

export class ShelfController {
  model: Prisma.ShelfDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor(private prisma: PrismaClient = new PrismaClient()) {
    this.model = prisma.shelf;
  }

  getAll() {
    return this.model.findMany();
  }

  getById(id: number) {
    return this.model.findUnique({ where: { id } });
  }

  create(data: CreateShelfDto) {
    return this.model.create({ data });
  }

  update(id: number, data: UpdateShelfDto) {
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
      const data: Shelf = req.body;

      if (!data)
        return res.status(400).json({ error: 'Invalid data' });

      res.json(this.create(data));
    })

    router.put('/:id', (req, res) => {
      const id: number = parseInt(req.params.id);
      const data: Shelf = req.body;

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