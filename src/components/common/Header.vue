<template>
  <div class="header">
    <div @click="changLayout">
      <IconBtn icon="icon-list" name="文字大纲" color="#e20cc4" ></IconBtn>
    </div>
    <div class="utils-box">
      <IconBtn v-for="(item) in utils" :key="item.type" :icon="item.icon" :name="item.name" :color="item.color" @click="actionHandle(item)"></IconBtn>
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

const actionHandle = (item: UtilItem) => {
  if(item.isPopup) {
    console.log('打开标记弹窗');
    $bus.emit('triggerFlag');
  } else if(item.children) {
    console.log('打开下拉菜单');
  } else {
    $bus.emit('activeBtnHandler', item.type);
  }
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
  isPopup?: boolean;
}

const utils: UtilItem[] = [
  {
    type: 'addNode',
    icon: 'icon-sisternode',
    color: '#0c59e2',
    name: '主题'
  },{
    type: 'addChild',
    icon: 'icon-subnode',
    color: '#0b17f0',
    name: '子主题'
  },{
    type: 'connection',
    icon: 'icon-collect',
    name: '联系'
  },{
    type: 'summary',
    icon: 'icon-collect',
    color: '#09c91e',
    name: '概要'
  },{
    type: 'outline',
    icon: 'icon-biankuang',
    color: '#f4ea29',
    name: '外框'
  },{
    type: 'flag',
    icon: 'icon-biaoji2',
    color: '#d40ad0',
    name: '标记',
    isPopup: true,
  },{
    type: 'insert',
    icon: 'icon-add-bold',
    color: '#d40ab1',
    name: '插入',
    children: [
      {
        type: 'packup',
        icon: 'icon-biji',
        color: '#d40ab1',
        name: '笔记',
      }, {
        type: 'packup',
        icon: 'icon-biaoqian1',
        color: '#d40ab1',
        name: '标签',
      }, {
        type: 'packup',
        icon: 'icon-renwu',
        color: '#d40ab1',
        name: '任务',
      }, {
        type: 'packup',
        icon: 'icon-website',
        color: '#d40ab1',
        name: '链接',
      }, {
        type: 'packup',
        icon: 'icon-attachments',
        color: '#d40ab1',
        name: '附件',
      }, {
        type: 'packup',
        icon: 'icon-RectangleCopy',
        color: '#d40ab1',
        name: '贴纸',
      }, {
        type: 'packup',
        icon: 'icon-image',
        color: '#d40ab1',
        name: '图片',
      }, {
        type: 'packup',
        icon: 'icon-mianfeisheji-',
        color: '#d40ab1',
        name: '本地插画',
      }, {
        type: 'packup',
        icon: 'icon-gongshi',
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
