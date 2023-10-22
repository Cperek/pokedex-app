// @ts-ignore
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import createPersistedState from "vuex-plugin-persistedstate";
import { type InjectionKey } from 'vue'


export interface State {
    token: string | null,
    user: object | null,
    userLoggedIn: boolean,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null,
    userLoggedIn: false,
  },
  mutations: {
    setToken(state: {userLoggedIn: boolean; token: string | null;}, token: string | null)
    {
        state.token = token;
        state.userLoggedIn = token ? true : false; 
    },
    setUser(state: { user: object | null; }, user: object | null)
    {
        state.user = user;
    }
  },
  actions: {
    async setToken({commit}: any, token: string | null)
    {
      return await commit('setToken',token);
    },
    async setUser({commit}: any, user: object | null)
    {
       return await commit('setUser',user);
    }
  }
})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}