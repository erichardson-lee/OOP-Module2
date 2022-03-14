<script setup lang="ts">
import { ItemController } from './data/ItemController';
import { ShelfController } from './data/ShelfController'

import ItemCard from './components/ItemCard.vue';
import ItemEditor from './components/ItemEditor.vue';
import ScrollBox from './components/ScrollBox.vue';

import { ref, Ref } from 'vue';
import { Item } from './data/dbModels';
import ShelfView from './components/ShelfView.vue';

const itemController = ItemController.getInstance();
const shelfController = ShelfController.getInstance();

const shelfs = shelfController.findAll();

const currentShelf = ref(0);

const items: Ref<Item[]> = itemController.findAll();

const addItemMenu = ref(false);
const openAddItem = () => addItemMenu.value = true;

</script>

<template>
  <div id="itemList" class="grid-item column">
    <h1>Item List</h1>
    <button @click="openAddItem" class="btn">Add Item</button>
    <scroll-box style="height: 90%">
      <item-card v-for="item in items" :item="item" :key="item.id" />
    </scroll-box>
  </div>
  <div id="shelves" class="grid-item">
    <h1>Shelves</h1>
    <div>
      <button
        class="pa-none mx-1 text-xl"
        :disabled="((currentShelf - 1) < 0)"
        @click="currentShelf--"
      >⬅️</button>
      <button
        class="pa-none mx-1 text-xl"
        :disabled="((currentShelf + 1) >= shelfs.length)"
        @click="currentShelf++"
      >➡️</button>
    </div>
    <hr />
    <shelf-view :shelf="shelfs[currentShelf]" :key="currentShelf" />
  </div>

  <teleport to="#modals">
    <div
      v-if="addItemMenu"
      class="w-screen h-screen absolute bottom-0 left-0 bg-transparent flex items-center justify-center"
    >
      <item-editor @close="() => addItemMenu = false" />
    </div>
  </teleport>
</template>

<style src="./app.css">
</style>
