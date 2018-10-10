<template>
  <div class="order-detail-item-house-type">
    <div class="no-type"
      key="no-type"
      v-if="showType"
      @click="toEditHouseType">
      <h3>添加户型信息,方便后续工作跟进</h3>
      <i class="iconfont icon-btn_all_next"></i>
    </div>

    <div class="has-type"
      key="has-type"
      v-else>
      <H2 :title="title"
        @click="toEditHouseType">
        <i class="iconfont icon-btn_all_next"></i>
      </H2>
      <ul>
        <v-cell label="所在小区"
          align="left"
          :value="orderInfo.linkmanResidence || '无'" />
        <v-cell label="户型"
          align="left"
          :value="orderInfo.linkmanHouseType  || '无'" />
        <v-cell label="面积"
          align="left"
          :value="orderInfo.measurement ?  `${orderInfo.measurement} ㎡` : '无'" />
      </ul>
    </div>
  </div>
</template>

<script>
import H2 from './order-detail-item-h2';
import { mapGetters } from 'vuex';

export default {
  name: 'OrderDetailItemHouseType',
  components: {
    H2
  },
  data() {
    return {
      title: '户型信息'
    };
  },
  computed: {
    ...mapGetters(['orderInfo']),
    showType() {
      const {
        linkmanResidence,
        linkmanHouseType,
        measurement
      } = this.orderInfo;
      return !linkmanResidence && !linkmanHouseType && !measurement;
    }
  },
  methods: {
    toEditHouseType() {
      this.$utils.go({
        name: 'order-edit-house-type'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.order-detail-item-house-type {
  background: #fff;
  padding: 0 e(36px);
  margin-bottom:e(16px);
  ul {
    padding-top:e(22px);
    padding-bottom:e(36px);
  }
}
.no-type {
  height:e(94px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size:e(24px);
    font-weight: normal;
    color: #333;
    padding-left:e(14px);
    position: relative;
    &:before {
      content: "";
      display: block;
      width:e(4px);
      height:e(24px);
      background: #333;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  i {
    font-size:e(22px);
    color: #c7c7c7;
  }
}
</style>
