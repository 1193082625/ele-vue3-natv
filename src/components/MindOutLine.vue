<template>
  <div class="mind-outline" :style="{width: (nodeWidth || 120) + 'px', height: (nodeHeight || 40) + 'px'}"></div>
</template>
<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
const getNode = inject<Function>('getNode');
const nodeWidth = ref(0);
const nodeHeight = ref(0);
  onMounted(() => {
    if (getNode) {
      const node = getNode();
      changSize(node.data);
      node.on('change:attrs', ({current}: any) => {
        changSize(current);
      })
    }
  })
  function changSize(newData: any) {
    const { width, height } = newData;
    nodeWidth.value = width;
    nodeHeight.value = height;
  }
</script>
<style scoped>
  .mind-outline{
    min-width: 140px;
    min-height: 40px;
    border: 1px dashed #000;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>