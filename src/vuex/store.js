import Vue from 'vue';
import Vuex from 'vuex';

import workerModule from '~views/worker/worker-store';
import orderListModule from '~views/order/order-list/order-list-store';
import orderDetailModule from '~views/order/order-detail/order-detail-store';
import customerModule from '~views/customer-management/customer-store';
import productCenterModule from '~views/product/product-center/product-center-store';
import staffStore from '~views/staff/staff-store';
import root from './root';

if (process.env.NODE_ENV === 'development') {
  Vue.use(Vuex);
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    root,
    workerModule,
    orderListModule,
    orderDetailModule,
    customerModule,
    productCenterModule,
    staffStore,
  },
});

export default store;
