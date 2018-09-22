<template>
  <div class="v-scroll-wrapper">
    <!-- 底部加载更多 -->
    <van-list v-model="listLoading"
      :immediate-check="false"
      :finished="disabledLoad"
      @load="handleLoadMore">

      <!-- 下拉刷新 -->
      <van-pull-refresh v-model="isPulldownLoading"
        :head-height="loadingHeight"
        :disabled="disabledRefresh"
        @refresh="handleRefresh">

        <v-loading slot="normal"
          :autoplay="false"
          ref="loadingComponent" />
        <v-loading slot="pulling"
          :autoplay="false" />
        <v-loading slot="loosing"
          :autoplay="false" />
        <v-loading slot="loading"
          :play="true" />

        <div class="v-scroll-container">
          <slot></slot>
        </div>

        <!-- 下拉刷新占位 pull-refresh bug解决方案 -->
        <div v-show="isPulldownLoading"
          class="pull-refresh-placeholder"
          :style="{
            height: `${loadingHeight}px`
          }"></div>
      </van-pull-refresh>

      <!-- 列表底部 loading -->
      <v-loading slot="loading" />
      <!-- 到达底部文案 -->
      <div v-show="!enabled"
        class="v-scroll-list-finish-text">
        <p>到底啦~</p>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'v-scroll',
  props: {
    // 标记整个列表加载完成
    enabled: {
      type: Boolean,
      required: true
    },
    // 刷新事件
    onRefresh: {
      type: Function
    },
    // 加载事件
    onLoad: {
      type: Function
    }
  },
  data() {
    return {
      loadingHeight: 0, // loading 高度， 用于下拉时的占位
      listLoading: false, // 列表加载更多中。。。
      disabledLoad: false, // 列表完成加载，两个作用，禁止触发加载更多，标记整个列表加载完成
      isPulldownLoading: false, // 标记完成下拉刷新
      disabledRefresh: false // 禁止下拉刷新
    };
  },
  watch: {
    enabled(val) {

      if (val === this.disabledLoad) {
        this.disabledLoad = !val;
      }/*  else {
        this.$nextTick(() => {
          this.disabledLoad = false;
        })
      } */
    },
    disabledLoad(newVal) {
      console.log('disabledLoad:_____', newVal);
    }
  },
  created() {
    console.log('create...this.disabledLoad:_____', this.disabledLoad, this.enabled);
    this.disabledLoad = !this.enabled;
    this.disabledRefresh = !this.onRefresh;
  },
  mounted() {
    this.$nextTick(() => {
      this.loadingHeight = this.$refs.loadingComponent.$el.clientHeight;
    });
  },
  methods: {
    // 执行加载更多
    handleLoadMore() {
      console.log('this.disabledLoad:_____', this.disabledLoad);
      if (!this.disabledLoad && this.onLoad) {
        console.log('list:_____', 33333);
        this.disabledRefresh = true;
        this.onLoad()
          .then(res => {
            this.onRefresh && (this.disabledRefresh = false);
            this.onFinishLoadMore();
          })
          .catch(res => {
            this.onFinishLoadMore();
          });
      } else {
        this.onFinishLoadMore();
      }
    },
    // 完成加载更多
    onFinishLoadMore() {
      this.listLoading = false;
    },
    // 执行下拉刷新
    handleRefresh() {
      /**
       * 触发时
       * 记录当前时间
       *
       * 完成时
       * 判断时间差是否超过 2s
       * 如超过 - 关闭 loading
       * 未超过 - 根据剩余时间开 setTimeout
       */
      console.log(':_____', 'handleRefresh');
      if (this.onRefresh) {
        const now = Date.now();
        if (!this.disabledLoad) this.disabledLoad = true;
        console.log('2222:_____', 2222);
        this.onRefresh()
          .then(() => this.onFinishRefresh(now))
          .catch(() => this.onFinishRefresh(now, 'fail'));
      }
    },
    // 完成刷新
    onFinishRefresh(old, fail) {
      console.log('444444:_____', 444444);
      /* const dateGap = Date.now() - old;
      const minute = 600;
      const timeGap = minute - dateGap;

      if (timeGap > 0) {
        // 恢复下拉状态
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          this.isPulldownLoading = false;
        }, timeGap);

        this.finishRefreshInitStatus(timeGap + 500);
      } else {
        this.isPulldownLoading = false; */
      // this.finishRefreshInitStatus(timeGap);
      this.finishRefreshInitStatus();
      this.isPulldownLoading = false;
      if (this.enabled) this.disabledLoad = false;
      // }

      if (fail) console.warn('refresh fail');
    },
    // 完成刷新后初始化状态 动画结束后再开放加载更多
    finishRefreshInitStatus(timeout) {
      // let timer = setTimeout(() => {
      console.log('timeout:_____', this.enabled);
      //   clearTimeout(timer);
      //   timer = null;
      /* if (this.enabled) {
        this.$nextTick(() => {
          this.disabledLoad = false;
        })
        
      } */
      // }, 1000);
    }
  }
};
</script>
<style lang="scss">
.v-scroll-wrapper {
  height: 100%;
  // @include scroll(y);
  // .van-pull-refresh__track {
  //   height: 100%;
  // }
  .v-scroll-container {
    min-height: 100%;
  }
}
.van-pull-refresh__head {
  $h: 100px;
  height: $h;
  line-height: $h;
  top: -$h;
}
.van-list {
  height: 100%;
  @include scroll(y);
}
.v-scroll-list-finish-text {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 24px;
  color: #999;
}
</style>
