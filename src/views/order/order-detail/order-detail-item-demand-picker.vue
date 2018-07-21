<template>
  <div class="order-detail-item-demand-picker">
    <div class="cover"
      v-if="isShow"
      @click.self="SHOW_DEMAND_PICKER"></div>

    <transition name="show-picker">
      <div class="demand-picker-container"
        v-if="isShow">

        <!-- 标题 -->
        <div class="demand-picker-title">
          <div>
            <i class="iconfont icon-btn_all_close1"
              @click="SHOW_DEMAND_PICKER"></i>
            <h4>选择客户的定制需求</h4>
            <span class="demand-picker-save-btn">保存</span>
          </div>
          <i class="horizon-bar"></i>
        </div>

        <!-- 空间 -->
        <div class="demand-picker-space-list">
          <ul>
            <li v-for="(item, idx) in 20"
              :key="idx">
              <h6>空间A</h6>
              <span>·2</span>
            </li>
          </ul>
        </div>

        <!-- 功能列表 -->
        <div class="demand-picker-function-list">
          <i class="horizon-bar"></i>
          <ul>
            <li :class="{active: item.active, 'demand-function-list': true}"
              v-for="(item, idx) in 12"
              :key="idx">功能A</li>
          </ul>
        </div>
      </div>

    </transition>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: "OrderDetailItemDemandPicker",
  data() {
    return {
      isShowDemandPicker: false
    };
  },
  computed: mapState({
    isShow: state => state.OrderDetailModule.isShowDemandPicker
  }),
  methods: {
    ...mapMutations(['SHOW_DEMAND_PICKER'])
  }
};
</script>
<style lang="scss">
.order-detail-item-demand-picker {
  .cover {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background: rgba(0, 0, 0, 0.6);
  }
}
.demand-picker-container {
  width: 100%;
  background: #fff;
  position: absolute;
  bottom: 0px;
  z-index: 20;
}
.demand-picker-title {
  div {
    height: 98px;
    line-height: 98px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h4 {
    font-size: 32px;
    flex: 1;
    text-align: center;
  }
  .icon-btn_all_close1 {
    display: block;
    width: 100px;
    color: #999;
    font-size: 22px;
    padding-left: 36px;
  }
  span {
    display: block;
    width: 120px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 24px;
    border: 1px solid $main;
    border-radius: 8px;
    color: $main;
    margin-right: 36px;
  }
}
.demand-picker-space-list {
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  ul {
    display: flex;
    padding-left: 36px;
  }
  li {
    height: 86px;
    flex: none;
    display: flex;
    align-items: flex-end;
    color: #999;
    padding-right: 50px;
  }
  h6 {
    font-size: 32px;
    line-height: 86px;
    font-weight: normal;
  }
  span {
    font-size: 20px;
    line-height: 74px;
  }
}
.demand-picker-function-list {
  ul {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    padding: 0 36px;
    padding-top: 36px;
  }
  li {
    width: 210px;
    text-align: center;
    box-sizing: border-box;
    color: #333;
    margin: 0;
    margin-bottom: 24px;
  }
}
</style>
