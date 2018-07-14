<template>
  <div class="order-detail-item-demand">
    <!-- 没有需求数据 -->
    <div class="no-demand"
      v-if="list.length === 0"
      key="no-demand">
      <h3>选择客户的定制需求</h3>
      <i class="iconfont icon-btn_all_next"></i>
    </div>

    <!-- 有需求数据 -->
    <div class="has-demand"
      key="has-demand"
      v-else>
      <H2 :title="title">
        <i class="iconfont icon-btn_all_next"></i>
      </H2>
      <ul>
        <li v-for="item in list"
          :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import H2 from "./order-detail-item-h2";
import { mapGetters } from "vuex";

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
      this.$set(this.$data, 'list', val);
      console.log('val:_____', val);
    }
  },
  created() {
  }
};
</script>
<style lang="scss">
.order-detail-item-demand {
  background: #fff;
  padding: 0 r(36px);
  margin-bottom: r(16px);
  ul {
    display: flex;
    flex-flow: wrap;
    padding-top: r(22px);
    padding-bottom: r(36px);
  }
  li {
    color: #3380cc;
    font-size: r(24px);
    line-height: r(64px);
    background: #e5f2ff;
    border-radius: r(8px);
    padding: 0 r(36px);
    margin-right: r(16px);
    margin-bottom: r(16px);
  }
}
.no-demand {
  height: r(94px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: r(24px);
    font-weight: normal;
    color: #333;
    padding-left: r(14px);
    position: relative;
    &:before {
      content: "";
      display: block;
      width: r(4px);
      height: r(24px);
      background: #333;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  i {
    font-size: r(22px);
    color: #c7c7c7;
  }
}
</style>
