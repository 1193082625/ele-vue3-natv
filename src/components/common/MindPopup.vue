<template>
  <div class="flag-box">
    <div class="flag-top">
      <i class="iconfont icon-icon_huabanfuben" :class="{active: currentIdx === 0}" @click="changeTab(0)"></i>
      <i class="iconfont icon-RectangleCopy" :class="{active: currentIdx === 1}" @click="changeTab(1)"></i>
      <i class="iconfont icon-RectangleCopy" :class="{active: currentIdx === 2}" @click="changeTab(2)"></i>
    </div>
    <div class="flag-cont">
      我是弹窗
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const currentIdx = ref(0);

function changeTab(idx: number){
  currentIdx.value = idx;
}
</script>
<style scoped>
.flag-box{
  width: 220px;
  height: 400px;
  position: fixed;
  right: 20px;
  top: 90px;
  background-color: #f8f8f8;
  z-index: 10;
  border-radius: 5px;
  box-shadow: 0 10px 3px #ccc;
}
.flag-top{
  display: flex;
  align-items: center;
  height: 32px;
  justify-content: space-around;
  border-bottom:  1px solid #ebebeb;
}
.flag-top .iconfont{
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 6px;
  cursor: pointer;
}
.flag-top .active{
  background-color: #e5e5e5;
}
.flag-cont{
  padding: 8px;
}
</style>