<template>
  <div class="view-edit-create-order">
    <v-header title="测试下拉" />
    <i class="gap"></i>
    <div class="content">
      <div class="c"
        :style="scrollClassName"
        @scroll="scroll">
        <div :class="{wrapper: true, transition: transitionClass}"
          :style="{
            transform: `translate3d(0, ${pulldownY}px, 0)`
          }"
          @touchend="touchend">
          <p class="pulldown">{{ pulldownText }}</p>
          <ul v-finger:press-move="pressMove">
            <li v-for="(item, idx) in 150"
              :key="idx">
              <h2>{{ idx }}.........{{ idx }}</h2>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* 
  TODO
  下拉时添加overflow hidden，阻止ios的滚动回弹
*/
export default {
  name: "view-test-pulldown",
  data() {
    return {
      pulldownY: 0,
      scrollTop: 0,
      transitionClass: false,
      pulldownText: '下拉加载更多',
      pulldowning: false
    };
  },
  computed: {
    scrollClassName() {
      console.log('this.pulldownY, this.pulldowning:_____', this.pulldownY, this.pulldowning);
      return {
        overflow: (this.pulldownY > 0 && !this.pulldowning) ? 'hidden' : ''
      }
    }
  },
  created() {},
  methods: {
    aa() {
      console.log("12323:_____", 12323);
    },
    touchend() {
      this.transitionClass = true;
      // console.log('this.pulldownY:_____', this.pulldownY);
      if (this.pulldownY >= 60) {
        this.pulldownY = 60;
        this.pulldowning = true;
        this.pulldownText = '加载中...';
      } else if (!this.pulldowning) {
        this.pulldownY = 0;
      }
    },
    pressMove({ deltaY }) {
      if (this.scrollTop === 0) {
        this.transitionClass = false;
        this.pulldownY += deltaY;
        console.log('this.pulldownY:_____', this.pulldownY);
      }
      if (this.pulldownY > 60 && !this.pulldowning) {
        this.pulldownText = '松开加载';
      }
      // console.log("e:_____", e);
    },
    scroll(e) {
      this.scrollTop = e.target.scrollTop;
      console.log("e:_____", e.target.scrollTop);
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
    /* display: flex;
    flex-flow: column;
    justify-content: space-between; */
  }
  .c {
    height: 100%;
    position: relative;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    .pulldown {
      line-height: 50px;
    }
    h2 {
      line-height: 100px;
      font-size: 24px;
      border-bottom: 1px solid #ccc;
      font-weight: normal;
    }
  }
  .wrapper {

    margin-top: -50px;
    position: absolute;
    left: 0;
    right: 50px;
  }
  .transition {
    transition: transform .2s;
  }
  .form {
    background: #fff;
    padding: 0 36px;
    padding-bottom: 40px;
  }
  .v-input,
  .v-picker {
    margin-bottom: 24px;
  }
  .create-order-btn {
    line-height: 98px;
    background: linear-gradient(to right, #2985ff, #3dadff);
    color: #fff;
    font-size: 32px;
    text-align: center;
  }
}
</style>
