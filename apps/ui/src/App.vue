<script setup lang="ts">
import { ItemController } from './data/itemController';
import ItemCard from './components/ItemCard.vue';
import ScrollBox from './components/ScrollBox.vue';
import { Ref } from 'vue';
import { Item } from './data/dbModels';

const itemController = ItemController.getInstance();

const items: Ref<Item[]> = itemController.getItems();

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
