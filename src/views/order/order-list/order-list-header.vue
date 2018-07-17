<template>
  <header class="order-list-header">
    <h2>订单详情</h2>
    <ul>
      <li v-for="(item, idx) in list"
        :class="{active: active === idx}"
        :key="idx"
        @click="changeActive(idx)">
        <p>{{ item }}</p>
      </li>
      <li :class="{last: true, active: active === 3}"
        @click="showMoreStatus">
        <p>
          <span>{{ statusName }}</span>
          <i class="iconfont icon-bottomnew"></i>
        </p>
        <VPopup :list="moreStatus"
          v-if="isShowPopup"
          @select="selectMoreStatus" />
      </li>
    </ul>
  </header>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "OrderListHeader",
  data() {
    return {
      active: 0,
      isShowPopup: false,
      list: ["上门量尺", "设计方案", "签订合同"],
      moreStatus: ["上门量尺", "设计方案", "签订合同"],
      statusName: "更多状态"
    };
  },
  computed: {
    ...mapState({
      status: state => state.OrderListModule.status
    })
  },
  methods: {
    ...mapActions(["getListByStatus"]),
    ...mapMutations(["CHANGE_STATUS"]),
    changeActive(idx) {
      if (this.active === idx) return false;
      this.active = idx;
      this.CHANGE_STATUS(idx + 1);
      this.getListByStatus(1);
    },
    showMoreStatus() {
      this.isShowPopup = !this.isShowPopup;
    },
    selectMoreStatus(item) {
      this.CHANGE_STATUS(3);
      this.getListByStatus(1);
      this.isShowPopup = false;
      this.statusName = item;
    }
  }
};
</script>
<style lang="scss" scoped>
.order-list-header {
  flex: none;
  height: r(88px +e(55px));
  background: #fff;
  h2 {
    height: e(88px);
    line-height: e(88px);
    font-size: e(32px);
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
        content: "";
        display: block;
        width: e(2px);
        height: e(24px);
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
    height: e(51px);
    text-align: center;
    font-size: e(24px);
    border-bottom: e(4px) solid transparent;
    margin: 0 e(10px);
    transition: all 0.2s;
  }
  i {
    font-size: e(24px);
  }
  .active {
    color: $main;
    p {
      border-color: $main;
    }
  }
}
</style>
