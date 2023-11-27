<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
  import G6 from '@antv/g6';
  import { onMounted } from 'vue';

  onMounted(() => {
    const data = {
      // 点集
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 200,
          label: '起始点'
        },
        {
          id: 'node2',
          x: 300,
          y: 200,
          label: '目标点'
        }
      ],
      // 边集
      edges: [
        // 表示一条从Node1连接到node2节点的边
        {
          source: 'node1',
          target: 'node2',
          label: '我是连线'
        }
      ]
    };

    // 创建实例
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
  })

</script>
