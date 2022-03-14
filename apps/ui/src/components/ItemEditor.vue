<template>
  <div class="bg-white block rounded border-1 text-black pa-lg w-1/2">
    <span v-if="item" class="block text-center">Edit {{ itemr.name }}</span>
    <span v-else class="block text-center">Creating New Item</span>

    <div>
      <label class="block" for="name">Name</label>
      <input class="block w-full" id="name" v-model="itemr.name" />
    </div>

    <div>
      <label class="block" for="description">Description</label>
      <textarea class="block w-full resize-y" id="description" v-model="itemr.description" />
    </div>

    <div>
      <label class="block" for="weight">Weight</label>
      <input class="block w-full" id="weight" type="number" v-model.number="itemr.weight" />
    </div>

    <div class="flex justify-around mt-sm">
      <button @click="saveClick" class="btn">Save</button>
      <button @click="closeClick" class="btn">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive } from 'vue';
import { Item } from '../data/dbModels';
import { CreateItemDto, ItemController } from '../data/ItemController';

const itemController = ItemController.getInstance();

const props = defineProps(
  {
    item: {
      type: Object as PropType<Item>,
    },
  },
);

const itemr = props.item ?? reactive<CreateItemDto>({ name: '', description: '', weight: 0 });

const emit = defineEmits([
  'save',
  'close',
]);

const saveClick = async () => {
  if (props.item) {
    await itemController.update(props.item.id, itemr);
  } else {
    await itemController.create(itemr);
  }
  emit('save');
  emit('close')
}
const closeClick = () => emit('close');

</script>

<style lang="scss" scoped>
</style>