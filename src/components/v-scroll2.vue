<template>
  <div class="scroll-wrapper">
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

      <!-- 底部加载更多 -->
      <van-list v-model="listLoading"
        :immediate-check="false"
        :finished="loadFinish"
        @load="handleLoadMore">
        <slot>
        </slot>
        <v-loading slot="loading" />
      </van-list>

      <!-- 下拉刷新占位 pull-refresh bug解决方案 -->
      <div v-show="isPulldownLoading"
        class="pull-refresh-placeholder"
        :style="{
            height: `${loadingHeight}px`
          }"></div>
    </van-pull-refresh>
  </div>
</template>

<script>
/**
 * TODO
 * 整个列表加载完成时，添加 “已到达底部”
 */
export default {
  name: 'v-scroll',
  model: {
    prop: 'loadFinish',
    event: 'endLoadMore'
  },
  props: {
    loadFinish: {
      type: [Boolean],
      required: true
    },
    onRefresh: {
      type: Function
    },
    onLoad: {
      type: Function
    }
  },
  data() {
    return {
      loadingHeight: 0, // loading 高度， 用于下拉时的占位
      listLoading: false, // 列表加载更多中。。。
      listFinished: false, // 列表完成加载，两个作用，禁止触发加载更多，标记整个列表加载完成
      isPulldownLoading: false, // 标记完成下拉刷新
      disabledRefresh: false // 禁止下拉刷新
    };
  },
  created() {
    this.disabledRefresh = !this.onRefresh
  },
  mounted() {
    this.$nextTick(() => {
      this.loadingHeight = this.$refs.loadingComponent.$el.clientHeight;
    });
  },
  methods: {
    handleLoadMore() {
      if (!this.loadFinish && this.onLoad) {
        console.log('list:_____', 33333);
        this.disabledRefresh = true;
        this.onLoad()
          .then((res) => {
            console.log('111:_____', res);
            this.onRefresh && (this.disabledRefresh = false);
            this.onFinishLoadMore();
          })
          .catch((res) => {
            console.log('res:_____', res);
            this.onFinishLoadMore();
            this.$emit('endLoadMore', true);
          });
      }
    },
    onFinishLoadMore() {
      this.listLoading = false;
    },
    handleRefresh() {
      if (this.onRefresh) {
        console.log('2222:_____', 2222);
        this.$emit('endLoadMore', true);
        this.onRefresh()
          .then(() => this.onFinishRefresh())
          .catch(() => this.onFinishRefresh());
      }
    },
    onFinishRefresh() {
      this.isPulldownLoading = false;
      this.$emit('endLoadMore', false);
    }
  }
};
</script>
<style lang="scss" scoped>
.scroll-wrapper {
  height: 100%;
  @include scroll(y);
}
</style>
