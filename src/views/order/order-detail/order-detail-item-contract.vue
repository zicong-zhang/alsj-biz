<template>
  <div class="order-detail-item-contract" v-if="orderDetailStatus >= 3">
    <H2 title="定制合同">
      <p slot="right">如有疑问，
        <span>请联系客服</span>
      </p>
    </H2>

    <ul>
      <li v-for="(item, idx) in contractList"
        :key="idx">
        <img :src="item" />
      </li>
    </ul>
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
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["contractList", 'orderDetailStatus'])
  }
};
</script>

<style lang="scss">
.order-detail-item-contract {
  background: #fff;
  padding: 0 e(36px);
  margin-bottom: e(16px);
  span {
    color: $main;
  }
  ul {
    display: flex;
    flex-flow: wrap;
    padding-top: e(22px);
    padding-bottom: e(36px);
  }
  li {
    width: e(160px);
    height: e(160px);
    box-sizing: border-box;
    border: e(2px) solid #E5F2FF;
    border-radius: e(16px);
    margin-right: e(16px);
    margin-bottom: e(16px);
    position: relative;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .order-detail-item-h2 {
    p {
      font-size: e(24px);
      line-height: e(96px);
    }
  }
}
</style>
