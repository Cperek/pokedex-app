// @ts-ignore
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { type InjectionKey } from 'vue'


export interface State {
    token?: string,
    user?: object,
    userLoggedIn?: boolean,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  strict: true,
  state: {
    token: null,
    user: null,
    userLoggedIn: false,
  },
  mutations: {
    setToken(state: {userLoggedIn: boolean; token: any;}, token: string)
    {
        state.token = token;
        state.userLoggedIn = token ? true : false; 
    },
    setUser(state: { user: object; }, user: object)
    {
        state.user = user;
    }
  },
  actions: {
    setToken({commit}: any, token: string)
    {
        commit('setToken',token);
    },
    setUser({commit}: any, user: object)
    {
        commit('setUser',user);
    }
  }
})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}