<template>
  <div class="view-edit-create-order">
    <v-header title="测试下拉" />
    <div class="content">
      <i class="gap"></i>
      <div class="scroll-wrapper">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="isPulldownLoading"
          :head-height="loadingHeight"
          :disabled="listLoading"
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
            :finished="listFinished"
            @load="handleLoadMore">
            <slot>
              <h3 v-for="(item, idx) in list"
                :key="idx">{{ `${item},,,${qty}` }}</h3>
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
    </div>
  </div>
</template>
<script>
export default {
  name: 'view-test-pulldown',
  props: {
    onRefresh: {
      type: Function
    },
    onLoad: {
      type: Function
    }
  },
  data() {
    return {
      list: [],
      loadingHeight: 0,

      listLoading: false,
      listFinished: false,
      qty: 0,
      isPulldownLoading: false
    };
  },
  created() {
    this.handleLoadMore();
  },
  mounted() {
    this.$nextTick(() => {
      this.loadingHeight = this.$refs.loadingComponent.$el.clientHeight;
    });
  },
  methods: {
    handleLoadMore() {
      if (!this.listFinished) {
        console.log('list:_____', 33333);
        setTimeout(() => {
          this.qty++;

          if (this.qty < 3) {
            for (let i = 0; i < 10; i++) {
              this.list.push(this.list.length + 1);
            }
          }
          this.listLoading = false;
          // this.listFinished = this.qty >= 2;
        }, 300);
      } else {
        console.log('pull:_____');
      }
    },
    handleRefresh() {
      // if (this.onRefresh) {
      this.list = [];
      this.listFinished = true;
      return this.aa()
        .then(() => this.finishRefresh())
        .catch(() => this.finishRefresh());
      /* setTimeout(() => {
        this.$Toast('刷新成功');
        this.isPulldownLoading = false;
        this.listFinished = false;
      }, 2000); */
      // }
    },
    finishRefresh() {
      this.isPulldownLoading = false;
      // this.listFinished = false;
    },
    aa() {
      return Promise.all([this.bb(), this.cc()])
        .then((res) => {
          console.log('res:_____', res);
        })
        .catch((err) => {
          console.log('err:_____', err);
        });
    },
    bb() {
      return new Promise((res, rej) => {
        setTimeout(() => {
          res('bbb');
          console.log('bb完成:_____');
        }, 3000);
      });
    },
    cc() {
      return new Promise((res, rej) => {
        setTimeout(() => {
          rej('ccc');
          console.log('cc完成:_____');
        }, 4000);
      });
    }
  }
};
</script>
<style lang="scss">
.view-edit-create-order {
  display: flex;
  flex-flow: column;
  .gap {
    flex: none;
  }
  .content {
    flex: 1;
    height: calc(100% - 88px);
    h3 {
      line-height: 200px;
      border-bottom: 1px solid #eee;
    }
  }
  .scroll-wrapper {
    height: 100%;
    @include scroll(y);
  }
}
</style>
