<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
  /**
   * 当数据中没有节点位置信息，或者数据中的位置信息不满足需求时，需要借助一些布局算法对图进行布局。
   * G6提供了9种一般图的布局和4种树图的布局
   * 一般图：
   *  Random Layout 随机布局
   *  Force Layout 经典力导向布局(一个布局网络中，粒子与粒子之间具有引力和斥力，从初始的随机无序的布局不断演变，逐渐趋于平衡稳定的布局方式称之为力导向布局。)   this Demo
   *  Circular Layout 环形布局
   *  Radial Layout 辐射状布局
   *  MDS Layout  高维数据降维算法布局
   *  Fruchterman Layout: 一种力导布局
   *  Dagre Layout  层次布局
   *  Concentric Layout 同心圆布局，将重要（默认以度数为度量）的节点放置在布局中心
   *  Grid Layout 格子布局，将节点有序排列在格子上
   * 树布局：
   *  Dendrogram Layout 树状布局（叶子节点布局对齐到同一层）
   *  CompactBox Layout: 紧凑树布局
   *  Mindmap Layout: 脑图布局
   *  Idented Layout: 缩进布局
   */
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
    
    /**
     * 若数据中节点有位置信息（x, y），则按照数据的位置信息进行绘制
     * 若数据中节点没有位置信息，则默认使用Random Layout进行布局
     */

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
      }
    });
    graph.data(remoteData);
    graph.render();
  })

</script>
