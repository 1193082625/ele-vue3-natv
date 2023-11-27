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
          label: '起始点11'
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

    // 通过遍历方式写入配置。
    const {nodes, edges} = data;
    nodes.forEach((node) => {
      if(!node.style) {
        node.style = {};
      }
      switch (node.class) {
        case 'c0':
          node.type = 'circle';
          break;
        case 'c1':
          node.type = 'rect';
          node.size = [35, 20]; // 设置节点大小
        case 'c2':
          node.type = 'ellipse'; // 椭圆形
          node.size = [35, 20]; 
        default:
          node.type = 'rect';
          node.size = [60, 20]; // 设置节点大小
          break;
      }
    })

    // 遍历修改edges
    edges.forEach(edge => {
      if(!edge.style) {
        edge.style = {};
      }
      edge.style.lineWidth = edge.weight; // 边的粗细映射边数据中的weight属性数值
      edge.style.opacity = 0.6; // 边透明度
      edge.style.stroke = 'grey'; // 边描边颜色
    })

    // 创建实例
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      // 节点在默认状态下的样式配置和其他配置
      defaultNode: {
        size: 30, // 节点大小
        style: {
          fille: 'steelblue', // 节点填充色
          stroke: '#666', // 节点描边色
          lineWidth: 1, // 节点描边粗细
        },
        // 节点上的标签文本配置
        labelCfg: {
          // 节点上的标签文本样式配置
          style: {
            fill: 'red', // 节点标签文本颜色
          },
        },
      },
      // 边在默认状态下的样式配置和其他配置
      defaultEdge: {
        // 边上的标签文本配置
        labelCfg: {
          autoRotate: true, // 边上的标签文本根据边的方向旋转
        }
      }
    });
    graph.data(data);
    graph.render();
  })

</script>
