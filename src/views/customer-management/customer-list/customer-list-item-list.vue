<template>
  <div class="customer-list-item-list">
    <v-scroll class="scroll-container"
      ref="vScroll"
      :listen="customerList"
      :show-pulldown-txt="true"
      :show-pullup-txt="true"
      :on-pulldown="onRefresh"
      :on-pullup="onPullup">
      <ul>
        <li v-for="item in customerList"
          :key="item.id"
          @tap="toCustomerDetail(item.id)">
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
      <p slot="pullup-txt" v-if="isFinishPullup">到达底部</p>
    </v-scroll>

  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import imgPlaceholder from "~img/placeholder_user.png";

export default {
  name: "customer-list-item-list",
  data() {
    return {
      nextPage: true,
      imgPlaceholder,
      isFinishPullup: false
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
  mounted() {},
  methods: {
    ...mapActions(["getCustomerList"]),
    ...mapMutations(["INIT_CUSTOMER_LIST_PAGE_NUM"]),
    getDataList() {
      if (this.nextPage) {
        return this.getCustomerList().then(res => {
          if (!res.data.next) {
            this.nextPage = false;
          }
          return Promise.resolve(res);
        });
      } else {
        this.isFinishPullup = true;
        return Promise.resolve();
      }
    },
    onRefresh() {
      this.nextPage = true;
      this.INIT_CUSTOMER_LIST_PAGE_NUM();
      return this.getDataList();
    },
    onPullup() {
      return this.getDataList();
    },
    toCustomerDetail(id) {
      console.log('12321123:_____', 12321123);
      this.$utils.go(this, {
        name: 'view-customer-info',
        query: {
          id
        }
      })
    }
    /* onPullUp() {
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
    } */
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
