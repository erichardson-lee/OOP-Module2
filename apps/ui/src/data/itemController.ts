import { Ref, ref } from "vue";
import { Item } from "./dbModels";


export class ItemController {
  private static instance: ItemController;
  private items = ref([] as Item[]);

  private constructor() { }

  public static getInstance(): ItemController {
    if (!ItemController.instance) {
      ItemController.instance = new ItemController();
    }
    return ItemController.instance;
  }


  public getItems(): Ref<Item[]> {
    fetch('/api/items', { method: 'GET' }).then((response) => {
      if (response.status !== 200) {
        console.error("Error fetching items");
      }
      else {
        response.json().then((i: Item[]) => {
          this.items.value = i;
        })
      }
    })

    return this.items;
  }

  public async addItem(item: Item): Promise<void> {
    await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).catch((err) => {
      console.error(err);
    });
  }

  public async deleteItem(item: Item): Promise<void> {
    await fetch('/api/items/' + item.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).catch((err) => {
      console.error(err);
    });
  }

  public async updateItem(item: Item): Promise<void> {
    await fetch('/api/items/' + item.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).catch((err) => {
      console.error(err);
    });
  }

  public async getItem(id: number): Promise<Item | null> {
    const response = await fetch('/api/items/' + id, { method: 'GET' });
    if (response.status !== 200) {
      console.error("Error fetching item");
      return null;
    }
    else {
      return response.json();
    }
  }
}