<template>
  <div class="scrollbox">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.scrollbox {
  overflow-y: auto;
  overflow-x: hidden;
  height: fit-content;
}
</style>