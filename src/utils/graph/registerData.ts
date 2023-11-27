
import { Path } from '@antv/x6'
// 中心主题或分支主题
export const registerParentNodeAttr = {
  inherit: 'rect',
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'image',
      selector: 'img',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
  attrs: {
    body: {
      rx: 6,
      ry: 6,
      stroke: '#5F95FF',
      fill: '#EFF4FF',
      strokeWidth: 1,
    },
    img: {
      ref: 'body',
      refX: '100%',
      refY: '50%',
      refY2: -8,
      width: 16,
      height: 16,
      'xlink:href':
        'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SYCuQ6HHs5cAAAAAAAAAAAAAARQnAQ',
      event: 'add:topic',
      class: 'topic-image',
    },
    label: {
      fontSize: 14,
      fill: '#262626',
    },
  },
};

// 子主题
export const registerChildNodeAttr = {
  inherit: 'rect',
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
    {
      tagName: 'path',
      selector: 'line',
    },
  ],
  attrs: {
    body: {
      fill: '#ffffff',
      strokeWidth: 0,
      stroke: '#5F95FF',
    },
    label: {
      fontSize: 14,
      fill: '#262626',
      textVerticalAnchor: 'bottom',
    },
    line: {
      stroke: '#5F95FF',
      strokeWidth: 2,
      d: 'M 0 15 L 60 15',
    },
  },
}

// 连接器
export const connectorAttr = (sourcePoint: { x: number; y: any; }, targetPoint: { x: number; y: any; }, routerPoints: any, options: { raw: any; }) => {
  const midX = sourcePoint.x + 10
  const midY = sourcePoint.y
  const ctrX = (targetPoint.x - midX) / 5 + midX
  const ctrY = targetPoint.y
  const pathData = `
   M ${sourcePoint.x} ${sourcePoint.y}
   L ${midX} ${midY}
   Q ${ctrX} ${ctrY} ${targetPoint.x} ${targetPoint.y}
  `
  return options.raw ? Path.parse(pathData) : pathData
};

export const edgeAttr = {
  inherit: 'edge',
  connector: {
    name: 'mindmap',
  },
  attrs: {
    line: {
      targetMarker: '',
      stroke: '#A2B1C3',
      strokeWidth: 2,
    },
  },
  zIndex: 0,
}