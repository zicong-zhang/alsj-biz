<template>
  <div class="staff-detail-item-order">
    <div v-if="orderList.length"
      class="order-list">
      <order-list-item v-for="item in orderList"
        :key="item.id"
        :item="item" />
    </div>
  </div>
</template>
<script>
import orderListItem from '~views/order/order-list/order-list-item';
import { mapActions } from "vuex";

export default {
  name: 'staff-detail-item-order',
  components: {
    orderListItem
  },
  props: {
    staffId: String
  },
  data() {
    return {
      orderList: []

    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    ...mapActions(['getOrderListForStaff']),
    getDataList() {
      this.getOrderListForStaff(this.$route.query.id)
        .then(res => {
          this.orderList = res.data.list;
          console.log('res:_____', res);
        })
    }
  }
};
</script>
<style lang="scss">
.staff-detail-item-order {
  height: 100%;
  @include scroll(y);
}
</style>
