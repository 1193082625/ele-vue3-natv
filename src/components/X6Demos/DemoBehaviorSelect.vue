<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import { Shape, Graph } from '@antv/x6';
import insertCss from 'insert-css'
import { onMounted } from 'vue';
let graph;
onMounted(() => {
  graph = new Graph({
    container: document.getElementById('container'),
    width: window?.innerWidth,
    height: window.innerHeight - 78,
    grid: { visible: true },
    selecting: {
      enabled: true,
      multiple: true,
      rubberband: true,
      movable: true,
      showNodeSelectionBox: true,
      className: 'active-select',
    },
  });
    
  graph.addNode({
    x: 320,
    y: 100,
    width: 100,
    height: 40,
    label: 'Rect',
  })

  const source = graph.addNode({
    x: 80,
    y: 50,
    width: 100,
    height: 40,
    label: 'Hello',
  })

  const target = graph.addNode({
    shape: 'circle',
    x: 240,
    y: 200,
    width: 60,
    height: 60,
    label: 'World',
  })

  graph.addEdge({
    source,
    target,
  })


  graph.on('node:selected', (args: { 
    cell: any
    node: any 
    options: any 
  }) => { 
    // code here
    console.log('节点被选中', args);
    
  })
})

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
  .active-select{
    color: #f00;
  }
`)
</script>