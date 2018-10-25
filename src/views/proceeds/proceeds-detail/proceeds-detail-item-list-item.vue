<template>
  <li class="proceeds-detail-item-list-item">
    <i class="horizon-bar"></i>
    <!-- 实收 -->
    <div v-if="type === 0">
      <div class="description">
        <h3>收到({{ item.customerName }})&nbsp;{{ item.remark }}</h3>
        <span>{{ (item.payDate || '').slice(5, 10) }}</span>
      </div>
      <div class="amount">
        <h4 :class="{
          retainage: item.payType == 1
        }">+{{ item.amount | money }}元</h4>
        <span>{{ item.staffName }}跟进</span>
      </div>
    </div>
    <!-- 待收 -->
    <div v-else>
      <div class="description">
        <h3>{{ item.customerName }}</h3>
        <span>{{ orderStatusList[item.orderStatus - 1] }}</span>
      </div>
      <div class="amount">
        <h4 :class="{
          retainage: item.payType == 1
        }">{{ item.amount | money }}元</h4>
        <span>{{ item.staffName }}跟进</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'proceeds-detail-item-list-item',
  props: {
    item: Object,
    type: Number
  },
  data() {
    return {
      orderStatusList: []
    }
  },
  created() {
    this.orderStatusList = this.$utils.getOrderProgress();
  }
};
</script>

<style lang="scss">
  .proceeds-detail-item-list-item {
    & > div {
      display: flex;
      justify-content: space-between;
      padding: 32px 0;
    }
    h3 {
      font-size: 24px;
      font-weight: normal;
      color: #333;
      margin-bottom: 18px;
    }
    h4 {
      font-size: 32px;
      color: $main;
      margin-bottom: 12px;
    }
    span {
      color: #999;
      font-size: 24px;
    }
    .horizon-bar {
      background: #e4e4e4;
    }
    .retainage {
      color: $red;
    }
    .amount {
      text-align: right;
    }
  }
</style>
