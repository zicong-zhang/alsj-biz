<template>
  <div class="proceeds-detail-item-actual-income">
    <Total
      :type="0"
      :month="month"
      :year="year"
      :total-amount="totalAmount"
      :online-amount="onlineAmount"
      :offline-amount="offlineAmount"
    />
    <List
      :type="0"
      :page="pageNum"
      :list="dataList"
      :load="getDataList"
      title="实收明细"
      @update-page-num="updatePageNum"
    />
  </div>
</template>

<script>
import Total from './proceeds-detail-item-total';
import List from './proceeds-detail-item-list';
import { mapActions } from 'vuex';

export default {
  name: 'proceeds-detail-item-actual-income',
  components: {
    Total,
    List
  },
  data() {
    return {
      month: 7,
      year: 2018,
      pageNum: 1,
      pageSize: 10,
      dataList: [],

      totalAmount: 0,
      onlineAmount: 0,
      offlineAmount: 0
    }
  },
  created() {
    /* const current = this.$utils.getDate('current');
    Object.assign(this.$data, current); */
    this.getActualIncome();
  },
  methods: {
    ...mapActions([
      // 获取实收列表
      'getActualIncomeList',
      // 获取店铺实收款金额
      'getReceiptAmount'
    ]),
    getActualIncome() {
      const date = `${this.year}/${this.month}`;
      this.getReceiptAmount(date)
        .then(res => Object.assign(this.$data, res.data))
    },
    getDataList() {
      return this.getActualIncomeList({
        month: this.month,
        year: this.year,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
    },
    updatePageNum(init) {
      init ? this.pageNum = 1 : this.pageNum++;
    }
  }
}
</script>

<style lang="scss">
.proceeds-detail-item-actual-income {
}
</style>
