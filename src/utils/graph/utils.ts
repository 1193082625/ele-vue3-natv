import { MindMapData } from "./interface"

export const findItem = (
  obj: MindMapData,
  id: string,
): {
  parent: MindMapData | null
  node: MindMapData | null
} | null => {
  if (obj.id === id) {
    return {
      parent: null,
      node: obj,
    }
  }
  const { children } = obj
  if (children) {
    for (let i = 0, len = children.length; i < len; i++) {
      const res = findItem(children[i], id)
      if (res) {
        return {
          parent: res.parent || obj,
          node: res.node,
        }
      }
    }
  }
  return null
}