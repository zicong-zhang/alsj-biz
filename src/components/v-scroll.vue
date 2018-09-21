<template>
  <div class="v-scroll"
    ref="scroll">
    <div class="scroll-wrapper">

      <slot name="pull-down-txt"
        v-if="onPulldown">
        <div class="pull-down"
          ref="pull-text">
          <v-loading :play="loadingPlay"
            :autoplay="false" />
        </div>
      </slot>

      <div class="scroll-content"
        ref="scrollContent">
        <slot></slot>
      </div>

      <div class="pull-up"
        v-if="onPullup"
        key="pull-up-is-show">
        <v-loading v-if="!finishPullUp"
          key="pull-up-is-show-loading" />
        <p class="finish-txt"
          v-else
          key="pull-up-is-show-finish-txt">{{ finishTxt }}</p>
      </div>

    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "v-scroll",
  props: {
    // 上拉加载回调 必须接收 Promise 对象
    onPullup: {
      default: false
    },
    // 下拉刷新回调 必须接收 Promise 对象
    onPulldown: {
      default: false
    },
    // 展示上拉提示文案
    showPullupTxt: {
      default: false
    },
    // 展示下拉刷新提示文案
    showPulldownTxt: {
      default: false
    },
    // 上拉加载更多结束后展示的文案
    finishTxt: {
      default: "到达底部啦~"
    },
    // 当数据更新后，刷新scroll的延时
    refreshDelay: {
      default: 30
    },
    // 监听该数据的变化，用于刷新bs
    listen: {
      // required: true
    },
    // 是否完成上拉加载
    finish: {
      // required: true
    }
  },
  data() {
    return {
      timer: "",
      loadingPlay: false,
      finishPullUp: false,
      prevScrollTop: 0
    };
  },
  computed: {
    pullDownConfig() {
      return {
        threshold: this.tipTextHeight + 10, // 顶部下拉的距离
        stop: this.tipTextHeight // 回弹停留的距离
      };
    },
    pullUpConfig() {
      return {
        threshold: this.scrollContentHeight / 2
      };
    }
  },
  /*  watch: {
    listen() {
      
    }
  }, */
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  methods: {
    initScroll() {
      this.setHeight();

      let scrollConfig = {
        click: true,
        swipeBounceTime: 200,
        bounceTime: 300,
        probeType: 1,
        pullDownRefresh: this.onPulldown && this.pullDownConfig,
        pullUpLoad: this.onPullup && this.pullUpConfig
      };

      // 上拉加载无定位，下拉刷新要定位
      this.scrollObj = new BScroll(this.$refs.scroll, scrollConfig);

      this.$once("hook:beforeDestroy", () => {
        this.scrollObj.destroy();
      });

      this.bindScroll();
      
      // 触发下拉刷新
      if (this.onPulldown) this.bindPulldown();

      // 触发上拉加载更多
      if (this.onPullup) this.bindPullup();
    },
    bindScroll() {
      this.scrollObj.on('scroll', pos => {
        if (this.tipTextHeight <= pos.y && !this.loadingPlay) {
            this.loadingPlay = true;
        }
        if (pos.y === 0) {
          this.loadingPlay = false;
        }
      })
    },
    // 绑定下拉加载
    bindPulldown() {
      this.scrollObj.on("pullingDown", () => {
        this.closePullUp();
        this.onPulldown().then(res => {
          this.finishPullUp = false;
          this.openPullUp();
          this.loadingPlay = false;
          this.scrollObj.finishPullDown();
          console.log(':_____', this.scrollObj.y);
          this.refreshHeight();
        });
      });
    },
    // 绑定上拉刷新
    bindPullup() {
      this.scrollObj.on("pullingUp", () => {
        if (!this.finishPullUp) {
          this.closePullDown();
          this.onPullup().then(res => {
            this.openPullDown();
            this.scrollObj.finishPullUp();
            this.finishPullUp = typeof res === "boolean";
            this.refreshHeight();
          });
        }
      });
    },
    // 设置高度
    setHeight() {
      this.tipTextHeight = this.showPulldownTxt
        ? this.$refs["pull-text"].clientHeight
        : 0;
      this.scrollContentHeight = this.$refs.scrollContent.clientHeight;
    },
    // 刷新滚动高度
    refreshHeight() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        clearTimeout(this.timer);
        this.timer = "";
        this.scrollObj.refresh();
      }, this.refreshDelay);
    },
    // 动态开启 下拉刷新
    openPullDown() {
      if (this.onPulldown) {
        this.scrollObj.openPullDown(this.pullDownConfig);
      }
    },
    // 动态关闭 下拉刷新
    closePullDown() {
      if (this.onPulldown) {
        this.scrollObj.closePullDown();
      }
    },
    // 动态开启 上拉加载
    openPullUp() {
      if (this.onPullup) {
        this.scrollObj.openPullUp(this.pullUpConfig);
      }
    },
    // 动态关闭 上拉加载
    closePullUp() {
      if (this.onPullup) {
        this.scrollObj.closePullUp();
      }
    }
  }
};
</script>
<style lang="scss">
.v-scroll {
  height: 100%;
  .pull-down {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate3d(0, -100%, 0);
    width: 100%;
    text-align: center;
    span {
      display: block;
      height: 50px;
      line-height: 50px;
    }
  }
  .scroll-container {
    position: relative;
  }

  .pull-up {
    p {
      height: 60px;
      line-height: 76px;
      text-align: center;
      color: #999;
      padding-top: 16px;
      padding-bottom: 24px;
    }
  }
}
</style>
