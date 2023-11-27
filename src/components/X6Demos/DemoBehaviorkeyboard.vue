<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import { Shape, Graph } from '@antv/x6';
import { onMounted } from 'vue';
let graph;
onMounted(() => {
  graph = new Graph({
    container: document.getElementById('container'),
    width: window?.innerWidth,
    height: window.innerHeight - 78,
      grid: { visible: true },
      clipboard: {
        enabled: true,
      },
      selecting: {
        enabled: true,
        showNodeSelectionBox: true,
      },
      keyboard: {
        enabled: true,
        global: true,
      },
    })

    graph.addNode({
      x: 280,
      y: 100,
      width: 100,
      height: 40,
      label: 'Rect',
    })

    const source = graph.addNode({
      x: 32,
      y: 32,
      width: 100,
      height: 40,
      label: 'Hello',
    })

    const target = graph.addNode({
      shape: 'circle',
      x: 160,
      y: 180,
      width: 60,
      height: 60,
      label: 'World',
    })

    graph.addEdge({
      source,
      target,
    })

    graph.bindKey('ctrl+c', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.copy(cells)
      }
      return false
    })

    graph.bindKey('ctrl+v', () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 })
        graph.cleanSelection()
        graph.select(cells)
      }
      return false
    })
})

</script>