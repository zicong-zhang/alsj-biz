<template>
  <div class="order-list">
    <OrderListHeader/>
    <div class="content"
      ref="content">
      <ul v-if="orderList.length" key="order-list">
        <OrderListItem v-for="item in orderList"
          :item="item"
          :key="item.id"
          @log-scrolltop="logScrollTop" />
      </ul>
    </div>
  </div>
</template>
<script>
import OrderListHeader from "./order-list-header";
import OrderListItem from "./order-list-item";

import { mapState, mapActions } from 'vuex';

export default {
  name: "OrderList",
  components: {
    OrderListHeader,
    OrderListItem
  },
  data() {
    return {
      dataList: 5,
      scrollTop: 0
    };
  },
  computed: {
    ...mapState({
      status: state => state.orderListModule.status,
      orderList: state => state.orderListModule.orderList
    })
  },
  watch: {
    $route(to, from) {
      if (from.name == "order-detail") {
        this.$refs.content.scrollTop = this.$route.meta.scrollTop;
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    // 根据订单状态获取订单列表
    ...mapActions(['getListByStatus']),
    init() {
      this.getListByStatus(this.status);
    },
    // 记录滚动高度
    logScrollTop() {
      this.$route.meta.scrollTop = this.$refs.content.scrollTop;
    }
  }
};
</script>
<style lang="scss">
.order-list {
  display: flex;
  flex-flow: column;
  background: #f0f4f7;

  .content {
    flex: 1;
    @include scroll(y);
    & > ul {
      padding-top: r(16px);
    }
  }
}
</style>

