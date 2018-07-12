<template>
  <div class="home-header-tips">
    <div class="home-tips-module blue">
      <i class="iconfont icon-icon_wallet_note"></i>
      <h3>店铺尚未进行认证，暂不支持使用私家钱包进行在线交易。
        <span>点击了解更多
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
  name: "HomeTips",
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.home-header-tips {
  height: r(110px);
  color: #fff;
  font-size: r(24px);
  border-bottom: r(16px) solid transparent;
  h3 {
    font-size: r(24px);
    font-weight: normal;
    line-height: r(32px);
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
  padding: 0 r(36px);
  & > i {
    font-size: r(32px);
    margin-right: r(12px);
  }
  h3 {
    flex: 1;
    margin-right: r(28px);
    i {
      font-size: r(20px);
    }
  }
  &.blue {
    background: linear-gradient(to right, #2985ff, #3dadff); /* 标准的语法 */
  }
}
.auth-btn {
  height: r(52px);
  position: relative;
  display: flex;
  align-items: center;
  padding-left: r(33px);
  &:before {
    position: absolute;
    left: 0;
    top: 0;
    content: "";
    width: 1px;
    height: 100%;
    background: #fff;
    transform: scaleX(0.5);
  }
  span {
    display: block;
    line-height: r(44px);
    border-radius: r(8px);
    border: 1px solid #fff;
    font-size: r(24px);
    font-weight: normal;
    padding: 0 r(22px);
  }
}
</style>
