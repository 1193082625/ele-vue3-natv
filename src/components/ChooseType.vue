<template>
  <div class="wrapper">
    <h3 class="title">选择导图样式开始创作</h3>
    <ul class="type-box">
      <li v-for="({type, img}) in data" :key="type" @click="chooseTypeHandle(type)">
        <img :src="img" alt="id">
      </li>
    </ul>
    <div class="btn-group">
      <span @click="changeTheme">切换主题</span>
      <span @click="openFile">打开文件</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import img1 from '../assets/images/img1.png';
import img2 from '../assets/images/img2.png';
import img3 from '../assets/images/img3.png';
import img4 from '../assets/images/img4.png';
import img5 from '../assets/images/img5.png';
import img6 from '../assets/images/img6.png';
import img7 from '../assets/images/img7.png';
import img8 from '../assets/images/img8.png';
import img9 from '../assets/images/img9.png';
import img10 from '../assets/images/img10.png';
import { useStore } from 'vuex';
const data = [
  {
    type: 'type1',
    img: img1
  },{
    type: 'type2',
    img: img2
  },{
    type: 'type3',
    img: img3
  },{
    type: 'type4',
    img: img4
  },{
    type: 'type5',
    img: img5
  },{
    type: 'type6',
    img: img6
  },{
    type: 'type7',
    img: img7
  },{
    type: 'type8',
    img: img8
  },{
    type: 'type9',
    img: img9
  },{
    type: 'type10',
    img: img10
  },
]

const store = useStore();
function chooseTypeHandle(type: string) {
  store.commit('setCurrentType', type);
}

function changeTheme() {
  console.log('切换主题');
  
}

function openFile() {
  console.log('打开文件');
  
}
</script>

<style scoped>
.wrapper{
  width: 950px;
  margin-top: 100px;
  margin-left: 10vw;
  border: 1px solid #e6e6e6;
  background: #f3f3f3;
  border-radius: 5px;
}
.title{
  line-height: 24px;
  text-align: center;
  font-weight: normal;
  font-size: 14px;
  border-bottom: 1px solid #e6e6e6;
}
.type-box{
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  gap: 12px;
  padding-left: 12px;
}
.type-box li{
  width: 220px;
  margin-top: 12px;
  border: 1px solid #e6e6e6;
}
.type-box li img{
  display: block;
  width: 100%;
  height: 100%;
}

.btn-group{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
  margin-bottom: 20px;
  gap: 24px;
}
.btn-group span{
  background: #fff;
  height: 34px;
  line-height: 34px;
  border-radius: 5px;
  padding-left: 12px;
  padding-right: 12px;
  border: 1px solid #ccc;
  font-weight: normal;
  font-size: 14px;
  cursor: pointer;
}
</style>