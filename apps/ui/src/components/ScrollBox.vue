<template>
  <div class="scrollbox">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.scrollbox {
  overflow-y: scroll;
  height: fit-content;
}
</style>