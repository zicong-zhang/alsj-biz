<template>
  <header class="order-list-header">
    <h2>订单列表</h2>
    <ul>
      <li v-for="(item, idx) in list"
        :class="{active: active === idx}"
        :key="idx"
        @click="changeActive(idx)">
        <p>{{ item }}</p>
      </li>
      <li :class="{last: true, active: active === 3}" @click="showMoreStatus">
        <p><span>{{ statusName }}</span><i class="iconfont icon-bottomnew"></i></p>
        <VPopup :list="moreStatus" 
        v-if="isShowPopup"
        @select="selectMoreStatus"/>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "OrderListHeader",
  data() {
    return {
      active: 0,
      isShowPopup: false,
      list: ["上门量尺", "设计方案", "签订合同"],
      moreStatus: ["上门量尺", "设计方案", "签订合同"],
      statusName: '更多状态'
    };
  },
  methods: {
    changeActive(idx) {
      this.active = idx;
    },
    showMoreStatus() {
      this.isShowPopup = true;
    },
    selectMoreStatus(item) {
      this.active = 3;
      this.isShowPopup = false;
      this.statusName = item;
    }
  }
};
</script>
<style lang="scss" scoped>
.order-list-header {
  flex: none;
  height: r(88px + 55px);
  background: #fff;
  h2 {
    height: r(88px);
    line-height: r(88px);
    font-size: r(32px);
    text-align: center;
  }
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  li {
    flex: 1;
    display: flex;
    justify-content: center;
    color: #999;
    position: relative;
    &:not(:last-child) {
      &:before {
        content: '';
        display: block;
        width: r(2px);
        height: r(24px);
        background: #ddd;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
  .last {
    position: relative;
  }
  p {
    height: r(50px);
    text-align: center;
    font-size: r(24px);
    border-bottom: r(4px) solid transparent;
    margin: 0 r(10px);
    transition: all .2s;
  }
  i {
    font-size: r(24px);
  }
  .active {
    color: $main;
    p {
      border-color: $main;
    }
  }
}
</style>
