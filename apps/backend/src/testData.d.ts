export interface TestData<Type, CreateTypeDto = Type, UpdateTypeDto = Partial<CreateTypeDto>> {
  list: Type[];

  single: {
    data: Type;
    createData: CreateTypeDto;
    updateData: UpdateTypeDto;
  }
}