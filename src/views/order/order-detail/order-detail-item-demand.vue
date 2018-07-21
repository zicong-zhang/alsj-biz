<template>
  <div class="order-detail-item-demand">

    <!-- 没有需求数据 -->
    <div class="no-demand"
      v-if="list.length === 0"
      key="no-demand"
      @click="showDemandPicker">
      <h3>选择客户的定制需求</h3>
      <i class="iconfont icon-btn_all_next"></i>
    </div>

    <!-- 有需求数据 -->
    <div class="has-demand"
      key="has-demand"
      v-else>
      <H2 :title="title"
        @click="showDemandPicker">
        <i class="iconfont icon-btn_all_next"></i>
      </H2>
      <ul>
        <li class="demand-function-list"
          v-for="item in list"
          :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import H2 from "./order-detail-item-h2";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "OrderDetailItemDemand",
  components: {
    H2
  },
  data() {
    return {
      title: "定制需求",
      list: []
    };
  },
  computed: {
    ...mapGetters(["demands"])
  },
  watch: {
    demands(val) {
      this.$set(this.$data, "list", val);
    }
  },
  created() {},
  methods: {
    ...mapMutations(['SHOW_DEMAND_PICKER']),
    showDemandPicker() {
      this.SHOW_DEMAND_PICKER();
    }
  }
};
</script>
<style lang="scss">
.order-detail-item-demand {
  background: #fff;
  padding: 0 e(36px);
  margin-bottom: e(16px);
}
.has-demand {
  ul {
    display: flex;
    flex-flow: wrap;
    padding-top: e(22px);
    padding-bottom: e(36px);
  }
}
.demand-function-list {
  color: #3380cc;
  font-size: e(24px);
  line-height: e(64px);
  background: #e5f2ff;
  border-radius: e(8px);
  padding: 0 e(36px);
  margin-right: e(16px);
  margin-bottom: e(16px);
}
.no-demand {
  height: e(94px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: e(24px);
    font-weight: normal;
    color: #333;
    padding-left: e(14px);
    position: relative;
    &:before {
      content: "";
      display: block;
      width: e(4px);
      height: e(24px);
      background: #333;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  i {
    font-size: e(22px);
    color: #c7c7c7;
  }
}
</style>
