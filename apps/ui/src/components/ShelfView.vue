<template>
  <div>{{ shelf?.name }}</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Shelf } from '../data/dbModels';

defineProps({
  shelf: {
    type: Object as PropType<Shelf>
  }
})
</script>

<style scoped>
</style>