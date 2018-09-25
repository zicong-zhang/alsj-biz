<template>
  <div id="app"
    v-cloak>
    <transition :name="turn"
      @after-enter="setBackAnimation">
      <keep-alive :exclude="exclude">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import store from '~/vuex/store';

export default {
  name: 'App',
  data() {
    return {
      // 排除缓存
      exclude: [
        'OrderEditCustomer', // 编辑客户信息
        'EditHouseType', // 编辑户型信息
        'OrderDetail', // 订单详情
        'EditContract', // 录入合同信息
        'sale-champion', // 销售排行榜
        'performance-target', // 业绩目标
        'view-customer-info', // 客户详情
        'view-edit-create-order', // 开单
      ],
    };
  },
  computed: {
    ...mapState({
      storeId: state => state.root.storeId,
      turn: state => state.root.turn,
    }),
  },
  created() {
    // 18600000001
    // 18102765281
    localStorage.setItem('USER_TOKEN', 'VE9LRU4tMzYyLTE1MzY5MjczMTgyNzctYWJj');
    // localStorage.setItem('USER_TOKEN', 'VE9LRU4tMzYyLTE1MzY5MjczMTgyNzctYWJj');
    // localStorage.setItem(
    //     "USER_TOKEN",
    //     "VE9LRU4tMjg3LTE1MzU3MTc5OTc2MzMtYWJj"
    //   );
    this.setMuiBack();
    this.judgeSessionHasStoreId();
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['SET_STORE_ID', 'TURN']),
    back() {
      this.$store.commit('TURN', 'off');
      this.$router.back(-1);
    },
    setMuiBack() {
      mui.back = this.back;
    },
    setBackAnimation() {
      if (this.turn && this.turn != 'off') {
        this.TURN('off');
      }
    },
    judgeSessionHasStoreId() {
      if (!this.storeId) {
        const storageStoreId = window.sessionStorage.getItem('STORE_ID');
        if (storageStoreId) {
          this.SET_STORE_ID(storageStoreId);
        } else {
          this.SET_STORE_ID(4425);
        }
        /* else {
          this.$utils.go({
            name: 'home'
          });
        } */
      }
    },
  },
};
</script>

<style>
</style>
