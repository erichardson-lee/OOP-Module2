import { Shelf } from "./dbModels";
import { RestController } from "./RestController";

export interface CreateShelfDto extends Omit<Shelf, 'id' | 'createdAt' | 'updatedAt'> { }
export interface UpdateShelfDto extends Partial<CreateShelfDto> { }

export class ShelfController extends RestController<Shelf, CreateShelfDto, UpdateShelfDto> {
  private static instance: ShelfController;

  constructor() {
    super('items');
  }

  public static getInstance(): ShelfController {
    if (!ShelfController.instance) {
      ShelfController.instance = new ShelfController();
    }
    return ShelfController.instance;
  }

}