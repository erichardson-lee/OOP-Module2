<script setup lang="ts">
import { ItemController } from './data/ItemController';
import { ShelfController } from './data/ShelfController'

import ItemCard from './components/ItemCard.vue';
import ScrollBox from './components/ScrollBox.vue';


import { ref, Ref } from 'vue';
import { Item } from './data/dbModels';
import ShelfView from './components/ShelfView.vue';

const itemController = ItemController.getInstance();
const shelfController = ShelfController.getInstance();

const shelfs = shelfController.findAll();

const currentShelf = ref(0);

const items: Ref<Item[]> = itemController.findAll();

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
    <div>
      <button class="pa-0 mx-1" :disabled="((currentShelf - 1) < 0)" @click="currentShelf--">⬅️</button>
      <button
        class="pa-0 mx-1"
        :disabled="((currentShelf + 1) >= shelfs.length)"
        @click="currentShelf++"
      >➡️</button>
    </div>
    <hr />
    <shelf-view :shelf="shelfs[currentShelf]" />
  </div>
</template>

<style src="./app.css">
</style>
