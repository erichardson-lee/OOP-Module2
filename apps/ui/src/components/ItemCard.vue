<template>
  <div class="card">
    <span class="name">{{ item.name }}</span>
    <span class="desc">{{ item.description }}</span>
    <span class="weight">{{ item.weight }}</span>
    <div class="buttons">
      <button @click="editClick">Edit</button>
      <button class="ml-sm" @click="deleteClick">Delete</button>
    </div>
  </div>

  <teleport to="#modals">
    <div
      v-if="editMode"
      class="w-screen h-screen absolute bottom-0 left-0 bg-transparent flex items-center justify-center"
    >
      <div class="bg-white block rounded border-1 text-black pa-lg w-1/2">
        <span class="block text-center">Edit {{ item.name }}</span>

        <div>
          <label class="block" for="name">Name</label>
          <input class="block w-full" id="name" v-model="item.name" />
        </div>

        <div>
          <label class="block" for="description">Description</label>
          <textarea class="block w-full resize-y" id="description" v-model="item.description" />
        </div>

        <div>
          <label class="block" for="weight">Weight</label>
          <input class="block w-full" id="weight" type="number" v-model.number="item.weight" />
        </div>

        <div class="flex justify-around mt-sm">
          <button @click="saveClick" class="btn">Save</button>
          <button @click="closeClick" class="btn">Close</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
import type { Item } from '../data/dbModels';
import { ItemController } from '../data/ItemController';

const itemController = ItemController.getInstance();

const props = defineProps(
  {
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
  },
);

const editClick = () => editMode.value = !editMode.value;
const deleteClick = () => itemController.delete(props.item.id);

const saveClick = () => itemController.update(props.item.id, props.item).then(() => editMode.value = false);
const closeClick = () => editMode.value = false;

const editMode = ref(false);
</script>

<style scoped>
.card {
  display: grid;
  grid-template-areas:
    "name name"
    "desc desc"
    "weight buttons";
  grid-template-columns: 5em 2fr;

  background-color: #4c5c4c;
  border-radius: 0.5em;
  padding: 0.5em;
  margin: 0.5em;
  border: 1px solid #4c5c4c;
}

.name {
  grid-area: name;
  font-size: 1.5em;
  font-weight: bold;
}

.desc {
  grid-area: desc;
  font-size: 1em;
}

.weight {
  grid-area: weight;
  font-size: 1em;
}

.buttons {
  grid-area: buttons;
  display: flex;
  justify-content: end;
}
</style>