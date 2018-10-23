<template>
  <li class="proceeds-detail-item-list-item">
    <i class="horizon-bar"></i>
    <div>
      <div class="description">
        <h3>收到({{ item.customerName }}) {{ item.remark }}</h3>
        <span>{{ (item.payDate || '').slice(5, 10) }}</span>
      </div>
      <div class="amount">
        <h4 class="retainage">+{{ item.amount | money }}</h4>
        <span>{{ item.staffName }}跟进</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'proceeds-detail-item-list-item',
  props: {
    item: Object
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
