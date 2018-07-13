import Vuex from 'vuex';
import states from './states';
import actions from './actions';
import mutations from './mutations';

import storeModule from '~views/store/store';
import OrderListModule from '~views/order/order-list-store';
import OrderDetailModule from '~views/order/order-detail-store';


const store  = {
  strict: process.env.NODE_ENV !== 'production',
  states,
  actions,
  mutations,
  modules: {
    storeModule,
    OrderListModule,
    OrderDetailModule
  }
}

export default store;