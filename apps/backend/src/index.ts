import express from 'express'
import { ItemController } from './itemController';
import { BinController } from './binController';
import { ShelfController } from './shelfController';
import { PrismaClient } from '@prisma/client';

main();


async function main() {
  const app = express();

  const client = new PrismaClient();

  console.log("Connecting to database");
  await client.$connect();
  console.log("Connected to database");

  const binController = new BinController(client);
  const shelfController = new ShelfController(client);
  const itemController = new ItemController(client);

  app.get('/', (_req, res) => res.json('Hello world'));

  app.use('/bins', binController.getRouter());
  app.use('/shelves', shelfController.getRouter());
  app.use('/items', itemController.getRouter());


  app.listen(3002, () => console.log("Server started on port 3002"));
}
