<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import { Graph } from '@antv/x6';
import { onMounted } from 'vue';

onMounted(() => {

  const data = {
    // 节点
    nodes: [
      {
        id: 'node1', // String，可选，节点的唯一标识
        shape: 'ellipse', // 设置节点图形， 默认rect
        x: 40,       // Number，必选，节点位置的 x 值
        y: 40,       // Number，必选，节点位置的 y 值
        width: 80,   // Number，可选，节点大小的 width 值
        height: 40,  // Number，可选，节点大小的 height 值
        // 设置节点样式
        attrs: {
          body: {
            fill: '#2Ecc71',
            stroke: '#000',
            strokeDasharray: '10.2',
          },
          label: {
            text: 'hello',
            fill: '#333',
            fontSize: 13,
          }
        }
      },
      {
        id: 'node2', // String，节点的唯一标识
        x: 160,      // Number，必选，节点位置的 x 值
        y: 180,      // Number，必选，节点位置的 y 值
        width: 80,   // Number，可选，节点大小的 width 值
        height: 40,  // Number，可选，节点大小的 height 值
        label: 'world', // String，节点标签
        attrs: {
          body: {
            fill: '#f39c12',
            stroke: '#000',
            rx: 16, // 设置border-radius样式
            ry: 16
          },
          label: {
            text: 'world',
            fill: '#333',
            fontSize: 18,
            fontWeight: 'bold',
            fontVariant: 'small-caps', // 段落设置为小型大写字母字体
          }
        }
      },
    ],
    // 边
    edges: [
      {
        source: 'node1', // String，必须，起始节点 id
        target: 'node2', // String，必须，目标节点 id
        // shape: 'shadow-edge', // 设置边的图形 【edge, double-edge, shadow-edge】, 默认edge
        attrs: {
          line: {
            stroke: 'orange'
          }
        }
      },
    ],
  };

  const graph = new Graph({
    container: document.getElementById('container'),
    width: window?.innerWidth,
    height: window.innerHeight - 78,
    background: {
      color: '#fffbe6', // 设置画布背景色
    },
    grid: {
      size: 10, // 网格大小 10px
      visible: true, // 渲染网格背景
    },
    panning: {
      enabled: true,
      // modifiers: 'shift', // 拖拽可能和其他操作冲突，此时可以设置modifiers参数，设置修饰键后并点击鼠标才能触发画布拖拽
      eventTypes: ['rightMouseDown'], // 设置触发画布拖拽的行为 此处设置为右键拖拽
    }, // 开启画布平移拖拽
  });
  graph.fromJSON(data);

  // graph.zoom(-0.5); // 设置缩放画布
  // graph.translate(80, 40); // 设置平移画布
  graph.centerContent(); // 将画布内容与视口中心对齐
})

</script>