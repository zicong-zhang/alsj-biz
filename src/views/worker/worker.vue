<template>
  <div class="worker">
    <WorkerHeader />

    <div class="content">
      <WorkerTips />
      <WorkerGather/>
      <div class="sale-champion">
        <h4>
          <i class="iconfont icon-btn_case_collectionP"></i>本月销售冠军</h4>
        <p>张三丰 6.3万</p>
      </div>
      <WorkerSaleTarget/>
      <WorkerActions/>
    </div>
  </div>
</template>


<script>
import { mapActions, mapMutations } from "vuex";
import WorkerHeader from "./worker-header";
import WorkerTips from "./worker-tips";
import WorkerGather from "./worker-gather";
import WorkerSaleTarget from "./worker-sale-target";
import WorkerActions from "./worker-actions";

export default {
  name: "Worker",
  components: {
    WorkerHeader,
    WorkerTips,
    WorkerGather,
    WorkerSaleTarget,
    WorkerActions
  },
  data() {
    return {
      title: "阿拉私家",
      showBack: false
    };
  },
  created() {
    this.getSelfStoreList().then(list => {
      const first = list[0];
      this.$utils.setSession("STORE_TOKEN", first.token);
      this['SET_STORE_ID'](first.merchantExt.id);
      this.getStoreInfo();
    });
  },
  methods: {
    ...mapActions([
      "getStoreInfo", // 获取店铺信息
      "getSelfStoreList" // 获取该账号下的所有店铺
    ]),
    ...mapMutations([
      "SET_STORE_ID" // 设置店铺id
    ])
  }
};
</script>
<style lang="scss">
.view-worker {
  display: flex;
  flex-flow: column;
  background: #f0f4f7;
  .content {
    flex: 1;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
  }
}
.sale-champion {
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
