<template>
  <div class="btn">
    <MyIcon v-if="icon" :name="icon" :color="color"></MyIcon>
    <span class="name">{{name}}</span>
  </div>
</template>

<script setup lang="ts">
import '../../assets/fonts/iconfont.css';
import MyIcon from './MyIcon.vue'

defineProps({
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  name: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.btn{
  width: 58px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.btn .name{
  font-size: 12px;
  text-align: center;
  display: block;
  margin-top: 2px;
}
</style>