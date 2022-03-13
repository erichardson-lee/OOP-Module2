import { Item, Prisma, PrismaClient } from '@prisma/client'
import bodyParser from 'body-parser';
import { Router } from 'express';


export class ItemController {
  model: Prisma.ItemDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor(private prisma: PrismaClient = new PrismaClient()) {
    this.model = prisma.item;
  }

  async getAll() {
    return this.model.findMany();
  }

  async getById(id: number) {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: Item) {
    return this.model.create({ data });
  }

  async update(id: number, data: Item) {
    return this.model.update({ data, where: { id } })
  }

  async delete(id: number) {
    return this.model.delete({ where: { id } })
  }

  getRouter(): Router {
    const router = Router()

    router.use(bodyParser.json())

    router.get('/', async (_, res) => {
      res.json(await this.getAll());
    })

    router.get('/:id', async (req, res) => {
      const id: number = parseInt(req.params.id);

      if (Number.isNaN(id))
        return res.status(400).json({ error: 'Invalid id' });

      res.json(await this.getById(id));
    })

    router.post('/', async (req, res) => {
      const data: Item = req.body;

      if (!data)
        return res.status(400).json({ error: 'Invalid data' });

      res.json(await this.create(data));
    })

    router.put('/:id', async (req, res) => {
      const id: number = parseInt(req.params.id);
      const data: Item = req.body;

      if (Number.isNaN(id))
        return res.status(400).json({ error: 'Invalid id' });

      if (!data)
        return res.status(400).json({ error: 'Invalid data' });

      res.json(await this.update(id, data));
    })

    router.delete('/:id', async (req, res) => {
      const id: number = parseInt(req.params.id);

      if (Number.isNaN(id))
        return res.status(400).json({ error: 'Invalid id' });

      res.json(await this.delete(id));
    })

    return router;
  }

}