<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import { Shape, Graph } from '@antv/x6';
import { onMounted } from 'vue';

// 在X6的Shape命名空间中内置了一些基础图形，如Rect、Edge、Circle等，这些图形最终都有共同的基类Cell，定义了节点和边共同属性和方法，如属性样式、可见性、业务数据等

// 可以使用这些图形的构造函数来创建节点/边，然后调用graph.addNode或graph.addEdge方法将其添加到画布

const rect = new Shape.Rect({
  id: 'node1',
  x: 40, 
  y: 40,
  width: 100,
  height: 40,
  label: 'rect',
  zIndex: 2,
  attrs: {
    body: {
      rx: 6,
      ry: 6,
      stroke: '#5F95FF',
      fill: '#EFF4FF',
      strokeWidth: 1,
    },
    label: {
      fontSize: 14,
      fill: '#262626',
    },
  },
})

const circle = new Shape.Circle({
  id: 'node2',
  x: 200,
  y: 200,
  width: 60,
  height: 60,
  label: 'circle',
  zIndex: 2,
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