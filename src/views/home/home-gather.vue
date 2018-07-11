<template>
  <div class="home-gather">
    <div @click="toActualGather">
      <h3>8.9万</h3>
      <p>实收款(本月)&nbsp;
        <i class="iconfont icon-rightBtn"></i>
      </p>
    </div>
    <i class="vertical-bar"></i>
    <div @click="toWaitGather">
      <h3>8.9万</h3>
      <p>待收款(全部)&nbsp;
        <i class="iconfont icon-rightBtn"></i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeGather",
  data() {
    return {};
  },
  methods: {
    toActualGather() {
      this.$router.push({
        name: ""
      });
    },
    toWaitGather() {
      this.$router.push({
        name: ""
      });
    }
  }
};
</script>
<style lang="scss">
.home-gather {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: r(122px);
  background: #fff;
  margin-bottom: r(16px);
  div {
    height: 100%;
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    i {
      position: absolute;
      right: r(-16px);
      top: 50%;
      transform: translateY(-50%);
      font-size: r(18px);
    }
  }
  h3 {
    font-size: r(32px);
    font-weight: normal;
    margin-bottom: r(12px);
  }
  p {
    font-size: r(20px);
    color: #999;
    position: relative;
  }
  .vertical-bar {
    height: r(54px);
    // background: rgba(0, 0, 0, 0.1);
  }
}
</style>
