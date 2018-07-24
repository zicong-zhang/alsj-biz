<template>
  <div class="order-detail-item-demand">

    <!-- 没有需求数据 -->
    <div class="no-demand"
      v-if="demands ? demands.length === 0 : false"
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
          v-for="item in demands"
          :key="item.id">{{ item.name }}</li>
      </ul>
    </div>

    <Picker :show="isShowPicker" @close="isShowPicker = false"/>
  </div>
</template>

<script>
import H2 from "./order-detail-item-h2";
import Picker from './order-detail-item-demand-picker';
import { mapGetters } from "vuex";

export default {
  name: "OrderDetailItemDemand",
  components: {
    H2,
    Picker
  },
  data() {
    return {
      title: "定制需求",
      list: [],
      isShowPicker: false
    };
  },
  computed: {
    ...mapGetters(["demands"])
  },
  created() {},
  methods: {
    showDemandPicker() {
      this.isShowPicker = true;
    }
  }
};
</script>
<style lang="scss">
.order-detail-item-demand {
  background: #fff;
  padding: 0 36px;
  margin-bottom: 16px;
}
.has-demand {
  ul {
    display: flex;
    flex-flow: wrap;
    padding-top: 22px;
    padding-bottom: 36px;
  }
}
.demand-function-list {
  color: #3380cc;
  font-size: 24px;
  line-height: 64px;
  background: #e5f2ff;
  border-radius: 8px;
  padding: 0 36px;
  margin-right: 16px;
  margin-bottom: 16px;
}
.no-demand {
  height: 94px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 24px;
    font-weight: normal;
    color: #333;
    padding-left: 14px;
    position: relative;
    &:before {
      content: "";
      display: block;
      width: 4px;
      height: 24px;
      background: #333;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  i {
    font-size: 22px;
    color: #c7c7c7;
  }
}
</style>
