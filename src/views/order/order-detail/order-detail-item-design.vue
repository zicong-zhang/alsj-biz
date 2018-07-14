
<template>
  <div class="order-detail-item-design">
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
    ...mapGetters(["designList"])
  }
};
</script>

<style lang="scss">
.order-detail-item-design {
  background: #fff;
  padding: 0 r(36px);
  margin-bottom: r(16px);
  span {
    color: $main;
  }
  ul {
    display: flex;
    padding-top: r(22px);
    padding-bottom: r(36px);
  }
  li {
    flex: none;
    width: r(240px);
    height: r(160px);
    box-sizing: border-box;
    border: r(2px) solid #e5f2ff;
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
.design-list {
  width: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
}
</style>
