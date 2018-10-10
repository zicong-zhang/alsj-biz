<template>
  <div class="view-staff-detail">
    <v-header title="店员详情" />
    <div class="content">
      <!-- 个人信息 -->
      <div class="staff-intro">
        <v-img :src="baseInfo.avatar"
          loading-type="user" />
        <div class="staff-intro-name">
          <h4>{{ baseInfo.nickname }}</h4>
          <p>{{ baseInfo.positionTypeName }}</p>
        </div>
        <p class="staff-intro-handle">
          <i class="iconfont icon-comment"></i>
        </p>
        <p class="staff-intro-handle"
          @click="call">
          <i class="iconfont icon-btn_msg_call"></i>
        </p>
      </div>
      <i class="gap"></i>
      <!-- 导航 -->
      <nav class="nav">
        <h3 :class="{active: active === 0}"
          @click="changeNav(0)">他跟进的订单</h3>
        <h3 :class="{active: active === 1}"
          @click="changeNav(1)">店员资料</h3>
      </nav>
      <div class="modules">
        <!-- 跟进的订单 -->
        <order-list :class="{'show-module': active === 0}" />
        <!-- 店员信息 -->
        <staff-info :class="{'show-module': active === 1}" />
      </div>
    </div>
  </div>
</template>
<script>
import orderList from './staff-detail-item-order';
import staffInfo from './staff-detail-item-info';

export default {
  name: 'view-staff-detail',
  components: {
    orderList,
    staffInfo
  },
  data() {
    return {
      baseInfo: {
        id: '',
        avatar: '', // 头像
        nickname: '', // 昵称
        positionTypeName: '', // 职位
        phone: ''
      },
      active: 0
    };
  },
  activated() {
    this.init();
  },
  methods: {
    init() {
      this.active = 0;
      Object.assign(this.baseInfo, this.$route.query);
    },
    changeNav(idx) {
      if (this.active !== idx) this.active = idx;
    },
    call() {
      window.location.href = `tel:${this.baseInfo.phone}`;
    }
  }
};
</script>
<style lang="scss">
.view-staff-detail {
  display: flex;
  flex-flow: column;
  .content {
    height: calc(100% - 88px);
    flex: 1;
  }
  .staff-intro {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 184px;
    background: linear-gradient(to right, #2985ff, #3dadff);
    color: #fff;
    padding: 0 36px;
  }
  .v-img {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    margin-right: 18px;
  }
  .staff-intro-name {
    flex: 1;
    h4 {
      font-weight: normal;
      font-size: 32px;
      margin-bottom: 8px;
    }
    p {
      width: 80px;
      height: 32px;
      line-height: 34px;
      font-size: 20px;
      background: #e5f2ff;
      border-radius: 4px;
      text-align: center;
      color: #2299ff;
    }
  }
  .staff-intro-handle {
    padding-left: 20px;
    margin-left: 24px;
    i {
      font-size: 34px;
    }
  }
  .nav {
    display: flex;
    height: 88px;
    background: #fff;
    margin-bottom: 2px;
    h3 {
      flex: 1;
      line-height: 88px;
      text-align: center;
      font-weight: normal;
      font-size: 32px;
    }
  }
  .active {
    color: $main;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 0);
      display: block;
      width: 80px;
      height: 4px;
      background: $main;
    }
  }
  .modules {
    height: calc(100% - 16px - 184px - 88px - 2px);
    overflow: hidden;
    position: relative;
    & > div {
      position: absolute;
      left: 0;
      top: 0;
      transform: translate3d(-200%, 0, 0);
      width: 100%;
      box-sizing: border-box;
    }
    .show-module {
      transform: translate3d(0, 0, 0);
    }
  }
}
</style>
