<template>
  <div class="header">
    <div @click="changLayout">
      <IconBtn icon="icon-list" name="文字大纲" color="#e20cc4" ></IconBtn>
    </div>
    <div class="utils-box">
      <IconBtn v-for="({icon, name, color, type}) in utils" :key="type" :icon="icon" :name="name" :color="color" @click="actionHandle(type)"></IconBtn>
    </div>
    <div class="btn-group">
      <IconBtn icon="icon-format" name="样式" color="#0663f4" @click="showDialog()"></IconBtn>
      <IconBtn icon="icon-cloud" name="云同步" color="#0663f4" @click="send()"></IconBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron';
import IconBtn from './IconBtn.vue';
import $bus from '@/bus';
import { store } from '../../store';

const changLayout = () => {
  store.commit('setLayout')
  $bus.emit('changeLayout');
}

const actionHandle = (type: string) => {
  $bus.emit('activeBtnHandler', type);
}

const send = () => {
  ipcRenderer.send('message', 12321);
}

const showDialog = () => {
  ipcRenderer.send('show-dialog');
}

interface UtilItem {
  type: string;
  icon: string;
  color?: string;
  name: string;
}

const utils: UtilItem[] = [
  {
    type: 'move',
    icon: 'icon-move',
    color: '#0c59e2',
    name: '移动'
  },{
    type: 'copy',
    icon: 'icon-copy',
    color: '#0b17f0',
    name: '拷贝'
  },{
    type: 'delete',
    icon: 'icon-delete',
    name: '删除'
  },{
    type: 'image',
    icon: 'icon-image',
    color: '#09c91e',
    name: '图片'
  },{
    type: 'remark',
    icon: 'icon-remark',
    color: '#f4ea29',
    name: '备注'
  },{
    type: 'color',
    icon: 'icon-color',
    color: '#d40ad0',
    name: '颜色'
  },{
    type: 'packup',
    icon: 'icon-packUp',
    color: '#d40ab1',
    name: '收起'
  },{
    type: 'flag',
    icon: 'icon-flag',
    color: '#d40a48',
    name: '标记'
  },{
    type: 'link',
    icon: 'icon-guanlian',
    color: '#d40ab1',
    name: '连接'
  },{
    type: 'collect',
    icon: 'icon-collect',
    color: '#d40a48',
    name: '汇总'
  },{
    type: 'formula',
    icon: 'icon-move',
    color: '#6fd40a',
    name: '公式'
  },{
    type: 'website',
    icon: 'icon-website',
    color: '#6fd40a',
    name: '网址'
  },{
    type: 'attachments',
    icon: 'icon-attachments',
    color: '#6fd40a',
    name: '附件'
  },
];

</script>

<style scoped>
.header{
  background: #eee;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  /* position: fixed;
  left: 0;
  top: 0; */
  width: 100vw;
  box-sizing: border-box;
  /* z-index: 100; */
}
.utils-box,
.btn-group{
  display: flex;
  align-items: center;
}
</style>
