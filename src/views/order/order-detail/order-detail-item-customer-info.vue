<template>
  <div class="customer-info">
    <H2 :title="title">
      <i class="iconfont icon-btn_all_next"></i>
    </H2>

    <ul>
      <VInfoList label="客户姓名" 
        align="left"
        :value="info.linkmanName" />
      <VInfoList class="blue" 
        align="left"
        label="客户手机"
        :value="info.linkmanPhone"
        @handler="call" />
      <VInfoList class="address" 
        align="left"
        label="客户地址"
        :value="info.linkmanAddress" />
      <li class="blue">
        <h5>客户预算</h5>
        <p class="common-rmb"
          v-if="info.linkmanBudget"
          key="hasLinkmanBudget">{{ info.linkmanBudget }}</p>
        <p v-else
          key="noLinkmanBudget">添加客户预算</p>
      </li>
    </ul>
  </div>
</template>

<script>
import H2 from "./order-detail-item-h2";
import { mapState } from "vuex";

export default {
  name: "OrderDetailItemCustomerInfo",
  components: {
    H2
  },
  data() {
    return {
      title: "客户信息"
    };
  },
  computed: mapState({
    info: state => state.OrderDetailModule.orderInfo
  }),
  methods: {
    call() {
      alert("打电话");
    }
  }
};
</script>

<style lang="scss">
.customer-info {
  background: #fff;
  padding: 0 r(36px);
  margin-bottom: r(16px);
  ul {
    padding-top: r(22px);
    padding-bottom: r(36px);
  }
  li {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    line-height: r(48px);
  }
  h5 {
    flex: none;
    color: #999;
    font-weight: normal;
    font-size: r(24px);
    margin: 0;
    margin-right: r(22px);
  }
  p {
    font-size: r(24px);
    line-height: r(48px);
  }
}
.blue {
  p {
    color: $main;
  }
}
</style>
