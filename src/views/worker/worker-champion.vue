<template>
  <div class="worker-sale-champion" @click="toRank">
    <h4>
      <i class="iconfont icon-btn_case_collectionP"></i>本月销售冠军</h4>
    <p v-if="nickname && amount !== 0">{{ nickname }} {{ amount / 1000 || '0.00' }}万</p>
    <p v-else>暂无</p>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "WorkerChampion",
  data() {
    return {
      nickname: "",
      amount: 0
    };
  },
  computed: {
    ...mapState({
      storeId: state => state.root.storeId
    })
  },
  watch: {
    storeId(newVal) {
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["getCurrentMonthSaleChampion"]),
    init() {
      this.getCurrentMonthSaleChampion().then(res => {
        const data = res.data.rankBO;
          this.nickname = data ? data.nickname : '';
          this.amount = data ? data.amount : 0;
      });
    },
    toRank() {
      this.$utils.go(this, {
        name: 'sale-rank'
      })
    }
  }
};
</script>
<style lang="scss">
.worker-sale-champion {
  height: r(80px);
  line-height: r(80px);
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3399ff;
  font-size: r(32px);
  padding: 0 r(36px);
  margin-bottom: r(16px);
  h4 {
    font-weight: normal;
    font-size: r(32px);
  }
  i {
    font-size: r(30px);
    margin-right: r(8px);
  }
}
</style>
