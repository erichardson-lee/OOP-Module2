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
      <item-editor @close="() => editMode = false" :item="item" />
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
import type { Item } from '../data/dbModels';
import { ItemController } from '../data/ItemController';
import ItemEditor from './ItemEditor.vue';

const itemController = ItemController.getInstance();

const props = defineProps(
  {
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
  },
);

const editMode = ref(false);

const editClick = () => editMode.value = true;
const deleteClick = () => itemController.delete(props.item.id);
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