import { Ref, ref } from "vue";


export class RestController<Entity = any, CreateEntityDto = Entity, UpdateEntityDto = Partial<CreateEntityDto>> {
  private entities: Ref<Entity[]> = ref([]);

  constructor(private entityName: string) { }

  public loadAll() {
    fetch(`/api/${this.entityName}`, { method: 'GET' }).then((response) => {
      if (response.status !== 200) {
        console.error(`Error fetching ${this.entityName}s`);
      }
      else {
        response.json().then((i: Entity[]) => {
          this.entities.value = i;
        })
      }
    })
  }

  public findAll(): Ref<Entity[]> {
    this.loadAll()

    return this.entities;
  }

  public async create(entity: CreateEntityDto): Promise<void> {
    await fetch(`/api/${this.entityName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entity)
    }).catch((err) => {
      console.error(err);
    });

    this.loadAll()
  }

  public async delete(id: string | number): Promise<void> {
    await fetch(`/api/${this.entityName}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).catch((err) => {
      console.error(err);
    });

    this.loadAll()
  }

  public async update(id: string | number, entity: Entity): Promise<void> {
    await fetch(`/api/${this.entityName}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entity)
    }).catch((err) => {
      console.error(err);
    });

    this.loadAll()
  }

  public async find(id: string | number): Promise<Entity | null> {
    const response = await fetch(`/api/${this.entityName}/${id}`, { method: 'GET' });
    if (response.status !== 200) {
      console.error(`Error fetching ${this.entityName} with id ${id}`);
      return null;
    }
    else {
      return response.json();
    }
  }
}