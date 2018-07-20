<template>
  <div class="order-detail">
    <VHeader :title="'订单详情'" />
    <div class="content">
      <WorkerTips />
      <Progress/>
      <CustomerInfo/>
      <HouseType/>
      <CustomDemand/>
      <KeeperList/>
      <Contract/>
      <Design/>
      <Remark/>
    </div>
  </div>
</template>
<script>
import WorkerTips from "~views/worker/worker-tips";
import Progress from "./order-detail-item-progress";
import CustomerInfo from './order-detail-item-customer-info';
import HouseType from './order-detail-item-house-type';
import CustomDemand from './order-detail-item-demand';
import KeeperList from './order-detail-item-keeper';
import Contract from './order-detail-item-contract';
import Design from './order-detail-item-design';
import Remark from './order-detail-item-remark'

import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "OrderDetail",
  components: {
    WorkerTips,
    Progress,
    CustomerInfo,
    HouseType,
    CustomDemand,
    KeeperList,
    Contract,
    Design,
    Remark
  },
  watch: {
    $route(to, from) {
      if (from.name === "order-list" && from.name === 'order-detail') this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["getOrderDetailInfo"]),
    ...mapMutations(["SET_ORDER_ID"]),
    init() {
      this.SET_ORDER_ID(this.$route.query.id);
      this.getOrderDetailInfo();
    }
  }
};
</script>
<style lang="scss" scoped>
.order-detail {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.content {
  flex: 1;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
}
</style>
