<template>
  <div class="proceeds-detail-item-wait-income">
    <Total
      :type="1"
      :total-amount="totalAmount"
      :online-amount="onlineAmount"
      :offline-amount="offlineAmount"
    />
    <List
      :type="1"
      :page="pageNum"
      :list="dataList"
      :load="getDataList"
      title="待收明细"
      @update-page-num="updatePageNum"
    />
  </div>
</template>

<script>
import Total from './proceeds-detail-item-total';
import List from './proceeds-detail-item-list';
import { mapActions } from 'vuex';

export default {
  name: 'proceeds-detail-item-wait-income',
  components: {
    Total,
    List
  },
  data() {
    return {
      dataList: [],
      pageNum: 1,
      pageSize: 15,

      totalAmount: 0,
      onlineAmount: 0,
      offlineAmount: 0
    };
  },
  created() {
    this.getWaitIncome();
  },
  methods: {
    ...mapActions([
      // 获取待收列表
      'getWaitIncomeList',
      // 获取店铺待收款金额(全部)
      'getDueAmount'
    ]),
    getWaitIncome() {
      this.getDueAmount()
        .then(res => Object.assign(this.$data, res.data))
    },
    getDataList() {
      return this.getWaitIncomeList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
    },
    updatePageNum(init) {
      init ? (this.pageNum = 1) : this.pageNum++;
    }
  }
};
</script>

<style lang="scss">
  .proceeds-detail-item-wait-income {
  }
</style>
