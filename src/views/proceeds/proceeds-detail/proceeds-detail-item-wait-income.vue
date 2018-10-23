<template>
  <div class="proceeds-detail-item-wait-income">
    <Total />
    <List
      :type="1"
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
      pageSize: 10
    };
  },
  methods: {
    ...mapActions([
      // 获取待收列表
      'getWaitIncomeList'
    ]),
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
