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

export default {
  name: "OrderDetail",
  components: {
    WorkerTips,
    OrderDetailItemProgress
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
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
