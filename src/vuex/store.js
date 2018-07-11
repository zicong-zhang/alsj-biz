import Vuex from 'vuex';
import states from './states';
import actions from './actions';
import mutations from './mutations';

import storeModule from '~views/store/store';


const store  = {
  strict: process.env.NODE_ENV !== 'production',
  states,
  actions,
  mutations,
  modules: {
    storeModule
  }
}

export default store;