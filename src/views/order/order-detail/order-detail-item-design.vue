
<template>
  <div class="order-detail-item-design" v-if="orderDetailStatus >= 2">
    <H2 title="上传设计方案"></H2>

    <div class="design-list">
      <ul>
        <li v-for="(item, idx) in designList"
          :key="idx">
          <img :src="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import H2 from "./order-detail-item-h2";
import { mapGetters } from "vuex";

export default {
  name: "OrderDetailItemContract",
  components: {
    H2
  },
  computed: {
    ...mapGetters(["designList", 'orderDetailStatus'])
  }
};
</script>

<style lang="scss">
.order-detail-item-design {
  background: #fff;
  padding: 0 e(36px);
  margin-bottom: e(16px);
  span {
    color: $main;
  }
  ul {
    display: flex;
    padding-top: e(22px);
    padding-bottom: e(36px);
  }
  li {
    flex: none;
    width: e(240px);
    height: e(160px);
    box-sizing: border-box;
    border: e(2px) solid #e5f2ff;
    border-radius: e(16px);
    margin-right: e(16px);
    margin-bottom: e(16px);
    position: relative;
    overflow: hidden;
  }
  img {
    width: auto;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.design-list {
  width: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
}
</style>
