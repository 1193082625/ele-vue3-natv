<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import { Shape, Graph } from '@antv/x6';
import { onMounted } from 'vue';

// cell类提供了一个静态方法Cell.config来配置选项的默认值
// Shape.Rect.config({
//   width: 60,
//   height: 60,
// })

// 每次调用config都是与当前预设值进行深度Merge
// Shape.Rect.config({
//   markup: [ // 指定了渲染节点/边时使用的SVG/HTML片段
//     {
//       tagName: 'text', // svg/html元素标签名
//       selector: 'label', // svg/html元素的唯一标识，通过该唯一标识为该元素指定属性样式。
//       attrs: { // svg/html元素的默认属性键值对，通常用于定义那些不变的通用属性，这些默认样式也可以在实例化节点时被覆盖。markup的attrs属性只支持原生的SVG属性
//         fontSize: 14,
//         fill: '#262626',
//         textVerticalAnchor: 'bottom',
//       }
//     },
//     {
//       tagName: 'path',
//       selector: 'line',
//       groupSelector: 'group1', // 群组选择器，通过群组选择器可以为该群组对应的多个元素指定样式
//       attrs: {
//         stroke: '#5F95FF',
//         strokeWidth: 2,
//         d: 'M 0 40 L 60 40',
//       }
//     },
//   ],
// })

// 子节点，子节点的位置时相对画布左上角的位置
const rect = new Shape.Rect({
  id: 'node1',
  x: 40, 
  y: 40,
  label: 'rect',
  zIndex: 2,
})

rect.rotate(30); // 设置节点旋转

onMounted(() => {
  const graph = new Graph({
    container: document.getElementById('container'),
    width: window?.innerWidth,
    height: window.innerHeight - 78,
    grid: true,
    embedding: {
      enabled: true,
      findParent({ node }) {
        const bbox = node.getBBox()
        return this.getNodes().filter((node) => {
          const data = node.getData<any>()
          if (data && data.parent) {
            const targetBBox = node.getBBox()
            return bbox.isIntersectWithRect(targetBBox)
          }
          return false
        })
      },
    },
  });
    
  graph.addNode({
      x: 40,
      y: 140,
      width: 120,
      height: 60,
      label: 'Child\n(unembed)',
      zIndex: 10,
      attrs: {
        body: {
          stroke: 'none',
          fill: '#3199FF',
        },
        label: {
          fill: '#fff',
        },
      },
    })

    graph.addNode({
      x: 500,
      y: 100,
      width: 120,
      height: 60,
      label: 'Child\n(unembed)',
      zIndex: 10,
      attrs: {
        body: {
          stroke: 'none',
          fill: '#47C769',
        },
        label: {
          fill: '#fff',
        },
      },
    })

    graph.addNode({
      x: 200,
      y: 80,
      width: 240,
      height: 160,
      zIndex: 1,
      label: 'Parent',
      attrs: {
        body: {
          fill: '#fffbe6',
        },
      },
      data: {
        parent: true,
      },
    })

    graph.on('node:change:parent', ({ node }) => {
      node.attr({
        label: {
          text: 'Child\n(embed)',
        },
      })
    })
})

</script>