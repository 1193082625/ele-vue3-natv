<template>
  <div class="mind-node">
    {{ nodeCont }}
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
const getNode = inject<Function>('getNode');
const nodeCont = ref('子主题');
  onMounted(() => {
    if (getNode) {
      const node = getNode();
      nodeCont.value = node.attr('label/text');
      node.on('change:attrs', ({current}: any) => {
        nodeCont.value = current?.text?.text || current?.label?.text;
        console.log(66, nodeCont.value);
        
      })
    }
  })
</script>
<style scoped>
  .mind-node{
    border: 1px solid #09c91e;
    width: 120px;
    min-height: 40px;
    line-height: 40px;
    border-radius: 4px;
    padding-left: 8px;
    padding-right: 8px;
  }
</style>