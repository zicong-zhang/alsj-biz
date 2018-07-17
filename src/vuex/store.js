import Vuex from 'vuex';
import states from './states';
import actions from './actions';
import mutations from './mutations';

import OrderListModule from '~views/order/order-list/order-list-store';
import OrderDetailModule from '~views/order/order-detail/order-detail-store';


const store  = {
  strict: process.env.NODE_ENV !== 'production',
  states,
  actions,
  mutations,
  modules: {
    OrderListModule,
    OrderDetailModule
  }
}

export default store;