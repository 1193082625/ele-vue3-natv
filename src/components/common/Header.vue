<template>
  <div class="header">
    <div @click="changLayout">
      <IconBtn icon="icon-list" name="文字大纲" color="#e20cc4" ></IconBtn>
    </div>
    <div class="utils-box">
      <IconBtn v-for="({icon, name, color, type}) in utils" :key="type" :icon="icon" :name="name" :color="color" @click="actionHandle(type)"></IconBtn>
    </div>
    <div class="btn-group">
      <IconBtn icon="icon-format" name="格式" color="#0663f4" @click="showDialog()"></IconBtn>
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
  children?: UtilItem[]
}

const utils: UtilItem[] = [
  {
    type: 'addNode',
    icon: 'icon-move',
    color: '#0c59e2',
    name: '主题'
  },{
    type: 'addChild',
    icon: 'icon-copy',
    color: '#0b17f0',
    name: '子主题'
  },{
    type: 'connection',
    icon: 'icon-delete',
    name: '联系'
  },{
    type: 'summary',
    icon: 'icon-image',
    color: '#09c91e',
    name: '概要'
  },{
    type: 'outline',
    icon: 'icon-remark',
    color: '#f4ea29',
    name: '外框'
  },{
    type: 'flag',
    icon: 'icon-color',
    color: '#d40ad0',
    name: '标记'
  },{
    type: 'insert',
    icon: 'icon-packUp',
    color: '#d40ab1',
    name: '插入',
    children: [
      {
        type: 'packup',
        icon: 'icon-packUp',
        color: '#d40ab1',
        name: '笔记',
      }, {
        type: 'packup',
        icon: 'icon-packUp',
        color: '#d40ab1',
        name: '标签',
      }, {
        type: 'packup',
        icon: 'icon-packUp',
        color: '#d40ab1',
        name: '任务',
      }, {
        type: 'packup',
        icon: 'icon-packUp',
        color: '#d40ab1',
        name: '链接',
      }, {
        type: 'packup',
        icon: 'icon-packUp',
        color: '#d40ab1',
        name: '附件',
      }, {
        type: 'packup',
        icon: 'icon-packUp',
        color: '#d40ab1',
        name: '贴纸',
      }, {
        type: 'packup',
        icon: 'icon-packUp',
        color: '#d40ab1',
        name: '图片',
      }, {
        type: 'packup',
        icon: 'icon-packUp',
        color: '#d40ab1',
        name: '本地插画',
      }, {
        type: 'packup',
        icon: 'icon-packUp',
        color: '#d40ab1',
        name: '方程',
      }
    ]
  }
];

</script>

<style scoped>
.header{
  /* 禁止页面全选或拖动选中文字 */
  user-select: none;
  background: #eee;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  width: 100vw;
  box-sizing: border-box;
}
.utils-box,
.btn-group{
  display: flex;
  align-items: center;
}
</style>
