<template>
  <div>
    {{ shelf?.name }}
    <hr />
    <h1 v-if="shelfBins.length === 0">No Bins Found for this shelf</h1>
    <div v-else class="flex column">
      <div v-for="row in binChartArrays" class="flex row">
        <div v-for="bin in row" class="border-1 pa-2 mx-2">
          <span class="block text-center">{{ bin.name }}</span>

          <span class="block text-center">Item: {{ bin.itemId }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { BinController } from '../data/BinController';
import { Bin, Shelf } from '../data/dbModels';

const p = defineProps({
  shelf: {
    type: Object as PropType<Shelf>,
    required: true,
  }
});

const binController = BinController.getInstance();
const bins = binController.findAll();

const shelfBins = computed(() => bins.value.filter((bin) => bin.shelfId === p.shelf.id));

const binChartOther = computed(() => shelfBins.value.filter((bin) => !bin.shelfX || !bin.shelfY));

const binChart = computed(() =>
  shelfBins.value.reduce((ret, bin) => {
    if (!bin.shelfX || !bin.shelfY) {
      return ret;
    }

    if (!ret[bin.shelfY]) {
      ret[bin.shelfY] = {};
    }

    ret[bin.shelfY][bin.shelfX] = bin;

    return ret;
  }, {} as Record<number, Record<number, Bin>>)
);

const binChartArrays = computed(() => Object.values(binChart.value).map((bins) => Object.values(bins)));

</script>

<style scoped>
</style>