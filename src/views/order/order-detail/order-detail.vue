<template>
  <div class="order-detail">
    <v-header :title="'订单详情'" />
    <div class="content">
      <WorkerTips v-if="false" />
      <Progress/>
      <CustomerInfo/>
      <HouseType/>
      <CustomDemand/>
      <KeeperList/>
      <Contract/>
      <Design/>
      <!-- <Remark/> -->
    </div>
    <NextBtn v-if="orderDetailStatus <= 7" />
  </div>
</template>
<script>
import WorkerTips from '~views/worker/worker-tips';
import Progress from './order-detail-item-progress';
import CustomerInfo from './order-detail-item-customer-info';
import HouseType from './order-detail-item-house-type';
import CustomDemand from './order-detail-item-demand';
import KeeperList from './order-detail-item-keeper';
import Contract from './order-detail-item-contract';
import Design from './order-detail-item-design';
import Remark from './order-detail-item-remark';
import NextBtn from './order-detail-item-next-step-btn';

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'OrderDetail',
  components: {
    WorkerTips,
    Progress,
    CustomerInfo,
    HouseType,
    CustomDemand,
    KeeperList,
    Contract,
    Design,
    Remark,
    NextBtn
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(['orderDetailStatus'])
  },
  methods: {
    ...mapActions(['getOrderDetailInfo']),
    ...mapMutations(['SET_ORDER_ID']),
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
  @include scroll(y);
}
</style>
