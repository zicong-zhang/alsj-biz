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
      moreStatus: ["复尺", "下单", "生产", "送货安装", "待确认", "完成", "已取消"],
      statusName: "更多状态"
    };
  },
  computed: {
    ...mapState({
      status: state => state.orderListModule.status
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
    selectMoreStatus(item, idx) {
      console.log('item, idx:_____', item, idx);
      this.isShowPopup = false;
      this.statusName = item;
      this.active = 3;
      let status = item === '已取消' ? 0 : idx + 4;
      this.CHANGE_STATUS(status);
      this.getListByStatus(1);
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
    height: e(68px);
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
    padding-top: 20px;
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
        top: 20px;
      }
    }
  }
  .last {
    p {
      position: relative;
      margin-right: 20px;
    }
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
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(100%, 0%);
  }
  .active {
    color: $main;
    p {
      border-color: $main;
    }
  }
}
</style>
