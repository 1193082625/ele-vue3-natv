<script setup lang="ts">
  import {onMounted} from 'vue';
  import G6 from '@antv/g6';

  onMounted(() =>{
    const data = {
        nodes: [{
          id: '0',
          label: 'node-0',
          x: 100,
          y: 100
        }, {
          id: '1',
          label: 'node-1',
          x: 250,
          y: 100
        }, {
          id: '2',
          label: 'node-2',
          x: 150,
          y: 350
        }, {
          id: '3',
          label: 'node-3',
          x: 420,
          y: 380
        }],
        edges: [{
          id: 'e1',
          source: '0',
          target: '1'
        }, {
          id: 'e2',
          source: '0',
          target: '3'
        }, {
          id: 'e3',
          source: '3',
          target: '2'
        }]
    };
    
    const graph = new G6.Graph({
      container: 'g6Box',
      // width: window.innerWidth,
      // height: window.innerHeight,
      width: 800,
      height: 400,
      defaultNode: {
        size: [80, 40],
        shape: 'rect'
      },
      modes: {
        default: ['zoom-canvas', 'drag-canvas', 'drag-node']
      }
    });
    graph.read(data);
    graph.render();
    graph.fitView();
  });
</script>

<template>
  <div id="g6Box"></div>
</template>