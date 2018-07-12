<template>
  <div class="order-list">
    <OrderListHeader/>
    <div class="content"
      ref="content">
      <ul>
        <OrderListItem v-for="(item, idx) in dataList"
          :item="{item}"
          :idx="idx"
          :key="idx"
          @log-scrolltop="logScrollTop" />
      </ul>
    </div>
  </div>
</template>
<script>
import OrderListHeader from "./order-list-header";
import OrderListItem from "./order-list-item";

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
  watch: {
    $route(to, from) {
      if (from.name == "order-detail") {
        this.$refs.content.scrollTop = this.$route.meta.scrollTop;
      }
    }
  },
  methods: {
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
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    & > ul {
      padding-top: r(16px);
    }
  }
}
</style>

