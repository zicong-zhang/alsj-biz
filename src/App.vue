<template>
  <div id="app"
    v-cloak>
    <p v-if="isShowOfflineTip"
      class="offline-tip">
      <i class="icon i-jingshigantanhao"></i>
      <span>网络异常，请检查网络设置</span>
    </p>
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

export default {
  name: 'App',
  data() {
    return {
      isShowOfflineTip: false,
      // 排除缓存
      exclude: [
        'OrderEditCustomer', // 编辑客户信息
        'EditHouseType', // 编辑户型信息
        'OrderDetail', // 订单详情
        'EditContract', // 录入合同信息
        'sale-champion', // 销售排行榜
        'performance-target', // 业绩目标
        'view-customer-info', // 客户详情
        'view-edit-create-order' // 开单
      ]
    };
  },
  computed: {
    ...mapState({
      storeId: state => state.root.storeId,
      turn: state => state.root.turn
    })
  },
  created() {
    // 18600000001
    // 18102765281
    // 15812345678 12345678
    localStorage.setItem('USER_TOKEN', 'VE9LRU4tMjg3LTE1NDUyMDMwMDgyNTktYWJj');
    // localStorage.setItem('USER_TOKEN', 'VE9LRU4tMzYyLTE1MzY5MjczMTgyNzctYWJj');
    // localStorage.setItem(
    //     "USER_TOKEN",
    //     "VE9LRU4tMjg3LTE1MzU3MTc5OTc2MzMtYWJj"
    //   );
    this.listenNetwork();
    this.setMuiBack();
    this.judgeSessionHasStoreId();
  },
  mounted() {
    /* setTimeout(() => {
      window.location.href = 'http://test.alasga.cn/pro/proxy/web/web/pages/product/product_detail.html?id=68'
    }, 4000); */
  },
  methods: {
    ...mapMutations(['SET_STORE_ID', 'TURN']),
    back() {
      this.$utils.back();
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
    listenNetwork() {
      window.addEventListener(
        'online',
        () => {
          this.isShowOfflineTip = false;
        },
        false,
      );

      window.addEventListener(
        'offline',
        () => {
          this.isShowOfflineTip = true;
        },
        false,
      );
    }
  }
};
</script>

<style lang="scss">
.offline-tip {
  position: fixed;
  top: 104px;
  left: 50%;
  z-index: 122;
  transform: translate3d(-50%, 0, 0);
  width: calc(100% - 72px);
  height: 80px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 8px;
  background: #e5f2ff;
  color: #3380cc;
  font-size: 24px;
  padding: 0 32px;
  .icon {
    font-size: 28px;
    margin-right: 20px;
  }
}
</style>

