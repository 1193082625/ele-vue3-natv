<template>
  <div ref="graphDom"></div>
  <TeleportContainer></TeleportContainer>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron';
import { getTeleport } from '@antv/x6-vue-shape'
import { GridLayout } from '@antv/layout'
import { computed, onMounted, ref } from 'vue';
import $bus from '@/bus';
import {useStore} from 'vuex';
import MindGraph from '../utils/graph/graph';
import { addBoxOutline, addChildNode } from '../utils/graph';
const store = useStore();
const TeleportContainer = getTeleport();

const graphDom = ref(null);
const isGraph = computed(() => store.state.graph.isGraph);
let graph: any;

onMounted(() => {
  initGraph();
  addBusOn();
})

function initGraph() {
  graph = new MindGraph(graphDom.value!, {});
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

}

function addBusOn() {
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
      case 'addNode': {
        const [selectedNode] = graph.getSelectedCells().filter((item: any) => item.isNode())
        const node = !selectedNode.parent ? selectedNode : selectedNode.parent;
        addChildNode(graph, node);
        break;
      }
      case 'addChild': {
        const [selectedNode] = graph.getSelectedCells().filter((item: any) => item.isNode())
        addChildNode(graph, selectedNode);
        break;
      }
      case 'outline':
        addBoxOutline(graph);
        break;
      case 'summary':
        console.log('添加概要');
        break;
      case 'connection':
        console.log('添加链接');
        break;
    }
  })
}
</script>

<style scoped>
</style>