<template>
  <div class="proceeds-detail-header">
    <span @click="back">
      <i class="icon i-back"></i>
    </span>
    <ul class="tab">
      <li :class="{active: showModule == 0}"
        @click="changeTab(0)">
        <h2>实收</h2>
      </li>
      <li :class="{active: showModule == 1}"
        @click="changeTab(1)">
        <h2>待收</h2>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'proceeds-detail-item-header',
  computed: {
    ...mapGetters(['showModule'])
  },
  activated() {
    this.init();
  },
  methods: {
    ...mapMutations([
      // 收款详情
      'UPDATE_PROCEEDS_SHOW_MODULE'
    ]),
    init() {
      this.UPDATE_PROCEEDS_SHOW_MODULE(this.$route.query.label);
    },
    back() {
      this.$utils.back();
    },
    changeTab(idx) {
      if (idx === this.activeTab) return;

      this.UPDATE_PROCEEDS_SHOW_MODULE(idx);
    }
  }
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
  .iconfont {
    font-size: 28px;
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
