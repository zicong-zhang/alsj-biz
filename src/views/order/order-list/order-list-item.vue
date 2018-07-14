<template>
  <li class="order-list-item" @click="toDetail">
    <div class="list-item-title">
      <i class="iconfont icon-icon_my_orrders"></i>
      <h3>订单：{{ item.orderCode }}</h3>
      <span class="label" @click="finish">{{ item.orderStatusName }}</span>
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
      <span>2018.5.20 16:12:10</span>
    </div>
  </li>
</template>
<script>
export default {
  name: "OrderListItem",
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {};
  },
  created() {
  },
  methods: {
    finish() {

    },
    toDetail() {
      this.$emit('log-scrolltop');
      this.$store.commit('bb', 'on');
      this.$router.push({
        name: 'order',
        query: {
          id: this.item.id
        }
      })
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
      font-weight: normal;
      font-size: r(24px);
      margin: 0;
    }
    p {
      max-width: 80%;
      text-align: right;
      font-size: r(24px);
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
}
</style>
