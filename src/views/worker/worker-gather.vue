<template>
  <div class="home-gather">
    <div @click="proceedsDetail(0)">
      <h3>{{ $utils.formatNum(receiptAmount, 4) }}</h3>
      <p>实收款(本月)&nbsp;
        <i class="iconfont icon-rightBtn"></i>
      </p>
    </div>
    <i class="vertical-bar"></i>
    <div @click="proceedsDetail(1)">
      <h3>{{ $utils.formatNum(dueAmount, 4) }}</h3>
      <p>待收款(全部)&nbsp;
        <i class="iconfont icon-rightBtn"></i>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "WorkerGather",
  data() {
    return {
      dueAmount: 0,
      receiptAmount: 0
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapState({
      storeId: state => state.root.storeId
    })
  },
  watch: {
    storeId() {
      this.init();
    }
  },
  methods: {
    ...mapActions([
      "getReceiptAmount", // 获取店铺实收款金额(本月)
      "getDueAmount" // 获取店铺待收款金额(全部)
    ]),
    init() {
      this.getReceiptAmount().then(res => {
        this.receiptAmount = res.data.totalAmount;
      });
      this.getDueAmount().then(res => {
        this.dueAmount = res.data.totalAmount;
      });
    },
    // 跳转收款详情 0：实收 1：待收
    proceedsDetail(label) {
      this.$utils.go({
        name: "proceeds-detail",
        query: {
          label: label === 0 ? 0 : 1
        }
      });
    }
  }
};
</script>
<style lang="scss">
.home-gather {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: r(122px);
  background: #fff;
  margin-bottom: r(16px);
  div {
    height: 100%;
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    i {
      position: absolute;
      right: r(-16px);
      top: 50%;
      transform: translateY(-50%);
      font-size: r(18px);
    }
  }
  h3 {
    font-size: r(32px);
    font-weight: normal;
    margin-bottom: r(12px);
  }
  p {
    font-size: r(20px);
    color: #999;
    position: relative;
  }
  .vertical-bar {
    height: r(54px);
    // background: rgba(0, 0, 0, 0.1);
  }
}
</style>
