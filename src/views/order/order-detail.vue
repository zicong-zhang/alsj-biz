<template>
  <div class="order-detail">
    <VHeader :title="'订单详情'" />
    <div class="content">
      <WorkerTips />
      <OrderDetailItemProgress/>
    </div>
  </div>
</template>
<script>
import WorkerTips from "~views/worker/worker-tips";
import OrderDetailItemProgress from './order-detail-item-progress';

import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: "OrderDetail",
  components: {
    WorkerTips,
    OrderDetailItemProgress
  },
  data() {
    return {
      orderId: ''
    };
  },
  computed: {
    ...mapState({
      storeId: state => state.storeId
    })
  },
  created() {
    this.SET_ORDER_ID(this.$route.params.id);
    this.getOrderDetailInfo()
  }, 
  methods: {
    ...mapActions(['getOrderDetailInfo']),
    ...mapMutations(['SET_ORDER_ID'])
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
