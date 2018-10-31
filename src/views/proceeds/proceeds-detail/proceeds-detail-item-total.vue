<template>
  <div class="proceeds-detail-total">
    <!-- 总数 -->
    <!-- 实收 -->
    <div
      v-if="type == 0"
      class="total-num"
    >
      <h2><span>{{ totalAmount | money }}</span><span>元</span></h2>
      <p>{{ year }}-{{ month.toString().padStart(2, '0') }}</p>
      <div
        class="switch-btn"
        @click="changeActualIncomeMonth('prev')"
      >
        <i class="icon i-back"></i>
      </div>
      <div
        class="switch-btn"
        @click="changeActualIncomeMonth('next')"
      >
        <i class="icon i-next"></i>
      </div>
    </div>

    <!-- 待收 -->
    <div
      v-else
      class="total-num"
    >
      <h2><span>{{ totalAmount | money }}</span><span>元</span></h2>
      <p>总待收金额</p>
    </div>

    <!-- 进度 -->
    <div class="rate">
      <span>线上订单&nbsp;{{ onlineAmount | money }}元</span>
      <span>线下订单&nbsp;{{ offlineAmount | money }}元</span>

      <!-- 线上 -->
      <p :style="{
        width: `${(onlineAmount / totalAmount) * 100}%`
      }">
      </p>
      <!-- 线下 -->
      <p :style="{
        width: `${(offlineAmount / totalAmount) * 100}%`
      }">
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'proceeds-detail-total',
  props: {
    type: Number,
    year: {
      type: Number,
      default: () => new Date().getFullYear()
    },
    month: {
      type: Number,
      default: () => new Date().getMonth() + 1
    },
    totalAmount: Number,
    onlineAmount: Number,
    offlineAmount: Number
  },
  data() {
    return {};
  },
  methods: {
    changeActualIncomeMonth(handle) {
      let { year, month } = this.$props;
      // 下个月
      if (handle === 'next') {
        if (month == 12) {
          year++;
          month = 1;
        } else {
          month++;
        }
      }

      // 上个月
      if (handle === 'prev') {
        if (month == 1) {
          year--;
          month = 12;
        } else {
          month--;
        }
      }

      this.$emit('change-month', year, month);
    }
  }
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
    height: 162px;
    margin-bottom: 62px;
    position: relative;
    h2 {
      line-height: .8;
      text-align: center;
      padding-top: 62px;
      margin-bottom: 24px;
    }
    span {
      &:first-of-type {
        font-size: 80px;
      }
      &:last-of-type {
        font-size: 32px;
        font-weight: normal;
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
    position: relative;
    display: flex;
    width: 100%;
    height: 32px;
    border-radius: 32px;
    overflow: hidden;
    span {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      line-height: 32px;
      color: #fff;
      font-size: 20px;
      padding: 0 16px;
      &:last-of-type {
        left: auto;
        right: 0;
      }
    }
    p {
      width: 50%;
      box-sizing: border-box;
      background: $main;
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
