<template>
  <div class="order-detail-item-house-type">
    <div class="no-type"
      key="no-type"
      v-if="showType">
      <h3>添加户型信息,方便后续工作跟进</h3>
      <i class="iconfont icon-btn_all_next"></i>
    </div>

    <div class="has-type"
      key="has-type"
      v-else>
      <H2 :title="title">
        <i class="iconfont icon-btn_all_next"></i>
      </H2>
      <ul>
        <VInfoList label="所在小区"
          align="left"
          :value="info.linkmanResidence || '无'" />
        <VInfoList label="户型"
          align="left"
          :value="info.linkmanHouseType  || '无'" />
        <VInfoList label="面积"
          align="left"
          :value="info.measurement ?  `${info.measurement} ㎡` : '无'" />
      </ul>
    </div>
  </div>
</template>

<script>
import H2 from "./order-detail-item-h2";
import { mapState } from "vuex";

export default {
  name: "OrderDetailItemHouseType",
  components: {
    H2
  },
  data() {
    return {
      title: "户型信息"
    };
  },
  computed: {
    ...mapState({
      info: state => state.OrderDetailModule.orderInfo
    }),
    showType() {
      let {
        linkmanResidence,
        linkmanHouseType,
        measurement
      } = this.info;
      return !linkmanResidence && !linkmanHouseType && !measurement
    }
  }
};
</script>

<style lang="scss" scoped>
.order-detail-item-house-type {
  background: #fff;
  padding: 0 r(36px);
  margin-bottom: r(16px);
  ul {
    padding-top: r(22px);
    padding-bottom: r(36px);
  }
}
.no-type {
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
