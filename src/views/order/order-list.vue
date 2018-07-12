<template>
  <div class="order-list">

    <OrderListHeader/>
    <div class="content">
      <ul>
        <OrderListItem v-for="(item, idx) in dataList"
          :item="item"
          :key="idx" />
      </ul>
    </div>

    <VFooter/>
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
      dataList: 15
    };
  }
};
</script>
<style lang="scss">
.order-list {
  display: flex;
  flex-flow: column;

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

