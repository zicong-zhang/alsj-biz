<template>
  <div class="proceeds-detail-total">
    <!-- 总数 -->
    <div class="total-num">
      <h2><span>28.6</span><span>万</span></h2>
      <p>2018-05</p>
      <div class="switch-btn">
        <i class="iconfont icon-back"></i>
      </div>
      <div class="switch-btn">
        <i class="iconfont icon-btn_all_next"></i>
      </div>
    </div>

    <!-- 进度 -->
    <div class="rate">
      <p>
        <span>线上订单16.5万</span>
      </p>
      <p>
        <span>线下订单16.5万</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'proceeds-detail-total',
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss">
.proceeds-detail-total {
  display: flex;
  flex-flow: column;
  height: 287px;
  box-sizing: border-box;
  background: #e5f2ff;
  padding: 0 36px;
  .total-num {
    width: 100%;
    margin-bottom: 62px;
    position: relative;
    h2 {
      line-height: .8;
      text-align: center;
      padding-top: 62px;
      margin-bottom: 12px;
    }
    span {
      &:first-of-type {
        font-size: 80px;
      }
      &:last-of-type {
        font-size: 32px;
        color: #999;
        margin-left: 6px;
      }
    }
    p {
      text-align: center;
      font-size: 24px;
      color: #999;
    }
  }
  .switch-btn {
    position: absolute;
    left: 0px;
    top: 77px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    line-height: 64px;
    border-radius: 50%;
    background: #fff;
    color: #999;
    text-align: center;
    &:last-of-type {
      left: auto;
      right: 0px;
    }
  }
  .rate {
    display: flex;
    width: 100%;
    height: 32px;
    border-radius: 32px;
    overflow: hidden;
    p {
      width: 50%;
      line-height: 32px;
      box-sizing: border-box;
      background: $main;
      color: #fff;
      font-size: 20px;
      padding: 0 16px;
      padding-top: 2px;
      &:last-of-type {
        flex: 1;
        text-align: right;
        background: $red;
      }
    }
  }
}
</style>
