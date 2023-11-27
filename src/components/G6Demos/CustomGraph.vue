<template>
  <div id="container" ref="divEle"></div>
</template>

<script setup lang="ts">
import G6 from '@antv/g6';
import { onMounted } from 'vue';

const minWidth = 60;

const BaseConfig = {
  nameFontSize: 12,
  childCountWidth: 22,
  countMarginLeft: 0,
  itemPadding: 16,
  nameMarginLeft: 4,
  rootPadding: 18,
};

G6.registerNode('treeNode', {
  draw: (cfg, group) => {
    const { label, collapsed, selected, children, depth } = cfg;
    const rootNode = depth === 0;
    const hasChildren = children && (children as any).length !== 0;

    const {
      childCountWidth,
      countMarginLeft,
      itemPadding,
      nameMarginLeft,
      rootPadding,
    } = BaseConfig;

    let width = 0;
    const height = 28;
    const x = 0;
    const y = -height / 2;

    // 名称文本
    const text = group.addShape('text', {
      attrs: {
        text: label,
        x: x * 2,
        y,
        textAlign: 'left',
        textBaseline: 'top',
        fontFamily: 'PingFangSC-Regular',
      },
      cursor: 'pointer',
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: 'name-text-shape',
    });
    const textWidth = text.getBBox().width;
    width = textWidth + itemPadding + nameMarginLeft;

    width = width < minWidth ? minWidth : width;

    if (!rootNode && hasChildren) {
      width += countMarginLeft;
      width += childCountWidth;
    }

    const keyShapeAttrs = {
      x,
      y,
      width,
      height,
      radius: 4,
    };

    // keyShape根节点选中样式
    if (rootNode && selected) {
      (keyShapeAttrs as any).fill = '#e8f7ff';
      (keyShapeAttrs as any).stroke = '#e8f7ff';
    }
    const keyShape = group.addShape('rect', {
      attrs: keyShapeAttrs,
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: 'root-key-shape-rect-shape',
    });

    if (!rootNode) {
      // 底部横线
      group.addShape('path', {
        attrs: {
          path: [
            ['M', x - 1, 0],
            ['L', width, 0],
          ],
          stroke: '#AAB7C4',
          lineWidth: 1,
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'node-path-shape',
      });
    }

    const mainX = x - 10;
    const mainY = -height + 15;

    if (rootNode) {
      group.addShape('rect', {
        attrs: {
          x: mainX,
          y: mainY,
          width: width + 12,
          height,
          radius: 14,
          fill: '#e8f7ff',
          cursor: 'pointer',
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'main-shape',
      });
    }

    let nameColor = 'rgba(0, 0, 0, .65)';
    if (selected) {
      nameColor = '#40A8FF';
    }

    // 名称
    if (rootNode) {
      group.addShape('text', {
        attrs: {
          text: label,
          x: mainX + rootPadding,
          y: 1,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: nameColor,
          fontSize: 12,
          fontFamily: 'PingFangSC-Regular',
          cursor: 'pointer',
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'root-text-shape',
      });
    } else {
      group.addShape('text', {
        attrs: {
          text: label,
          x: selected ? mainX + 6 + nameMarginLeft : mainX + 6,
          y: y - 5,
          textAlign: 'start',
          textBaseline: 'top',
          fill: nameColor,
          fontSize: 12,
          fontFamily: 'PingFangSC-Regular',
          cursor: 'pointer',
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'not-root-text-shape',
      });
    }

    // 子类数量
    if (hasChildren && !rootNode) {
      const childCountHeight = 12;
      const childCountX = width - childCountWidth;
      const childCountY = -childCountHeight / 2;

      group.addShape('rect', {
        attrs: {
          width: childCountWidth,
          height: 12,
          stroke: collapsed ? '#1890ff' : '#5CDBD3',
          fill: collapsed ? '#fff' : '#E6FFFB',
          x: childCountX,
          y: childCountY,
          radius: 6,
          cursor: 'pointer',
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'child-count-rect-shape',
      });
      group.addShape('text', {
        attrs: {
          text: `${(children as any)?.length}`,
          fill: 'rgba(0, 0, 0, .65)',
          x: childCountX + childCountWidth / 2,
          y: childCountY + 12,
          fontSize: 10,
          width: childCountWidth,
          textAlign: 'center',
          cursor: 'pointer',
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'child-count-text-shape',
      });
    }

    return keyShape;
  },
});

G6.registerEdge('smooth', {
  draw(cfg, group) {
    const { startPoint, endPoint } = cfg;
    const hgap = Math.abs(endPoint!.x - startPoint!.x);

    const path = [
      ['M', startPoint!.x, startPoint!.y],
      [
        'C',
        startPoint!.x + hgap / 4,
        startPoint!.y,
        endPoint!.x - hgap / 2,
        endPoint!.y,
        endPoint!.x,
        endPoint!.y,
      ],
    ];

    const shape = group.addShape('path', {
      attrs: {
        stroke: '#AAB7C4',
        path,
      },
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: 'smooth-path-shape',
    });
    return shape;
  },
});

const data = {
  id: '200000004',
  tooltip: 'Thing',
  label: '事物',
  description: null,
  descriptionZh: null,
  depth: 3,
  subTypeCount: 9,
  status: 0,
  children: [
  ],
};

onMounted(() => {
  const container = document.getElementById('container');
  const width = container!.scrollWidth;
  const height = container!.scrollHeight || 500;
  const graph = new G6.TreeGraph({
    container: 'container',
    width,
    height,
    modes: {
      default: [
        {
          type: 'collapse-expand',
        },
        'drag-canvas',
        'zoom-canvas',
        'drag-node',
      ],
    },
    defaultNode: {
      type: 'treeNode',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    nodeStateStyles: {
      // 鼠标点击节点，即click状态为true时的样式
      click: {
        stroke: '#000',
        lineWidth: 3,
      },
    },
    defaultEdge: {
      type: 'smooth',
    },
    layout: {
      type: 'compactBox',
      direction: 'LR',
      getId: function getId(d: any) {
        return d.id;
      },
      getHeight: function getHeight() {
        return 16;
      },
      getWidth: function getWidth(d: any) {
        const labelWidth = G6.Util.getTextSize(d.label, BaseConfig.nameFontSize)[0];
        const width =
          BaseConfig.itemPadding +
          BaseConfig.nameMarginLeft +
          labelWidth +
          BaseConfig.rootPadding +
          BaseConfig.childCountWidth;
        return width;
      },
      getVGap: function getVGap() {
        return 15;
      },
      getHGap: function getHGap() {
        return 30;
      },
    },
  });

  graph.data(data);
  graph.render();
  graph.fitView();

  // 点击节点
  graph.on('node:click', e => {
    // 先将所有当前是click状态的节点置为非click状态
    const clickNodes = graph.findAllByState('node', 'click');
    clickNodes.forEach(cn => {
      graph.setItemState(cn, 'click', false);
    });
    const nodeItem = e.item;
    console.log(9999);
    
    graph.setItemState(nodeItem as any, 'click', true);
  });

  if (typeof window !== 'undefined') {
    window.onresize = () => {
      if (!graph || graph.get('destroyed')) return;
      if (!container || !container.scrollWidth || !container.scrollHeight) return;
      graph.changeSize(container.scrollWidth, container.scrollHeight);
    };
  }
})
</script>

<style scoped>
</style>