import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
export interface State {
  count: number,
  isCollapse: boolean
}
export const key: InjectionKey<Store<State>> = Symbol('Store')
export const store = createStore<State>({
  state: {
    count: 1,
    isCollapse: true
  },
  getters: {},
  mutations: {
    setIsCollapse: function (state, payload) {
      state.isCollapse = payload
    }
  },
  actions: {},
  modules: {}
})
export function useStore () {
  return baseUseStore(key)
}
