<template>
  <div class="customer-list-item-list">
    <div class="scroll-container">

      <div class="pull-down"
        ref="pull-text">
        <i class="gap"></i>
        <span>下拉加载更多</span>
      </div>

      <ul ref="scrollContent">
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
        <p v-if="!nextPage"
          key="customer-list-no-next">到达底线了</p>
        <v-loading v-else/>
      </div>

    </div>

  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import BScroll from "better-scroll";
import imgPlaceholder from "~img/placeholder_user.png";
/* 
  TODO
  封装成组件
 */
export default {
  name: "customer-list-item-list",
  data() {
    return {
      nextPage: true,
      imgPlaceholder,
      scrollObj: "",
      isPullDown: false,
      isPullUping: false,
      scrollContentHeight: 0,
      tipTextHeight: 0
    };
  },
  computed: {
    ...mapState({
      customerList: state => state.customerModule.customerList
    }),
    pullDownConfig() {
      return {
        threshold: this.tipTextHeight + 10, // 顶部下拉的距离
        stop: this.tipTextHeight // 回弹停留的距离
      };
    },
    pullUpConfig() {
      console.log('-(this.scrollContentHeight / 2):_____', -(this.scrollContentHeight / 2));
      return {
        // threshold: 0
        threshold: this.scrollContentHeight / 2
      };
    }
  },
  created() {
    this.getCustomerList();
  },
  mounted() {
    this.$nextTick(() => {
      this.tipTextHeight = this.$refs['pull-text'].clientHeight;
      this.scrollContentHeight = this.$refs.scrollContent.clientHeight;

      // 上拉加载无定位，下拉刷新要定位
      this.scrollObj = new BScroll(".customer-list-item-list", {
        bounceTime: 300,
        pullDownRefresh: this.pullDownConfig,
        pullUpLoad: this.pullUpConfig
      });

      /* this.$once('hook:beforeDestroy', () => {
        scrollObj.destroy();
      }) */

      // 触发下拉，发起请求
      this.scrollObj.on("pullingDown", () => {
        console.log("down:_____");
        this.onRefresh();
      });
      this.scrollObj.on("pullingUp", () => {
        console.log("1111:_____", 1111);
        this.onPullUp();
      });

      this.scrollObj.on('scroll', obj => {
        console.log('obj.y:_____', obj.y);
      })
    });
  },
  methods: {
    ...mapActions(["getCustomerList"]),
    ...mapMutations(["INIT_CUSTOMER_LIST_PAGE_NUM"]),
    getDataList() {
      return this.getCustomerList().then(res => {
        console.log("res:_____", res);
        if (!res.data.next) {
          this.nextPage = false;
        }
        return Promise.resolve(res);
      });
    },
    onRefresh() {
      console.log("123:_____下拉刷新");
      this.nextPage = true;
      this.INIT_CUSTOMER_LIST_PAGE_NUM();
      this.getDataList().then(() => {
        console.log("this.nextPage111111:_____", this.nextPage);
        this.scrollObj.finishPullDown();
        this.scrollObj.refresh();
      });
    },
    onPullUp() {
      console.log("this.nextPage:_____", this.nextPage);
      if (this.nextPage) {
        this.isPullUping = true;
        this.scrollObj.closePullDown(); // 动态关闭下拉刷新功能, 上拉加载更多时禁止下拉刷新

        this.getDataList().then(() => {
          console.log('"up":_____', "up");
          this.isPullUping = false;
          this.scrollObj.finishPullUp();
          this.scrollObj.openPullDown(this.pullDownConfig); // 加载更多完成后，恢复下拉刷新功能
          this.scrollObj.refresh();
        });
      } else {
          this.scrollObj.finishPullUp();
      }
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
  .pull-up {
    padding-top: 16px;
    padding-bottom: 24px;
    p {
      height: 60px;
      line-height: 76px;
      text-align: center;
      color: #999;
    }
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
