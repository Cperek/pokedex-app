// @ts-ignore
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { type InjectionKey } from 'vue'


export interface State {
    token?: string,
    user?: object,
    UserLoggedIn?: boolean,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  strict: true,
  state: {
    token: null,
    user: null,
    UserLoggedIn: null,
  },
  mutations: {
    setToken (state: { token: any; }, token: any)
    {
        state.token = token;
    }
  },
  actions: {
    setToken ({commit}: any, token: any)
    {
        commit('setToken',token);
    }
  }
})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}