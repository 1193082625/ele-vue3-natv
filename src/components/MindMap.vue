<template>
  <div ref="graphDom"></div>
  <TeleportContainer></TeleportContainer>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron';
import { Graph } from '@antv/x6'
import { register, getTeleport } from '@antv/x6-vue-shape'
import { GridLayout } from '@antv/layout'
import { computed, onMounted, ref } from 'vue';
import { Selection } from '@antv/x6-plugin-selection';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import MindNode, { NODE_HEIGHT } from './MindNode.vue';
import $bus from '@/bus';
import {useStore} from 'vuex';
const store = useStore();
const TeleportContainer = getTeleport();
const NODE_HEIGHT = 40;
register({
  shape: 'node-shape',
  width: 120,
  height: NODE_HEIGHT,
  component: MindNode,
});

const graphDom = ref(null);
const isGraph = computed(() => store.state.graph.isGraph);
let graph: any;

onMounted(() => {
  initGraph();

  $bus.on('changeLayout', () => {
    console.log('修改布局', isGraph);
    if(!isGraph.value) {
    const model = {
      nodes: [
        {
          id: 'node1',
        }, {
          id: 'node2',
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2',
        },
      ],
    }
    const gridLayout = new GridLayout({
      type: 'grid',
      width: 600,
      height: 400,
      rows: 4,
      cols: 4,
    })
    const newModel = gridLayout.layout(model);
    graph.fromJSON(newModel);
    } else {

    }
  })

  $bus.on('activeBtnHandler', (activeType: string) => {
    console.log('触发了事件', activeType);
    switch(activeType) {
      case 'delete':
        removeNodes();
        break;
    }
  })

})

function initGraph() {
  graph = new Graph({
    container: graphDom.value!,
    width: window?.innerWidth,
    height: window.innerHeight - 78,
    autoResize: true,
    panning: {
      enabled: true,
      modifiers: [],
      eventTypes: ['rightMouseDown'],
    }
  });
  graph.use(
    new Keyboard({
      enabled: true,
    }),
  )
  graph.use(
    new Selection({
      enabled: true,
      rubberband: true, // 启用框选节点功能
      multiple: true, // 启用点击多选，启用后按住 ctrl 或 command 键点击节点实现多选
      movable: true, // 拖动选框时框选的节点是否一起移动
      showNodeSelectionBox: true, // 是否显示节点的选择框
      pointerEvents: 'none', // 如果打开 showNodeSelectionBox 时，会在节点上方盖一层元素，导致节点的事件无法响应，此时可以配置 pointerEvents: none 来解决，默认值是 auto
    }),
  )
  graph.addNode({
    shape: 'node-shape',
    x: 10,
    y: 200,
    attrs: {
      label: {
        text: '自定义节点',
      }
    },
    tools: ['node-editor'],
  })


  // 监听快捷键添加节点
  graph.bindKey('tab', (e: any) => {
    e.preventDefault()
    const selectedNodes = graph.getSelectedCells().filter((item: any) => item.isNode())
    if (selectedNodes.length) {
      const node = selectedNodes[0]
      addChildNode(node);
    }
  })

  // 监听快捷键删除节点
  graph.bindKey(['backspace', 'delete'], () => {
    removeNodes();
  })
}

function removeNodes() {
  const selectedNodes = graph.getSelectedCells().filter((item: any) => item.isNode());
  if (selectedNodes.length) {
    selectedNodes.forEach((node: any) => node.remove());
  }
}

// 添加子节点
function addChildNode(node: any) {
  console.log('添加新节点', node, node.children);
  const {x: parentX, y: parentY} = node.getPosition();
  const targetNode = graph.addNode({
    shape: 'node-shape',
    x: parentX + 122 + 50, 
    y: parentY,
    attrs: {
      label: {
        text: '子节点1',
      }
    },
    tools: ['node-editor'],
  });
  targetNode.setParent(node);
  // todo 设置子节点位置
  // setChildNodePosition(node);
  graph.addEdge({
    source: node, // 源节点 ID
    target: targetNode, // 目标节点 ID
    attrs: {
      line: {
        targetMarker: null
      }
    }
  });
}

function setChildNodePosition(node: any) {
  // const childs = node.children;
  // const {width, height} = node.getSize();
  // const {x: parentX, y: parentY} = node.getPosition();
  // if(childs?.length) {
  //   const len = childs.length;
  //   const startY = parentY - (NODE_HEIGHT + 20) * (len - 1) / 2;
  //   childs.forEach((child: any, idx: number) => {
  //     const {x, y} = child.getPosition();
  //     const newY = startY + 
  //     child.position(x, );
  //   })
  //     x: parentPosition.x + parentSize.width / 2,  // 子节点水平居中
  //     y: parentPosition.y + parentSize.height + (i + 0.5 - childCount / 2) * childHeight,  // 子节点垂直居中
  // }
}
</script>

<style scoped>
</style>