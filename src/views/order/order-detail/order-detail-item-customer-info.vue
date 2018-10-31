<template>
  <div class="order-detail-item-customer-info">
    <item-title :title="title"
    @click="toEditCustomer">
      <i class="icon i-next"></i>
    </item-title>

    <ul>
      <v-cell label="客户姓名"
        align="left"
        :value="info.linkmanName" />
      <v-cell class="blue"
        align="left"
        label="客户手机"
        :value="info.linkmanPhone"
        @handler="call" />
      <v-cell class="address"
        align="left"
        label="客户地址"
        :value="info.linkmanAddress" />
      <li :class="{blue: !info.linkmanBudget}">
        <h5>客户预算</h5>
        <p class="common-rmb"
          v-if="info.linkmanBudget"
          key="hasLinkmanBudget">{{ info.linkmanBudget | money(2) }}</p>
        <p v-else
          @click="toEditCustomer"
          key="noLinkmanBudget">添加客户预算</p>
      </li>
    </ul>
  </div>
</template>

<script>
import itemTitle from './order-detail-item-h2';
import { mapState } from 'vuex';

export default {
  name: 'OrderDetailItemCustomerInfo',
  components: {
    itemTitle
  },
  data() {
    return {
      title: '客户信息'
    };
  },
  computed: mapState({
    info: state => state.orderDetailModule.orderInfo
  }),
  methods: {
    call() {
      window.location.href = `tel:${this.info.linkmanPhone}`;
    },
    toEditCustomer() {
      this.$utils.go({
        name: 'order-edit-customer'
      })
    }
  }
};
</script>

<style lang="scss">
.order-detail-item-customer-info {
  background: #fff;
  padding: 0 e(36px);
  margin-bottom: e(16px);
  ul {
    padding-top: e(22px);
    padding-bottom: e(36px);
  }
  li {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    line-height: e(48px);
  }
  h5 {
    flex: none;
    color: #999;
    font-weight: normal;
    font-size: e(24px);
    margin: 0;
    margin-right: e(22px);
  }
  p {
    font-size: e(24px);
    line-height: e(48px);
  }
}
.blue {
  p {
    color: $main;
  }
}
</style>
