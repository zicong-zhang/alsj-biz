<template>
  <div class="proceeds-detail-header">
    <span @click="back">
      <i class="iconfont icon-back"></i>
    </span>
    <ul class="tab">
      <li :class="{active: activeTab == 0}"
        @click="changeTab(0)">
        <h2>实收</h2>
      </li>
      <li :class="{active: activeTab == 1}"
        @click="changeTab(1)">
        <h2>待收</h2>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'proceeds-detail-item-header',
  data() {
    return {
      activeTab: 0,
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === this.$route.name && from.name === 'worker') {
        this.init();
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.activeTab = this.$route.query.label;
    },
    back() {
      this.$store.commit('TURN', 'off');
      this.$router.back();
    },
    changeTab(idx) {
      if (idx === this.activeTab) return;
      this.activeTab = idx;
    },
  },
};
</script>
<style lang="scss">
.proceeds-detail-header {
  height: 88px;
  background: #fff;
  position: relative;
  span {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100px;
    height: 88px;
    line-height: 88px;
    padding-left: 36px;
  }
  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  li {
    display: flex;
    justify-content: center;
    height: 88px;
    line-height: 88px;
    padding: 0 50px;
  }
  h2 {
    font-size: 32px;
    color: #333;
    line-height: 88px;
  }
  .active {
    h2 {
      color: $main;
      font-weight: bold;
      border-bottom: 4px solid $main;
    }
  }
}
</style>
