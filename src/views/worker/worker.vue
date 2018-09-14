<template>
  <div class="view-worker">
    <WorkerHeader />

    <div class="content">
      <WorkerTips v-if="false" />
      <i class="gap"></i>
      <WorkerGather />
      <WorkerChampion />
      <WorkerSaleTarget />
      <WorkerActions />
    </div>
  </div>
</template>


<script>
import { mapActions, mapMutations } from "vuex";
import WorkerHeader from "./worker-header";
import WorkerTips from "./worker-tips";
import WorkerGather from "./worker-gather";
import WorkerChampion from "./worker-champion";
import WorkerSaleTarget from "./worker-sale-target";
import WorkerActions from "./worker-actions";

export default {
  name: "Worker",
  components: {
    WorkerHeader,
    WorkerTips,
    WorkerGather,
    WorkerChampion,
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
      this["SET_STORE_ID"](first.merchantExt.id);
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
    @include scroll(y);
  }
}

</style>
