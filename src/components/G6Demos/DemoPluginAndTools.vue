<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
  /**
   * Minimap
   * Image Minimap
   * Grid
   * tooltip
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
    
    // 配置一个缩略图
    // const minimap = new G6.Minimap({
    //   size: [100, 100],
    //   className: 'minimap',
    //   type: 'delegate',
    // })

    // 由于 Minimap 的原理是将主画布内容复制到 minimap 的画布上，在大数据量下可能会造成双倍的绘制效率成本。为缓解该问题，Image Minimap 采用另一种机制，根据提供的图片地址或 base64 字符串 graphImg 绘制 <img /> 代替 minimap 上的 canvas
    // 实例化 Image Minimap 插件时，graphImg 是必要参数。建议在主画布更新时使用 updateGraphImg(img) 同步更新 minimap 图片，其中参数 img 是图片地址或 base64 文本
    // const imageMinimap = new G6.ImageMinimap({
    //   width: 200,
    //   graphImg: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ'
    // });

    // 实例化grid插件
    const grid = new G6.Grid();



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
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'drag-node',
          {
            type: 'tooltip', // 提示框插件
            formatText(model) {
              // 提示框文本内容
              const text = `label: ${model.label}<br/> class:${model.class}`;
              return text;
            }
          },
          {
            type: 'edge-tooltip', // 边提示框
            formatText(model) {
              // 边提示框文本内容
              const text =
                'source: ' +
                model.source +
                '<br/> target: ' +
                model.target +
                '<br/> weight: ' +
                model.weight;
              return text;
            },
          },
        ], // 允许拖拽画布、放缩画布、拖拽节点
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
      },
      // plugins: [minimap], // 将minimap实例配置到图上
      plugins: [grid], // 将minimap实例配置到图上
      animate: true
    });
    graph.data(remoteData);
    graph.render();

    // 添加imageMinimap后，一些主画布更新操作
    // imageMinimap.updateGraphImg(img); // 使用新的图片（用户自己生成）替换minimap图片

    // 监听事件并切换元素状态

    // 鼠标进入节点
    graph.on('node:mouseenter', (e) => {
      const nodeItem = e.item; // 获取鼠标进入的节点元素对象
      graph.setItemState(nodeItem as any, 'hover', true); // 设置当前节点的hover状态为true
    });
    // 鼠标离开节点
    graph.on('node:mouseleave', e => {
      const nodeItem = e.item;
      graph.setItemState(nodeItem as any, 'hover', false); // 设置当前节点的hover状态为false
    });
    // 点击节点
    graph.on('node:click', e => {
      // 先将所有当前是click状态的节点置为非click状态
      const clickNodes = graph.findAllByState('node', 'click');
      clickNodes.forEach(cn => {
        graph.setItemState(cn, 'click', false);
      });
      const nodeItem = e.item;
      graph.setItemState(nodeItem as any, 'click', true);
    });
    // 点击边
    graph.on('edge:click', e => {
      const clickEdges = graph.findAllByState('edge', 'click');
      clickEdges.forEach(ce => {
        graph.setItemState(ce, 'click', false);
      })
      const edgeItem = e.item;
      graph.setItemState(edgeItem as any, 'click', true);
    })
  })

</script>
<style>
  /* 提示框的样式 */
  .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
</style>
