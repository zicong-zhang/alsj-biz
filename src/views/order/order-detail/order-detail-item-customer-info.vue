<template>
  <div class="order-detail-item-customer-info">
    <H2 :title="title"
    @click="toEditCustomer">
      <i class="iconfont icon-btn_all_next"></i>
    </H2>

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
          key="hasLinkmanBudget">{{ info.linkmanBudget }}</p>
        <p v-else
          @click="toEditCustomer"
          key="noLinkmanBudget">添加客户预算</p>
      </li>
    </ul>
  </div>
</template>

<script>
import H2 from './order-detail-item-h2';
import { mapState } from 'vuex';

export default {
  name: 'OrderDetailItemCustomerInfo',
  components: {
    H2,
  },
  data() {
    return {
      title: '客户信息',
    };
  },
  computed: mapState({
    info: state => state.orderDetailModule.orderInfo,
  }),
  methods: {
    call() {
      console.log('打电话');
    },
    toEditCustomer() {
      this.$store.commit('TURN', 'on');
      this.$router.push({
        name: 'order-edit-customer',
      });
    },
  },
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
