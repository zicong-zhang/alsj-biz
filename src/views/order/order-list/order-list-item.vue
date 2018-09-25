<template>
  <li class="order-list-item"
    @click="toDetail">
    <div class="cancel-cover"
      v-if="status === 0">
      <img :src="cancelIcon" />
      <p>取消原因：{{ (item.cancelTagNameList && item.cancelTagNameList.join('、')) || '无' }}</p>
    </div>
    <div class="list-item-title">
      <i class="iconfont icon-icon_my_orrders"></i>
      <h3>订单：{{ item.orderCode }}</h3>
      <span class="label"
        v-if="status !== 0"
        @click="finish">{{ item.orderStatusName }}</span>
    </div>
    <ul class="customer-info">
      <li>
        <h5>客户姓名</h5>
        <p>{{ item.linkmanName }}</p>
      </li>
      <li>
        <h5>客户手机</h5>
        <p>{{ item.linkmanPhone }}</p>
      </li>
      <li>
        <h5>客户地址</h5>
        <p class="address">{{ item.linkmanAddress }}</p>
      </li>
      <li>
        <h5>客户预算</h5>
        <p class="budget">{{ item.linkmanBudget | money(2) }}</p>
      </li>
    </ul>
    <div class="create-date">
      <i class="icon i-shizhong"></i>
      <span>{{ item.updateDate | date }}</span>
    </div>
  </li>
</template>
<script>
import { mapState } from 'vuex';
import cancelIcon from '~img/order/icon_cancelorder_white@2x.png';

export default {
  name: 'OrderListItem',
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      cancelIcon,
    };
  },
  computed: mapState({
    status: state => state.orderListModule.status,
  }),
  created() {},
  methods: {
    finish() {},
    toDetail() {
      this.$emit('log-scrolltop');
      this.$store.commit('TURN', 'on');
      this.$router.push({
        name: 'order-detail',
        query: {
          id: this.item.id,
        },
      });
    },
  },
};
</script>
<style lang="scss">
.order-list-item {
  background: #fff;
  padding: 0 36px;
  padding-bottom: 35px;
  margin-bottom: 16px;
      position: relative;
  .list-item-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 6px solid #333;
    padding-top: 30px;
    padding-bottom: 32px;
    position: relative;
    &:before {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      background: #333;
      position: absolute;
      bottom: -12px;
      left: 0;
      right: 0;
    }
    h3 {
      flex: 1;
      line-height: 44px;
      font-size: 24px;
    }
    i {
      font-size: 28px;
      line-height: 44px;
      margin-right: 12px;
    }
  }
  .label {
    flex: none;
    color: #fff;
    font-size: 24px;
    line-height: 44px;
    border-radius: 8px;
    background: $main;
    padding: 0 23px;
  }
  .address {
    @include over(1);
  }
  .budget {
    &:before {
      content: "¥";
      margin-right: 6px;
    }
  }
  .customer-info {
    border-bottom: 1px solid #c7c7c7;
    padding-top: 32px;
    padding-bottom: 34px;
    margin-bottom: 24px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 48px;
    }
    h5 {
      flex: none;
      color: #999;
      line-height: 48px;
      font-weight: normal;
      font-size: 24px;
      margin: 0;
    }
    p {
      max-width: 80%;
      text-align: right;
      font-size: 24px;
      line-height: 48px;
    }
  }
  .create-date {
    span {
      font-size: 24px;
      color: #999;
    }
    i {
      font-size: 24px;
      color: #999;
    }
  }
  .cancel-cover {
    display: block;
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 20;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    background: RGBA(113, 128, 143, 0.8);
    img {
      width: 157px;
      height: 119px;
      margin-bottom: 17px;
    }
    p {
      color: #fff;
      font-size: 24px;
      text-align: center;
      padding: 0 36px;
    }
  }
}
</style>
