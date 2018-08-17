<template>
  <div class="customer-list-item-list">
    <div class="scroll-container">

      <div class="pull-down" ref="pull-text">
        <i class="gap"></i>
        <span>下拉加载更多</span>
      </div>

      <ul>
        <li v-for="item in customerList"
          :key="item.id">
          <img v-lazy="{
            src: item.avatar,
            loading: imgPlaceholder,
            error: imgPlaceholder
          }">
          <div class="user-info">
            <h4>{{ item.name }}</h4>
            <span v-if="item.type === 1"
              :key="'pf' + item.id">平台客户</span>
            <span class="not"
              v-else
              :key="'not-pf' + item.id">非平台客户</span>
          </div>
        </li>

      </ul>

      <div class="pull-up">
        <i class="gap"></i>
        <span>上拉更多</span>
      </div>

    </div>

  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BScroll from "better-scroll";
import imgPlaceholder from "~img/placeholder_user.png";

export default {
  name: "customer-list-item-list",
  data() {
    return {
      nextPage: true,
      imgPlaceholder,
      scrollObj: ""
    };
  },
  computed: {
    ...mapState({
      customerList: state => state.customerModule.customerList
    })
  },
  created() {
    this.getCustomerList();
  },
  mounted() {
    this.$nextTick(() => {
      const h = this.$refs['pull-text'].clientHeight;

      this.scrollObj = new BScroll(".customer-list-item-list", {
        bounceTime: 300,
        pullDownRefresh: {
          threshold: h + 10, // 顶部下拉的距离
          stop: h // 回弹停留的距离
        },
        pullUpLoad: {
          threshold: h
        }
      });

      /* this.$once('hook:beforeDestroy', () => {
        scrollObj.destroy();
      }) */

      // 触发下拉，发起请求
      this.scrollObj.on("pullingDown", () => {
        this.onLoad();
      });
      this.scrollObj.on('pullingUp', () => {
        this.onPullUp();
      })
    });
  },
  methods: {
    ...mapActions(["getCustomerList"]),
    onLoad() {
      // if (!this.nextPage) return;

      this.getCustomerList().then(res => {
        this.scrollObj.finishPullDown();
        console.log('123:_____', 123);
        if (!res.next) {
          this.nextPage = false;
        }
      });
    },
    onPullUp() {
      setTimeout(() => {
        console.log('"up":_____', "up");
        // this.scrollObj.finishPullUp();
      }, 6000)
    }
  }
};
</script>
<style lang="scss">
.customer-list-item-list {
  height: 100%;
  @include scroll(y);
  .scroll-container {
    position: relative;
  }
  .pull-down, .pull-up {
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
  .pull-up {
    top: auto;
    bottom: 0;
    transform: translate3d(0, 100%, 0);
  }
  ul {
    padding-top: 16px;
  }
  li {
      display: flex;
      height: 144px;
      border-bottom: 1px solid $bg;
      background: #fff;
      box-sizing: border-box;
      padding: 28px 36px;
    img {
      flex: none;
      width: 88px;
      height: 88px;
      border-radius: 8px;
      margin: 0;
      margin-right: 16px;
    }
    div {
      flex: 1;
      overflow: hidden;
    }
    h4 {
      font-size: 32px;
      font-weight: normal;
      @include over(1);
      margin-bottom: 16px;
    }
    span {
      display: inline-block;
      width: 108px;
      height: 28px;
      line-height: 28px;
      background: #e5fff2;
      border-radius: 4px;
      color: #32ab6e;
      text-align: center;
      font-size: 20px;
    }
    .not {
      color: #f5594e;
      background: #fff1f0;
    }
  }
}
</style>
