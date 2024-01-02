<template>
  <!-- 头部操作栏 -->
  <Header></Header>
  <div class="content">
    <ChooseType v-if="!currentType"></ChooseType>
    <MindMap v-if="currentType"></MindMap>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron';
import Header from './components/common/Header.vue';
import MindMap from './components/MindMap.vue';
import ChooseType from './components/ChooseType.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const currentType = computed(() => store.state.graph.currentType);

// 渲染进程接收主进程消息
ipcRenderer.on('load', (_, data) => {
  console.log(data.message)
})

</script>

<style scoped>
</style>