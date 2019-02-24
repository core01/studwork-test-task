import Vue from 'vue';
import Vuex from 'vuex';
import { MutationTree, ActionTree } from 'vuex';
import axios from 'axios';
import { Starship } from './types';

Vue.use(Vuex);

const notifier = new Vue();

export interface AppState {
  starships: Starship[];
  current: number;
  next: number | null;
  query: string;
  loading: boolean;
}

const state: AppState = {
  starships: [],
  current: 1,
  next: null,
  query: '',
  loading: false,
};

const mutations: MutationTree<AppState> = {
  SET_STARSHIPS(state, starships: Starship[]) {
    state.starships = starships;
  },
  SET_NEXT_PAGE(state, page: number) {
    state.next = page;
  },
  SET_QUERY(state, query: string) {
    state.query = query;
  },
  SET_CURRENT_PAGE(state, page: number) {
    state.current = page;
  },
  SET_LOADING(state, loading: boolean){
    state.loading = loading;
  }
};

const actions: ActionTree<AppState, any> = {
  /**
   * get ships from api with params
   * @param context
   */
  getShips(context) {
    const store = this;
    let url = 'https://swapi.co/api/starships/?';
    let search = false;

    if (context.state.query.length > 0) {
      url += 'search=' + context.state.query;
      search = true;
    }

    if (context.state.current !== 1) {
      const pageQuery = 'page=' + context.state.current;
      search ? (url += '&' + pageQuery) : (url += pageQuery);
    }

    store.commit('SET_LOADING', true);
    axios
      .get(url)
      .then( response => {
        // handle success
        store.commit('SET_STARSHIPS', response.data.results);

        let next = response.data.next;

        if (next) {
          next = next.replace(/[^0-9]/g, '');
        }

        store.commit('SET_NEXT_PAGE', next);
      })
      .catch(() => {
        // handle error
        (notifier as any).$noty.error('Упс! Ошибочка вышла, попробуйте позже!');
        // TODO add error log
      })
      .then(() => {
        store.commit('SET_LOADING', false);
      });
  }
};

export default new Vuex.Store<AppState>({
  state,
  mutations,
  actions
});
