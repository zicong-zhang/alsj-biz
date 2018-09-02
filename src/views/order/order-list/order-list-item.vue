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
        <p class="budget">{{ item.linkmanBudget || 0 }}</p>
      </li>
    </ul>
    <div class="create-date">
      <i class="iconfont icon-icon_my_orrders"></i>
      <span>{{ item.updateDate | date }}</span>
    </div>
  </li>
</template>
<script>
import { mapState } from "vuex";
import cancelIcon from "~img/order/icon_cancelorder_white@2x.png";

export default {
  name: "OrderListItem",
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      cancelIcon
    };
  },
  computed: mapState({
    status: state => state.orderListModule.status
  }),
  created() {},
  methods: {
    finish() {},
    toDetail() {
      this.$emit("log-scrolltop");
      this.$store.commit("TURN", "on");
      this.$router.push({
        name: "order-detail",
        query: {
          id: this.item.id
        }
      });
    }
  }
};
</script>
<style lang="scss">
.order-list-item {
  background: #fff;
  padding: 0 r(36px);
  padding-bottom: r(35px);
  margin-bottom: r(16px);
      position: relative;
  .list-item-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: r(6px) solid #333;
    padding-top: r(30px);
    padding-bottom: r(32px);
    position: relative;
    &:before {
      content: "";
      display: block;
      width: 100%;
      height: r(2px);
      background: #333;
      position: absolute;
      bottom: r(-12px);
      left: 0;
      right: 0;
    }
    h3 {
      flex: 1;
      font-size: r(32px);
    }
    i {
      font-size: r(28px);
      margin-right: r(12px);
    }
  }
  .label {
    flex: none;
    color: #fff;
    font-size: r(24px);
    line-height: r(44px);
    border-radius: r(8px);
    background: $main;
    padding: 0 r(23px);
  }
  .address {
    @include over(1);
  }
  .budget {
    &:before {
      content: "¥";
      margin-right: r(6px);
    }
  }
  .customer-info {
    border-bottom: r(1px) solid #c7c7c7;
    padding-top: r(32px);
    padding-bottom: r(34px);
    margin-bottom: r(24px);
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: r(48px);
    }
    h5 {
      flex: none;
      color: #999;
      line-height: r(48px);
      font-weight: normal;
      font-size: r(24px);
      margin: 0;
    }
    p {
      max-width: 80%;
      text-align: right;
      font-size: r(24px);
      line-height: r(48px);
    }
  }
  .create-date {
    span {
      font-size: r(24px);
      color: #999;
    }
    i {
      font-size: r(24px);
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
