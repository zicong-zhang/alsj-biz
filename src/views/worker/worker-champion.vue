<template>
  <div class="worker-sale-champion"
    @click="toRank">
    <h4>
      <img src="~~img/home/icon_workbench_champion@2x.png" />
      <span>本月销售冠军</span>
    </h4>
    <p v-if="nickname && amount !== 0">{{ (nickname || '').slice(0, 6) }} {{ amount / 1000 || '0.00' }}万</p>
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
  methods: {
    ...mapActions(["getCurrentMonthSaleChampion"]),
    init() {
      this.getCurrentMonthSaleChampion().then(res => {
        const data = res.data.rankBO;
        this.nickname = data ? data.nickname : "";
        this.amount = data ? data.amount : 0;
      });
    },
    toRank() {
      this.$utils.go({
        name: "sale-rank"
      });
    }
  }
};
</script>
<style lang="scss">
.worker-sale-champion {
  height: 80px;
  line-height: 80px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3399ff;
  font-size: 32px;
  padding: 0 36px;
  margin-bottom: 16px;
  h4 {
    font-weight: normal;
    font-size: 32px;
    display: flex;
    align-items: center;
  }
  img {
    width: auto;
    height: 32px;
    margin-right: 8px;
  }
  
}
</style>
