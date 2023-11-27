export const graph = {
  namespace: true,
  state: {
    currentType: '',
    isGraph: true,
    theme: 'default',
    editingData: {}
  },
  // 同步
  mutations: {
    setLayout(state: any) {
      state.isGraph = !state.isGraph;
    },
    setCurrentType(state: any, type: string) {
      state.currentType = type;
    },
    setTheme(state: any, theme: string) {
      state.theme = theme;
    },
  },
  // 异步
  actions: {
    saveMind({commit}: any, payload: any) {
      // 一些异步操作

      // 操作完成后出发mutations
      commit({
        type: 'setCurrentType',
        content: payload.content
      })
    }
  }
}