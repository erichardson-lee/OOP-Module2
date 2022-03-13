import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import { Router } from 'express';


export abstract class Controller<Type, CreateTypeDto = Type, UpdateTypeDto = Partial<CreateTypeDto>> {
  constructor(private prisma: PrismaClient = new PrismaClient()) { }

  public abstract getAll(): Promise<Type[]>

  public abstract getById(id: number): Promise<Type | undefined>

  public abstract create(data: CreateTypeDto): Promise<Type>

  public abstract update(id: number, data: UpdateTypeDto): Promise<Type>

  public abstract delete(id: number): Promise<Type>

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
      const data: CreateTypeDto = req.body;

      if (!data)
        return res.status(400).json({ error: 'Invalid data' });

      res.json(await this.create(data));
    })

    router.put('/:id', async (req, res) => {
      const id: number = parseInt(req.params.id);
      const data: UpdateTypeDto = req.body;

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