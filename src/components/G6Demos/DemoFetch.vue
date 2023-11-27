<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
  import G6 from '@antv/g6';
  import { onMounted } from 'vue';

  onMounted(async () => {
    const res = await fetch('https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json');
    const remoteData = await res.json();
   
    // 创建实例
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      fitView: true, // 设置是否将图适配到画布中
      fitViewPadding: [20, 40, 50, 20], // 画布上四周的留白宽度
      animate: true,
    });
    graph.data(remoteData);
    graph.render();
  })

</script>
