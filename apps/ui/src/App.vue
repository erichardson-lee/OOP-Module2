<script setup lang="ts">
import { Item } from './data/items';
import ItemCard from './components/ItemCard.vue';
import ScrollBox from './components/ScrollBox.vue';

const items: Item[] = [
  {
    id: 'e5202b24-934a-4704-b76f-a94d426191ab',
    name: 'Item 1',
    description: 'This is item 1',
    weight: 0.89
  },
  {
    id: '7ff1b286-d0a3-4be7-ae1d-8089d26762c0',
    name: 'Item 2',
    description: 'This is item 2',
    weight: 0.5619
  },
  {
    id: 'f8f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
    name: 'Item 3',
    description: 'This is item 3',
    weight: 0.71589
  },
  {
    id: '49098688-1dff-4e36-8b14-786cb35da9a3',
    name: 'Item 4',
    description: 'This is item 4',
    weight: 0.8567
  }
];

</script>

<template>
  <div id="itemList" class="grid-item column">
    <h1>Item List</h1>
    <scroll-box style="height: 90%">
      <item-card v-for="item in items" :item="item" :key="item.id" />
    </scroll-box>
  </div>
  <div id="shelves" class="grid-item">
    <h1>Shelves</h1>
  </div>
</template>

<style>
#app {
  display: grid;
  grid-template-columns: 600px auto;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#itemList {
  grid-column: 1;
  background-color: #3b523b;
  border-right: 3px solid #000;
}
#shelves {
  grid-column: 2;
}

.column {
  display: flex;
  flex-direction: column;
}

.grid-item {
  height: 100vh;
  padding: 1rem;
  margin: 0;
}
</style>
