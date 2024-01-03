<template>
  <!-- 头部操作栏 -->
  <Header></Header>
  <div class="content">
    <ChooseType v-if="!currentType"></ChooseType>
    <MindMap v-if="currentType"></MindMap>
    <MindPopup v-if="flasIsOpen"></MindPopup>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron';
import Header from './components/common/Header.vue';
import MindPopup from './components/common/MindPopup.vue';
import MindMap from './components/MindMap.vue';
import ChooseType from './components/ChooseType.vue';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import $bus from './bus';

const store = useStore();
const currentType = computed(() => store.state.graph.currentType);
const flasIsOpen = ref(false);

// 渲染进程接收主进程消息
ipcRenderer.on('load', (_, data) => {
  console.log(data.message)
})

$bus.on('triggerFlag', () => {
  flasIsOpen.value = !flasIsOpen.value;
})
</script>

<style scoped>
</style>