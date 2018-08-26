<template>
  <div class="v-scroll"
    ref="scroll">
    <div class="scroll-wrapper">

      <slot name="pull-down-txt"
        v-if="showPulldownTxt">
        <div class="pull-down"
          ref="pull-text">
          <i class="gap"></i>
          <v-loading />
        </div>
      </slot>

      <div class="scroll-content"
        ref="scrollContent">
        <slot></slot>
      </div>

      <div class="pull-up"
        v-if="showPullupTxt">
        <slot name="pullup-txt">
          <v-loading/>
        </slot>
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
    // 展示下拉提示文案
    showPullupTxt: {
      default: false
    },
    // 展示上拉加载更多提示文案
    showPulldownTxt: {
      default: false
    },
    // 当数据更新后，刷新scroll的延时
    refreshDelay: {
      default: 30
    },
    // 监听该数据的变化，用于刷新bs
    listen: {
      required: true
    }
  },
  data() {
    return {
      timer: ""
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
  watch: {
    listen() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        console.log("222222:_____", 222222);
        clearTimeout(this.timer);
        this.timer = "";
        this.scrollObj.refresh();
      }, this.refreshDelay);
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  methods: {
    initScroll() {
      this.tipTextHeight = this.$refs["pull-text"].clientHeight;
      this.scrollContentHeight = this.$refs.scrollContent.clientHeight;

      // 上拉加载无定位，下拉刷新要定位
      this.scrollObj = new BScroll(this.$refs.scroll, {
        bounceTime: 300,
        pullDownRefresh: this.pullDownConfig,
        pullUpLoad: this.pullUpConfig
      });

      this.$once("hook:beforeDestroy", () => {
        this.scrollObj.destroy();
      });

      // 触发下拉刷新
      if (this.onPulldown) {
        this.scrollObj.on("pullingDown", () => {
          this.closePullUp();
          this.onPulldown().then(() => {
            console.log("6666:_____", 6666);
            this.openPullUp();
            this.scrollObj.finishPullDown();
          });
        });
      }

      // 触发上拉加载更多
      if (this.onPullup) {
        this.scrollObj.on("pullingUp", () => {
          console.log("1111:_____", 1111);
          this.closePullDown();
          this.onPullup().then(res => {
            console.log("res:_____", res);
            this.openPullDown();
            this.scrollObj.finishPullUp();
          });
        });
      }
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
}
</style>
