import { Bin } from "./dbModels";
import { RestController } from "./RestController";

export interface CreateBinDto extends Omit<Bin, 'id' | 'createdAt' | 'updatedAt'> { }
export interface UpdateBinDto extends Partial<CreateBinDto> { }

export class BinController extends RestController<Bin, CreateBinDto, UpdateBinDto> {
  private static instance: BinController;

  constructor() {
    super('bins');
  }

  public static getInstance(): BinController {
    if (!BinController.instance) {
      BinController.instance = new BinController();
    }
    return BinController.instance;
  }
}
