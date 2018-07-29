<template>
  <header class="home-header">
    <span class="btn">
      <i class="iconfont icon-aboutnew"></i>
    </span>
    <div class="title"
      @click="showPop">
      <h2 :class="{'show-pop': isShowPop}">{{ storeInfo.merchantName }}
        <i class="iconfont icon-bottomnew"></i>
      </h2>
      <p>
        <span>店铺评分 {{ storeInfo.grade }}分</span>
        <i class="vertical-bar"></i>
        <span>关注人数 {{ storeInfo.merchantFollowCount }}</span>
      </p>
    </div>
    <span class="btn">
      <i class="iconfont icon-btn_my_setting"></i>
    </span>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "HomeHeader",
  data() {
    return {
      isShowPop: false
    };
  },
  computed: {
    ...mapGetters(['storeInfo'])
  },
  methods: {
    showPop() {
      this.isShowPop = !this.isShowPop;
    }
  }
};
</script>
<style lang="scss">
.home-header {
  -webkit-box-flex: 1;
  flex: none;
  height: 112px;
  flex: none;
  display: flex;
  justify-content: space-between;
  align-self: auto;
  background: #fff;
  .title {
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    h2 {
      font-size: 32px;
      margin-bottom: 14px;
      position: relative;
    }
    i {
      display: inline-block;
      height: 16px;
      font-size: 24px;
    }
    p {
      width: 100%;
      font-size: 20px;
      color: #999;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    span {
      flex: 1;
      display: inline-block;
      &:first-child {
        text-align: right;
        margin-right: 16px;
      }
      &:last-child {
        text-align-last: left;
        margin-left: 16px;
      }
    }
  }
  .show-pop {
    i {
      transition: all 0.3s;
      transform: rotate(180deg);
    }
  }
  .btn {
    display: block;
    line-height: 112px;
    padding: 0 36px;
    &:last-child {
      left: auto;
      right: 0;
    }
    i {
      font-size: 44px;
    }
  }
}
</style>
