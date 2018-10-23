<template>
  <div class="proceeds-detail">
    <tab-header />
    <div class="container">
      <actual-income :class="{
        module: true,
        show: showModule == 0
      }" />
      <wait-income :class="{
        module: true,
        show: showModule == 1
      }" />
    </div>
  </div>
</template>

<script>
import TabHeader from './proceeds-detail-item-header';
import ActualIncome from './proceeds-detail-item-actual-income';
import WaitIncome from './proceeds-detail-item-wait-income';
import { mapGetters } from 'vuex';

export default {
  name: 'proceeds-detail',
  components: {
    TabHeader,
    ActualIncome,
    WaitIncome
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['showModule'])
  },
  methods: {}
};
</script>
<style lang="scss">
  .proceeds-detail {
    .container {
      position: relative;
      height: calc(100% - 88px);
    }
    .module {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transform: translate3d(-150%, 0, 0);
    }
    .show {
      transform: translate3d(0, 0, 0);
    }
  }
</style>
