import { Item } from "./dbModels";
import { RestController } from "./RestController";

export class ItemController extends RestController<Item, Item, Partial<Item>> {
  private static instance: ItemController;

  constructor() {
    super('items');
  }

  public static getInstance(): ItemController {
    if (!ItemController.instance) {
      ItemController.instance = new ItemController();
    }
    return ItemController.instance;
  }

}