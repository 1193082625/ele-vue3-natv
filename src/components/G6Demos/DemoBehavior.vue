<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
  import G6 from '@antv/g6';
  import { onMounted } from 'vue';

  // Force Layout
  onMounted(async () => {
    const res = await fetch('https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json');
    const remoteData = await res.json();


    const nodes = remoteData.nodes;
    const edges = remoteData.edges;
    nodes.forEach((node) => {
      if (!node.style) {
        node.style = {};
      }
      node.style.lineWidth = 1; // 设置节点的边框
      node.style.stroke = '#666'; // 设置节点边框颜色
      node.style.fill = 'steelblue'; // 设置节点背景色
      switch (node.class) { // 设置节点类型
        case 'c0': {
          node.type = 'circle'; // 圆
          break;
        }
        case 'c1': {
          node.type = 'rect'; // 矩形
          node.size = [35, 20];
          break;
        }
        case 'c2': {
          node.type = 'ellipse'; // 椭圆
          node.size = [35, 20];
          break;
        }
      }
    });
    edges.forEach((edge) => {
      if (!edge.style) {
        edge.style = {};
      }
      edge.style.lineWidth = edge.weight;
      edge.style.opacity = 0.6;
      edge.style.stroke = 'grey';
    });
    
    // 创建实例
    const graph = new G6.Graph({
      container: 'container',
      width: 800,
      height: 600,
      defaultNode: {
        size: 30,
        labelCfg: {
          style: {
            fill: '#fff',
          },
        },
      },
      defaultEdge: {
        labelCfg: {
          cutoRotate: true,
        },
      },
      // 设置布局配置
      layout: {
        type: 'force', // 指定为力导向布局
        preventOverlap: true, // 放置节点重叠
        linkDistance: 100, // 指定边距离为100
      },
      // 本组件着重部分
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
      },
      nodeStateStyles: {
        // 鼠标hover上节点，即hover状态为true时的样式
        hover: {
          fill: 'lightsteelblue'
        },
        // 鼠标点击节点，即click状态为true时的样式
        click: {
          stroke: '#000',
          lineWidth: 3,
        },
      },
      // 边不同状态下的样式集合
      edgeStateStyles: {
        // 鼠标点击边，即click状态为true时的样式
        click: {
          stroke: 'steelblue'
        }
      }
    });
    graph.data(remoteData);
    graph.render();

    // 监听事件并切换元素状态

    // 鼠标进入节点
    graph.on('node:mouseenter', (e) => {
      const nodeItem = e.item; // 获取鼠标进入的节点元素对象
      graph.setItemState(nodeItem, 'hover', true); // 设置当前节点的hover状态为true
    });
    // 鼠标离开节点
    graph.on('node:mouseleave', e => {
      const nodeItem = e.item;
      graph.setItemState(nodeItem, 'hover', false); // 设置当前节点的hover状态为false
    });
    // 点击节点
    graph.on('node:click', e => {
      // 先将所有当前是click状态的节点置为非click状态
      const clickNodes = graph.findAllByState('node', 'click');
      clickNodes.forEach(cn => {
        graph.setItemState(cn, 'click', false);
      });
      const nodeItem = e.item;
      graph.setItemState(nodeItem, 'click', true);
    });
    // 点击边
    graph.on('edge:click', e => {
      const clickEdges = graph.findAllByState('edge', 'click');
      clickEdges.forEach(ce => {
        graph.setItemState(ce, 'click', false);
      })
      const edgeItem = e.item;
      graph.setItemState(edgeItem, 'click', true);
    })
  })

</script>
