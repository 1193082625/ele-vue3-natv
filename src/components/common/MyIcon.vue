<template>
  <span :class="['iconfont', 'icon', `${name}`]" :style="{color: color || '#515151'}"></span>
</template>

<script setup lang="ts">
defineProps({
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
.icon{
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 5px;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>