import Vue from 'vue';
import Vuex from 'vuex';

import workerModule from './modules/worker-store';
import orderListModule from './modules/order-list-store';
import proceedsDetailStore from './modules/proceeds-detail-store';
import orderDetailModule from './modules/order-detail-store';
import customerModule from './modules/customer-store';
import productCenterModule from './modules/product-center-store';
import staffStore from './modules/staff-store';
import root from './modules/root-store';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    root,
    workerModule,
    proceedsDetailStore,
    orderListModule,
    orderDetailModule,
    customerModule,
    productCenterModule,
    staffStore
  }
});

export default store;
