<template>
  <div class="order-detail-item-keeper">
    <H2 title="跟进人" />
    <ul>
      <v-cell v-for="item in list"
        :key="item.userId"
        :label="item.currentKeeperFlag === 1 ? '当前跟进人' : '历史跟进人'"
        :value="item.keeperName" />
      <v-cell label="订单创建人"
        :value="orderCreater" />
    </ul>
  </div>
</template>
<script>
import H2 from './order-detail-item-h2';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'OrderDetailItemKeeper',
  components: {
    H2
  },
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapState({
      orderCreater: state =>
        state.orderDetailModule.orderInfo.createStaffNickname
    }),
    ...mapGetters(['keepers'])
  },
  watch: {
    keepers(val) {
      this.$set(this.$data, 'list', val);
    }
  }
};
</script>

<style lang="scss">
.order-detail-item-keeper {
  background: #fff;
  padding: 0 r(36px);
  margin-bottom: r(16px);
  ul {
    padding-top: r(22px);
    padding-bottom: r(36px);
  }
}
</style>
