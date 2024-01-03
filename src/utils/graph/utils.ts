import { NODE_HEIGHT } from "./graph";

export function addBoxOutline(graph: any) {
  const selectedNodes = graph.getSelectedCells().filter((item: any) => item.isNode());
  if(!selectedNodes.length) return;
  const startPos = selectedNodes.at(0).position();
  const endPos = selectedNodes.at(-1).position();
  const widthStartNode = selectedNodes.reduce((min: any, node: any) => {
    const nodePos = node.position();
    const minPos = min.position();
    return nodePos.x < minPos.x ? node : min
  }, selectedNodes[0]);
  const widthEndNode = selectedNodes.reduce((max: any, node: any) => {
    const nodePos = node.position();
    const maxPos = max.position();
    const nodeSize = node.size();
    const maxSize = max.size();
    return (nodePos.x + nodeSize.width) > (maxPos.x + maxSize.width) ? node : max;
  }, selectedNodes[0]);
  const heightStartNode = selectedNodes.reduce((min: any, node: any) => {
    const nodePos = node.position();
    const minPos = min.position();
    return nodePos.y < minPos.y ? node : min
  }, selectedNodes[0]);
  const heightEndNode = selectedNodes.reduce((max: any, node: any) => {
    const nodePos = node.position();
    const maxPos = max.position();
    const nodeSize = node.size();
    const maxSize = max.size();
    return (nodePos.y + nodeSize.height) > (maxPos.y + maxSize.height) ? node : max;
  }, selectedNodes[0])
  const outlineNode = graph.addNode({
    shape: 'outline-shape',
    x: startPos.x - 10, 
    y: startPos.y - 10,
  });
  const width = widthEndNode.position().x + widthEndNode.size().width - widthStartNode.position().x + 20;
  const height = heightEndNode.position().y + heightEndNode.size().height - heightStartNode.position().y + 20;
  // 重置大小，不触发事件和重绘
  outlineNode.resize(width, height, {silent: true});
  outlineNode.setData({width, height});
  outlineNode.toBack();
}

export function removeNodes(graph: any) {
  const selectedNodes = graph.getSelectedCells().filter((item: any) => item.isNode());
  if (selectedNodes.length) {
    selectedNodes.forEach((node: any) => node.remove());
  }
}

// 添加子节点
export function addChildNode(graph: any, node: any) {
  const {x: parentX, y: parentY} = node.getPosition();
  const targetNode = graph.addNode({
    shape: 'node-shape',
    x: parentX + 122 + 50, 
    y: parentY + (NODE_HEIGHT + 20) * (node.children?.length || 0),
    attrs: {
      label: {
        text: '子节点1',
      }
    },
    tools: ['node-editor'],
  });
  // targetNode.addTools({
  //   name: 'node-editor',
  //   args: {
  //     getText: 'a/b',
  //     setText: 'c/d',
  //   },
  // })
  targetNode.setParent(node);
  // todo 设置子节点位置
  setChildPosition(node);
  addMindEdge(graph, node, targetNode);
  graph.cleanSelection()
  graph.select(targetNode)
  return targetNode;
}

function setChildPosition(node: any) {
  const childs = node.children;
  if(childs?.length) {
    childs.forEach((child: any, idx: number) => {
      if(child.isNode()) {
        child.position(50, (idx * NODE_HEIGHT + 20), {
          relative: true
        })
      }
    })
  }
}

function addMindEdge(graph: any, source: any, target: any) {
  graph.addEdge({
    source, // 源节点 ID
    target, // 目标节点 ID
    attrs: {
      line: {
        stroke: '#8f8f8f',
        targetMarker: null
      },
    },
    router: {
      name: 'er',
      args: {
        padding: {
          left: 50,
        },
      },
    },
  });
}