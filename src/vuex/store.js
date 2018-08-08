import Vue from 'vue';
import Vuex from 'vuex';

import root from './root';
import workerModule from '~views/worker/worker-store';
import orderListModule from '~views/order/order-list/order-list-store';
import orderDetailModule from '~views/order/order-detail/order-detail-store';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    root,
    workerModule,
    orderListModule,
    orderDetailModule
  }
});

export default store;