import express from 'express'
import * as Controllers from './controllers';
import { PrismaClient } from '@prisma/client';

main();


async function main() {
  const app = express();

  const client = new PrismaClient();

  console.log("Connecting to database");
  await client.$connect();
  console.log("Connected to database");

  const binController = new Controllers.BinController(client);
  const shelfController = new Controllers.ShelfController(client);
  const itemController = new Controllers.ItemController(client);

  app.get('/', (_req, res) => res.json('Hello world'));

  app.use('/api/bins', binController.getRouter());
  app.use('/api/shelves', shelfController.getRouter());
  app.use('/api/items', itemController.getRouter());


  app.listen(3002, () => console.log("Server started on port 3002"));
}
