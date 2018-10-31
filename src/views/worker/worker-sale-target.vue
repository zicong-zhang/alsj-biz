<template>
  <div class="home-sale-target">
    <div class="title"
      @click="toPerformanceTarget">
      <h3>目标进度</h3>
      <p>设置
        <i class="icon i-next"></i>
      </p>
    </div>
    <p class="tip">
      <span>本月</span>
      <span>已完成/目标</span>
    </p>
    <div class="plan">
      <p @click="toPerformanceTotal">
        <span>{{ currentAmount | money(2) }}元</span>/{{ targetAmount | money(2) }}元
        <i class="icon i-next"></i>
      </p>
      <h4>{{ rate }}</h4>
    </div>
    <div class="rate">
      <p :style="{width: rate}"></p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'HomeSaleTarget',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      storeId: state => state.root.storeId,
      currentAmount: state => state.workerModule.merchantTradeAmount,
      targetAmount: state => state.workerModule.merchantGoalAmount,
      rate: state => state.workerModule.rate
    })
  },
  watch: {
    storeId() {
      this.init();
    }
  },
  methods: {
    ...mapActions(['getStoreSaleTarget']),
    init() {
      this.getStoreSaleTarget();
    },
    toPerformanceTarget() {
      this.$utils.go({
        name: 'performance-target'
      });
    },
    toPerformanceTotal() {
      this.$utils.go({
        name: 'performance-total'
      });
    }
  }
};
</script>
<style lang="scss">
.home-sale-target {
  background: #fff;
  padding: 0 36px;
  padding-bottom: 32px;
  margin-bottom: 16px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 43px;
    h3 {
      font-size: 32px;
      font-weight: bold;
      padding-left: 16px;
      padding-top: 33px;
      position: relative;
      &:before {
        content: "";
        width: 4px;
        height: 28px;
        background: #333;
        border-radius: 4px;
        position: absolute;
        left: 0;
        top: calc(50% + #{r(16px)});
        transform: translateY(-50%);
      }
    }
    p {
      color: #999;
      font-size: 24px;
      padding-top: 40px;
    }
    i {
      font-size: 24px;
    }
  }
  .tip {
    font-size: 20px;
    color: #999;
    margin-bottom: 8px;
    span {
      &:first-child {
        color: #333;
      }
    }
  }
  .plan {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 23px;
    p {
      font-size: 40px;
      color: #333;
      display: flex;
      align-items: center;
    }
    span {
      color: #39f;
    }
    h4 {
      color: #39f;
      font-size: 40px;
      font-weight: normal;
    }
    i {
      font-size: 22px;
      margin-left: 12px;
    }
  }
  .rate {
    width: 100%;
    height: 12px;
    background: #e5f2ff;
    border-radius: 12px;
    position: relative;
    p {
      position: absolute;
      left: 0;
      top: 0;
      width: 40%;
      height: 100%;
      border-radius: 12px;
      background: linear-gradient(to right, #2985ff, #3dadff);
    }
  }
}
</style>
