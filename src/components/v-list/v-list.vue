<template>
  <div class="v-scroll"
    ref="scrollDom">

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

      <slot/>

      <!-- 下拉刷新占位 pull-refresh bug解决方案 -->
      <div v-show="isPulldownLoading"
        class="pull-refresh-placeholder"
        :style="{
            height: `${loadingHeight}px`
          }"></div>

      <div v-show="loading || !enabled"
        class="v-scroll-bottom">
        <v-loading v-show="loading" />
        <slot name="bottom">
          <p class="v-scroll-bottom-txt"
            v-show="!enabled">到底啦~</p>
        </slot>
      </div>
    </van-pull-refresh>

  </div>
</template>
<script>
export default {
  name: 'v-scroll',
  props: {
    bottom: {
      type: Number,
      default: 300
    },
    onRefresh: {
      type: Function
    },
    onLoad: {
      type: Function
    },
    enabled: Boolean
  },
  watch: {
    enabled(newVal) {
      console.log('newVal:_____', newVal);
      this.finished = !newVal;
    }
  },
  data() {
    return {
      bind: false, // 绑定 / 解绑 滚动监听
      loadingHeight: 0, // loading 高度， 用于下拉时的占位
      loading: false, // 加载更多
      finished: false, // 列表完成加载，两个作用，禁止触发加载更多，标记整个列表加载完成
      isPulldownLoading: false, // 标记完成下拉刷新
      disabledRefresh: false // 禁止下拉刷新
    };
  },
  computed: {
    scrollDom() {
      return this.$refs.scrollDom;
    }
  },
  mounted() {
    this.loadingHeight = this.$refs.loadingComponent.$el.clientHeight;
    this.bindHandle(true);
    this.bind = true;
  },
  beforeDestroy() {
    this.bindHandle(false);
  },
  activated() {
    this.bindHandle(true);
  },
  deactivated() {
    this.bindHandle(false);
  },
  methods: {
    // 触发下拉刷新
    handleRefresh() {
      this.finished = true;
      const now = Date.now();
      this.$nextTick(() => { // 用于解决 子组件更新父组件传递的 props 时，数据未及时更新，如 pageNum
        this.onRefresh()
          .then(() => {
            console.log('开始刷新');
            this.onFinishRefresh(now);
          })
          .catch(() => {
            console.log('刷新失败');
            this.onFinishRefresh(now);
          });
      })
    },
    // 完成下拉刷新
    onFinishRefresh(old) {
      const dateGap = Date.now() - old;
      const minute = 600;
      const timeGap = minute - dateGap;

      if (timeGap > 0) {
        // 恢复下拉状态
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          this.isPulldownLoading = false;
        }, timeGap);
        this.closeRefreshLoading(timeGap + 500);
      } else {
        this.isPulldownLoading = false;
        this.closeRefreshLoading(timeGap + 500);
      }
    },
    closeRefreshLoading(timeout) {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;

        if (this.enabled) this.finished = false;
      }, timeout);
    },
    // 滚动监听
    bindHandle(bind) {
      if (this.bind !== bind) {
        this.bind = bind;
        this.scrollDom[bind ? 'addEventListener' : 'removeEventListener']('scroll', this.scroll);
      }
    },
    // 触发滚动
    scroll(e) {
      if (this.loading || this.finished || this.isPulldownLoading) {
        console.log('无法加载更多');
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const targetBottom = scrollHeight - scrollTop - clientHeight;
      const reachBottom = targetBottom < this.bottom;

      // 到达底部
      if (reachBottom) {
        this.loading = true;
        this.disabledRefresh = true;
        this.onLoad()
          .then(() => this.finishLoad())
          .catch(() => this.finishLoad());
      }
    },
    // 加载更多 事件完成
    finishLoad() {
      this.loading = false;

      if (this.onRefresh) this.disabledRefresh = false;
    }
  }
};
</script>
<style lang="scss">
.v-scroll {
  height: 100%;
  @include scroll(y);
}
.v-scroll-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
}
.v-scroll-bottom-txt {
  line-height: 100px;
  text-align: center;
  font-size: 24px;
  color: #999;
}
.van-pull-refresh {
  height: 100%;
}
</style>
