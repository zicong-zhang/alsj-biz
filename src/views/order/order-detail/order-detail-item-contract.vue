<template>
  <div class="order-detail-item-contract">
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
    ...mapGetters(["contractList"])
  }
};
</script>

<style lang="scss">
.order-detail-item-contract {
  background: #fff;
  padding: 0 r(36px);
  margin-bottom: r(16px);
  span {
    color: $main;
  }
  ul {
    display: flex;
    flex-flow: wrap;
    padding-top: r(22px);
    padding-bottom: r(36px);
  }
  li {
    width: r(160px);
    height: r(160px);
    box-sizing: border-box;
    border: r(2px) solid #E5F2FF;
    border-radius: r(16px);
    margin-right: r(16px);
    margin-bottom: r(16px);
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
</style>
