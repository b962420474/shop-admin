import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
export interface State {
  count: number
}
export const key: InjectionKey<Store<State>> = Symbol('Store')
export const store = createStore<State>({
  state: {
    count: 1
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})
export function useStore () {
  return baseUseStore(key)
}
