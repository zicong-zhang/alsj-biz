<template>
  <div class="home-header-tips">
    <div class="home-tips-module blue">
      <i class="iconfont icon-icon_wallet_note"></i>
      <h3>店铺尚未进行认证，暂不支持使用私家钱包进行在线交易。
        <span @click="toAuthExplain">点击了解更多
          <i class="iconfont icon-rightBtn"></i>
        </span>
      </h3>
      <div class="auth-btn">
        <span>立即认证</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeTips',
  data() {
    return {};
  },
  methods: {
    toAuthExplain() {
      window.location.href = 'http://test.alasga.cn/pro/proxy/web/web/pages/product/product_detail.html?id=28';
    }
  }
};
</script>
<style lang="scss">
.home-header-tips {
  height: e(110px);
  color: #fff;
  font-size: e(24px);
  h3 {
    font-size: e(24px);
    font-weight: normal;
    line-height: e(32px);
  }
  span {
    font-weight: bold;
  }
  i {
    color: #fff;
  }
}
.home-tips-module {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 e(36px);
  & > i {
    font-size: e(32px);
    margin-right: e(12px);
  }
  h3 {
    flex: 1;
    margin-right: e(28px);
    i {
      font-size: e(20px);
    }
  }
  &.blue {
    background: linear-gradient(to right, #2985ff, #3dadff); /* 标准的语法 */
  }
}
.auth-btn {
  height: e(52px);
  position: relative;
  display: flex;
  align-items: center;
  padding-left: e(33px);
  &:before {
    position: absolute;
    left: 0;
    top: 0;
    content: "";
    width:e(1px);
    height: 100%;
    background: #fff;
    transform: scaleX(0.5);
  }
  span {
    display: block;
    line-height: e(44px);
    border-radius: e(8px);
    border:e(1px) solid #fff;
    font-size: e(24px);
    font-weight: normal;
    padding: 0 e(22px);
  }
}
</style>
