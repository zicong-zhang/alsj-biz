<template>
  <header class="home-header">
    <span class="btn"
      @click="set">
      <i class="icon i-user"></i>
    </span>
    <div class="title"
      @click="showPop">
      <h2 class="show-pop">{{ storeInfo.merchantName }}
        <i class="icon i-bottom"></i>
      </h2>
      <p>
        <span>店铺评分 {{ storeInfo.grade }}分</span>
        <i class="vertical-bar"></i>
        <span>关注人数 {{ storeInfo.merchantFollowCount }}</span>
      </p>
      <store-list v-show="isShowPop"
        :list="myStoreList"
        @select="switchStore" />
      <!-- <v-popup v-show="isShowPop"
        :list="myStoreList"
        :text-one="'merchantExt'"
        :text-two="'merchantName'"
        @select="switchStore" /> -->
    </div>
    <span class="btn"
      @click="toTest">
      <i class="icon i-shezhi"></i>
    </span>
  </header>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import storeList from './worker-header-item-store-picker';

export default {
  name: 'HomeHeader',
  components: {
    storeList
  },
  data() {
    return {
      isShowPop: false
    };
  },
  computed: {
    ...mapGetters([
      'storeInfo', // 店铺信息
      'myStoreList' // 我的所有店铺列表
    ])
  },
  methods: {
    ...mapActions(['getStoreInfo']),
    ...mapMutations(['SET_STORE_ID']),
    set() {
      localStorage.setItem(
        'USER_TOKEN',
        'VE9LRU4tMzYyLTE1NDA4NjU2MDQ5MTctYWJj',
      );
    },
    showPop() {
      this.isShowPop = !this.isShowPop;
    },
    // 切换店铺
    switchStore(item, idx) {
      this.isShowPop = false;

      this.SET_STORE_ID(item.merchantExt.id);
      this.$utils.setSession('STORE_TOKEN', item.token);

      this.getStoreInfo();
    },
    toTest() {
      this.$utils.go({
        name: 'test-pulldown'
      });
    }
  }
};
</script>
<style lang="scss">
.home-header {
  -webkit-box-flex: 1;
  flex: none;
  height: 112px;
  flex: none;
  display: flex;
  justify-content: space-between;
  align-self: auto;
  background: #fff;
  .title {
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    position: relative;
    h2 {
      font-size: 32px;
      margin-bottom: 14px;
      position: relative;
    }
    i {
      display: inline-block;
      height: 16px;
      font-size: 24px;
    }
    p {
      width: 100%;
      font-size: 20px;
      color: #999;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    span {
      flex: 1;
      display: inline-block;
      &:first-child {
        text-align: right;
        margin-right: 16px;
      }
      &:last-child {
        text-align-last: left;
        margin-left: 16px;
      }
    }
  }
  .btn {
    display: block;
    line-height: 112px;
    padding: 0 36px;
    &:last-child {
      left: auto;
      right: 0;
    }
    i {
      font-size: 44px;
    }
  }
  .v-popup {
    ul {
      left: 50%;
      transform: translate(-50%, 100%);
    }
  }
}
</style>
