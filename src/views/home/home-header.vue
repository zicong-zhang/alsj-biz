<template>
  <header class="home-header">
    <span class="btn">
      <i class="iconfont icon-aboutnew"></i>
    </span>
    <div class="title"
      @click="showPop">
      <h2 :class="{'show-pop': isShowPop}">壹家壹品天河店
        <i class="iconfont icon-bottomnew"></i>
      </h2>
      <p>
        <span>店铺评分 4分</span>
        <i class="vertical-bar"></i>
        <span>关注人数 2,835</span>
      </p>
    </div>
    <span class="btn">
      <i class="iconfont icon-btn_my_setting"></i>
    </span>
  </header>
</template>

<script>
export default {
  name: "HomeHeader",
  data() {
    return {
      isShowPop: false
    };
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
  height: r(112px);
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
      font-size: r(32px);
      margin-bottom: r(14px);
      position: relative;
    }
    i {
      display: inline-block;
      transition: all 0.3s;
      font-size: r(24px);
    }
    p {
      width: 100%;
      font-size: r(20px);
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
        margin-right: r(16px);
      }
      &:last-child {
        text-align-last: left;
        margin-left: r(16px);
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
    line-height: r(112px);
    padding: 0 r(36px);
    i {
      font-size: r(44px);
    }
  }
}
</style>
