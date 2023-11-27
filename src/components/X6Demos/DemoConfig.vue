<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import { Shape, Graph } from '@antv/x6';
import { onMounted } from 'vue';

// cell类提供了一个静态方法Cell.config来配置选项的默认值

Shape.Rect.config({
  width: 60,
  height: 60,
})

// 每次调用config都是与当前预设值进行深度Merge
Shape.Rect.config({
  markup: [ // 指定了渲染节点/边时使用的SVG/HTML片段
    {
      tagName: 'text', // svg/html元素标签名
      selector: 'label', // svg/html元素的唯一标识，通过该唯一标识为该元素指定属性样式。
      attrs: { // svg/html元素的默认属性键值对，通常用于定义那些不变的通用属性，这些默认样式也可以在实例化节点时被覆盖。markup的attrs属性只支持原生的SVG属性
        fontSize: 14,
        fill: '#262626',
        textVerticalAnchor: 'bottom',
      }
    },
    {
      tagName: 'path',
      selector: 'line',
      groupSelector: 'group1', // 群组选择器，通过群组选择器可以为该群组对应的多个元素指定样式
      attrs: {
        stroke: '#5F95FF',
        strokeWidth: 2,
        d: 'M 0 40 L 60 40',
      }
    },
  ],
})

const rect = new Shape.Rect({
  id: 'node1',
  x: 40, 
  y: 40,
  label: 'rect',
  zIndex: 2,
})

rect.rotate(30); // 设置节点旋转

const circle = new Shape.Circle({
  id: 'node2',
  x: 200,
  y: 200,
  width: 60,
  height: 60,
  label: 'circle',
  zIndex: 2,
})

const edge = new Shape.Edge({
  id: 'edge1',
  source: rect,
  target: circle,
  zIndex: 1
})

onMounted(() => {
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
  
  graph.addNode(rect);
  graph.addNode(circle);
  graph.addEdge(edge);

  // graph.zoom(-0.5); // 设置缩放画布
  // graph.translate(80, 40); // 设置平移画布
  graph.centerContent(); // 将画布内容与视口中心对齐
})

</script>