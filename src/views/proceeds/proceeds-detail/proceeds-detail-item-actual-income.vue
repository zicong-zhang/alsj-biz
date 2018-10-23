<template>
  <div class="proceeds-detail-item-actual-income">
    <Total/>
    <List
      :type="0"
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
      dataList: []
    }
  },
  created() {
    /* const current = this.$utils.getDate('current');
    Object.assign(this.$data, current); */
  },
  methods: {
    ...mapActions([
      // 获取实收列表
      'getActualIncomeList'
    ]),
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
