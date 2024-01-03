import { Graph } from '@antv/x6';
import { register } from '@antv/x6-vue-shape';
import { Selection } from '@antv/x6-plugin-selection';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { addChildNode, removeNodes } from './utils';
import MindNode from '../../components/MindNode.vue';
import MindOutLine from '../../components/MindOutLine.vue';

export const NODE_HEIGHT = 40;
register({
  shape: 'node-shape',
  width: 120,
  height: NODE_HEIGHT,
  component: MindNode,
});
register({
  shape: 'outline-shape',
  width: 200,
  height: NODE_HEIGHT,
  component: MindOutLine,
});
export default class MindGraph{
  graph: any;
  graphDom: HTMLElement;
  options;
  constructor(graphDom: HTMLElement, options: any) {
    this.graphDom = graphDom;
    this.options = options;
    this.initGraph();
    this.setWatch();
    return this.graph;
  }

  initGraph() {
    this.graph = new Graph({
      container: this.graphDom!,
      width: window?.innerWidth,
      height: window.innerHeight - 78,
      autoResize: true,
      panning: {
        enabled: true,
        modifiers: [],
        eventTypes: ['rightMouseDown'],
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        connector: 'rounded',
        connectionPoint: 'boundary',
        router: {
          name: 'er',
          args: {
            min: 10,
            direction: 'H',
            offset: 40,
          },
        },
      }
    });

    this.graph.use(
      new Clipboard({
        enabled: true,
      }),
    )
    this.graph.use(
      new Keyboard({
        enabled: true,
      }),
    )
    this.graph.use(
      new Selection({
        enabled: true,
        rubberband: true, // 启用框选节点功能
        multiple: true, // 启用点击多选，启用后按住 ctrl 或 command 键点击节点实现多选
        movable: true, // 拖动选框时框选的节点是否一起移动
        showNodeSelectionBox: true, // 是否显示节点的选择框
        pointerEvents: 'none', // 如果打开 showNodeSelectionBox 时，会在节点上方盖一层元素，导致节点的事件无法响应，此时可以配置 pointerEvents: none 来解决，默认值是 auto
      }),
    )
  }

  setWatch() {
    this.graph.on('node:changed', ({node, options}: any) => {
      if(options?.propertyPath === 'attrs/text/text') {
        const {width} = node.getSize();
        const conterLines = options.propertyValue.split('\n');
        node.setSize(width, conterLines.length * NODE_HEIGHT);
      }
    })
    // 监听快捷键添加节点
    this.graph.bindKey('tab', (e: any) => {
      e.preventDefault()
      const selectedNodes = this.graph.getSelectedCells().filter((item: any) => item.isNode())
      if (selectedNodes.length) {
        const node = selectedNodes[0]
        addChildNode(this.graph, node);
      }
    });
    // 监听回车，添加兄弟节点
    this.graph.bindKey('enter', (e: any) => {
      e.preventDefault()
      const [selectedNode] = this.graph.getSelectedCells().filter((item: any) => item.isNode())
      if (selectedNode) {
        const node = !selectedNode.parent ? selectedNode : selectedNode.parent;
        addChildNode(this.graph, node);
      }
    })
    // 监听复制
    this.graph.bindKey('ctrl+c', () => {
      const cells = this.graph.getSelectedCells()
      if (cells.length) {
        this.graph.copy(cells)
      }
      return false
    })

    // 监听黏贴
    this.graph.bindKey('ctrl+v', () => {
      if (!this.graph.isClipboardEmpty()) {
        const cells = this.graph.paste({ offset: 32 })
        this.graph.cleanSelection()
        this.graph.select(cells)
        // todo 关联当前黏贴节点与父节点
      }
      return false
    })

    // 监听快捷键删除节点
    this.graph.bindKey(['backspace', 'delete'], () => {
      removeNodes(this.graph);
    })
  }
}