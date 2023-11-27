<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron';
import { Graph, Cell, Node } from '@antv/x6'
import { GridLayout } from '@antv/layout'
import Hierarchy from '@antv/hierarchy'
import insertCss from 'insert-css'
import { computed, onMounted } from 'vue';

import {registerParentNodeAttr, registerChildNodeAttr, connectorAttr, edgeAttr, MindMapData, HierarchyResult, findItem, graphData} from '@/utils/graph';
import $bus from '@/bus';
import {useStore} from 'vuex';
const store = useStore();

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
      render();
    }
  })

  $bus.on('activeBtnHandler', (activeType: string) => {
    console.log('触发了事件', activeType);
    switch(activeType) {
      case 'delete':
  // const selectedNodes = graph.getSelectedCells().filter((item: { isNode: () => any; }) => item.isNode())
  const selectedNodes = graph.getNodes();
  if (selectedNodes.length) {
    const { id } = selectedNodes.at(-1);
    if (removeNode(id)) {
      render()
    }
  }
      break;
    }
  })

})


const addChildNode = (id: string, type: any) => {
  const res = findItem(graphData, id)
  const dataItem = res?.node
  if (dataItem) {
    let item: MindMapData | null = null
    const length = dataItem.children ? dataItem.children.length : 0
    if (type === 'topic') {
      item = {
        id: `${id}-${length + 1}`,
        type: 'topic-branch',
        label: `分支主题${length + 1}`,
        width: 100,
        height: 40,
      }
    } else if (type === 'topic-branch') {
      item = {
        id: `${id}-${length + 1}`,
        type: 'topic-child',
        label: `子主题${length + 1}`,
        width: 60,
        height: 30,
      }
    }
    if (item) {
      if (dataItem.children) {
        dataItem.children.push(item)
      } else {
        dataItem.children = [item]
      }
      return item
    }
  }
  return null
}

const removeNode = (id: string) => {
  const res = findItem(graphData, id)
  const dataItem = res?.parent
  if (dataItem && dataItem.children) {
    const { children } = dataItem
    const index = children.findIndex((item: any) => item.id === id)
    return children.splice(index, 1)
  }
  return null
}

const render = () => {
  const result: HierarchyResult = Hierarchy.mindmap(graphData, {
    direction: 'H',
    getHeight(d: MindMapData) {
      return d.height
    },
    getWidth(d: MindMapData) {
      return d.width
    },
    getHGap() {
      return 40
    },
    getVGap() {
      return 20
    },
    getSide: () => {
      return 'right'
    },
  })
  const cells: Cell[] = []
  const traverse = (hierarchyItem: HierarchyResult) => {
    if (hierarchyItem) {
      const { data, children } = hierarchyItem
      cells.push(
        graph.createNode({
          id: data.id,
          shape: data.type === 'topic-child' ? 'topic-child' : 'topic',
          x: hierarchyItem.x,
          y: hierarchyItem.y,
          width: data.width,
          height: data.height,
          label: data.label,
          type: data.type,
        }),
      )
      if (children) {
        children.forEach((item: HierarchyResult) => {
          const { id, data } = item
          cells.push(
            graph.createEdge({
              shape: 'mindmap-edge',
              source: {
                cell: hierarchyItem.id,
                anchor:
                  data.type === 'topic-child'
                    ? {
                        name: 'right',
                        args: {
                          dx: -16,
                        },
                      }
                    : {
                        name: 'center',
                        args: {
                          dx: '25%',
                        },
                      },
              },
              target: {
                cell: id,
                anchor: {
                  name: 'left',
                },
              },
            }),
          )
          traverse(item)
        })
      }
    }
  }
  traverse(result)
  graph.resetCells(cells)
  graph.centerContent()
}

function initGraph() {

// 中心主题或分支主题
Graph.registerNode(
  'topic',
  registerParentNodeAttr,
  true,
)

// 子主题
Graph.registerNode(
  'topic-child',
  registerChildNodeAttr,
  true,
)

// 连接器
Graph.registerConnector(
  'mindmap',
  connectorAttr,
  true,
)

// 边
Graph.registerEdge(
  'mindmap-edge',
  edgeAttr,
  true,
)

graph = new Graph({
  container: document.getElementById('container')!,
  width: window?.innerWidth,
  height: window.innerHeight - 78,
  connecting: {
    connectionPoint: 'anchor',
  },
  history: true,
  selecting: true,
  keyboard: true,
});
// 开启键盘
// if(!graph.isKeyboardEnabled()) {
//   graph.enableKeyboard && graph.enableKeyboard();
// }
// // 开启交互
// if(!graph.isSelectionEnabled()) {
//   graph.enableSelection && graph.enableSelection();
// }



graph.on('add:topic', ({ node }: { node: Node }) => {
  const { id } = node
  const type = node.prop('type')
  if (addChildNode(id, type)) {
    render()
  }
})

ipcRenderer.on('removeNode', (_, data) => {
  console.log(data.name);
  // const selectedNodes = graph.getSelectedCells().filter((item: { isNode: () => any; }) => item.isNode())
  const selectedNodes = graph.getNodes();
  if (selectedNodes.length) {
    const { id } = selectedNodes.at(-1);
    if (removeNode(id)) {
      render()
    }
  }
})

ipcRenderer.on('addNode', (_, data) => {
  console.log(data.name);
  // const selectedNodes = graph.getSelectedCells().filter((item: { isNode: () => any; }) => item.isNode())
  const selectedNodes = graph.getNodes();
  if (selectedNodes.length) {
    const node = selectedNodes[0]
    const type = node.prop('type')
    if (addChildNode(node.id, type)) {
      render()
    }
  }
})


render()


insertCss(`
  .topic-image {
    visibility: hidden;
    cursor: pointer;
  }
  .x6-node:hover .topic-image {
    visibility: visible;
  }
  .x6-node-selected rect {
    stroke-width: 2px;
  }
`)
}
</script>

<style scoped>
</style>