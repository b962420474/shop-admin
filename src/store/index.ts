import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { IUserInfo } from '@/api/types/common'
import { getItem, setItem } from '@/utils/storage'
export interface State {
  count: number,
  isCollapse: boolean,
  user:(IUserInfo & {token:string})|null
}
export const key: InjectionKey<Store<State>> = Symbol('Store')
export const store = createStore<State>({
  state: {
    count: 1,
    isCollapse: true,
    user: getItem<IUserInfo & {token:string}>('user')
  },
  getters: {},
  mutations: {
    setIsCollapse: function (state, payload) {
      state.isCollapse = payload
    },
    setUser (state, payload) {
      state.user = payload
      setItem('user', payload)
    }
  },
  actions: {},
  modules: {}
})
export function useStore () {
  return baseUseStore(key)
}
