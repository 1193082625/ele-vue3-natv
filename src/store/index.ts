import { createStore } from "vuex";
import {graph} from './graph';

export const store = createStore({
  modules: {
    graph // graph模块
  }
})