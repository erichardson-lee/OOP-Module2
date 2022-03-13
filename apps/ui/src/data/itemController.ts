import { Item } from "./dbModels";
import { RestController } from "./RestController";

export interface CreateItemDto extends Omit<Item, 'id' | 'createdAt' | 'updatedAt'> { }
export interface UpdateItemDto extends Partial<CreateItemDto> { }

export class ItemController extends RestController<Item, CreateItemDto, UpdateItemDto> {
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