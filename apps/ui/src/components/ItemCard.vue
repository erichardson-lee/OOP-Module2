<template>
  <div class="card">
    <span class="name">{{ item.name }}</span>
    <span class="desc">{{ item.description }}</span>
    <span class="weight">{{ item.weight }}</span>
    <div class="buttons">
      <button class="btn" @click="onClick">Edit</button>
      <button class="btn" @click="onClick">Delete</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { Item } from '../data/items';

const props = defineProps(
  {
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
  },
);

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