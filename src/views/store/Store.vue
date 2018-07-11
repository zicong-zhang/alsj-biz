<template>
  <div class="store"
    ref="store"
    @scroll="rootScroll">
    <VHeader :title="storeInfo.merchantName"
      :opacity="bgColor"
      :fixed="1"
      ref="header" />

    <!-- tab 模块 悬浮吸顶展示部分 -->
    <div class="tab-module fixed"
      v-show="tabFixed">
      <ul>
        <li :class="{'active': tabActive === 0}"
          @click="tabActive=0">
          <p>
            <span>{{ tabDataTotal.goodsTotal }}</span>产品中心
          </p>
        </li>
        <li :class="{'active': tabActive === 1}"
          @click="tabActive=1">
          <p>
            <span>{{ tabDataTotal.caseTotal }}</span>客户案例
          </p>
        </li>
        <li :class="{'active': tabActive === 2}"
          @click="tabActive=2">
          <p>
            <span>{{ tabDataTotal.designerTotal }}</span>设计师
          </p>
        </li>
      </ul>
    </div>
    <!-- tab 模块 悬浮吸顶展示部分 -->

    <div class="app-container">

      <div>
        <img :src="storeBg"
          class="background-img"
          v-img-err="'product_img.jpg'" />

        <!-- 店铺信息 -->
        <div class="store-msg" ref="storeMsg">
          <img :src="storeInfo.logo"
            class="store-logo"
            v-img-err="'storeLogo.png'"
            v-finger:tap="tap"
            v-finger:long-tap="longTap"
            v-finger:swipe="swipe"
            v-finger:press-move="pressMove"
            v-finger:single-tap="singleTap"
            v-finger:touch-move="touchMove"
            v-finger:touch-end="touchEnd" />
          <div class="store-info">
            <p class="store-name">{{ storeInfo.merchantName }}</p>

            <p class="grade">
              <i class="iconfont icon-icon_stores_score"
                v-for="(item, index) in grade.solid"
                :key="'solid' + index"></i>
              <i class="iconfont icon-icon_stores_noScore"
                v-for="(item, index) in grade.hollow"
                :key="'hollow' + index"></i>
              <span class="score">{{ storeInfo.grade }}.0分</span>
            </p>
          </div>
          <p class="concern"
            @touchend="onFollow">
            <i class="iconfont icon-btn_find_favorite"
              v-if="isFollowed"></i>
            <i class="iconfont icon-btn_find_favorirePre"
              v-else></i>
            <span>{{ isFollowed ? '已关注' : '关注' }}</span>
          </p>
        </div>
        <!-- 店铺信息 -->

        <!-- tab 模块 -->
        <div class="tab-module"
          ref="tab">
          <ul>
            <li :class="{'active': tabActive === 0}"
              @click="tabActive=0">
              <p>
                <span>{{ tabDataTotal.goodsTotal }}</span>产品中心
              </p>
            </li>
            <li :class="{'active': tabActive === 1}"
              @click="tabActive=1">
              <p>
                <span>{{ tabDataTotal.caseTotal }}</span>客户案例
              </p>
            </li>
            <li :class="{'active': tabActive === 2}"
              @click="tabActive=2">
              <p>
                <span>{{ tabDataTotal.designerTotal }}</span>设计师
              </p>
            </li>
          </ul>
        </div>
        <!-- tab 模块 -->

        <div :class="{content: true, fixed: gaugeFixed}">

          <!-- 广告banner -->
          <div class="store-ad-banner"
            v-if="false">
            <!-- <div class="store-ad-banner" v-if="bannerData.length"> -->
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide"
                  v-for="item in bannerData"
                  :key="item.id">
                  <img :src="item.cover"
                    v-img-err="'~~img/storeBg.jpg'" />
                </div>
              </div>
              <p class="swiper-pagination"></p>
            </div>
          </div>
          <!-- 广告banner -->

          <div :class="{'module-list': true, 'fixed-gauge': gaugeFixed}"
            :style="{height: moduleListHeight + 'px'}"
            ref="moduleList">
            <!-- 产品中心 -->
            <ProductList :class="{transform: tabActive === 0}"
              v-show="tabActive === 0"
              :no="noSwiping"
              :store-id="storeId"
              :active="tabActive"
              @fixed-gauge="fixedGauge"
              @set-show-module="setDefaultShowModule" />
            <!-- 产品中心 -->

            <!-- 客户案例 -->
            <CaseList :class="{transform: tabActive === 1}"
              v-show="tabActive === 1"
              :no="noSwiping"
              :store-id="storeId"
              :active="tabActive"
              @fixed-gauge="fixedGauge"
              @set-show-module="setDefaultShowModule" />
            <!-- 客户案例 -->

            <!-- 设计师 -->
            <DesignerList :class="{transform: tabActive === 2}"
              v-show="tabActive === 2"
              :no="noSwiping"
              :store-id="storeId"
              :active="tabActive"
              @fixed-gauge="fixedGauge"
              @set-show-module="setDefaultShowModule" />
            <!-- 设计师 -->
          </div>
        </div>

      </div>

    </div>

    <!-- 预约量尺 -->
    <div :class="{gauge: true, fixed: gaugeFixed}"
      @click.prevent="goGauge"
      v-if="!isShare">
      <p>
        <img src="~~img/icon_shop_design@2x.png" />
        <span>预约量尺</span>
      </p>
    </div>
    <!-- 预约量尺 -->

    <VDownload v-if="isShare" />
  </div>
</template>

<script>
import ProductList from "./StoreItemProductList";
import CaseList from "./StoreItemCaseList";
import DesignerList from "./StoreItemDesignerList";
import VDownload from "~components/VDownload";

export default {
  name: "Store",
  components: {
    ProductList,
    CaseList,
    DesignerList,
    VDownload
  },
  data() {
    return {
      tabActive: 0,
      gaugeFixed: false,
      tabFixed: false,
      bgColor: 0,
      moduleListHeight: 0,
      noSwiping: true,
      isShowPop: false,
      isShare: false,

      banner: null,
      bannerData: [],

      storeId: "",
      storeInfo: {},
      isFollowed: false,
      storeBg: "",

      tabDataTotal: {
        goodsTotal: 0,
        caseTotal: 0,
        designerTotal: 0
      }
    };
  },
  computed: {
    // 评分
    grade() {
      if (this.storeInfo.grade) {
        return {
          solid: this.storeInfo.grade,
          hollow: 5 - this.storeInfo.grade
        };
      } else {
        return {};
      }
    },
    // 店铺认领状态
    // 店铺类型 0：未认领 1：认领中 2：未认证 3：认证中 4：认证未通过 5：已认证 ,
    claimStatus() {
      let status = "未认领";
      switch (this.storeInfo.type) {
        case 0:
          status = "未认领";
          break;
        case 1:
          status = "认领中";
          break;
        default:
          status = "已认领";
          break;
      }
      return status;
    },
    storeMsgTop() {
      return this.$refs.storeMsg.offsetTop;
    }
  },
  created() {
    let { id, share } = this.$route.query;
    this.storeId = id;
    this.isShare = share;

    this.getDefaultShowModule();
    this.getMerchantInfo();
    this.getStoreBg();
    this.getTabDataTotal();
    this.getStoreFollowStatus();
  },
  mounted() {
    this.$nextTick(() => {
      this.setModuleListHeight();
      this.fixedGauge(this.isShare);
    });

    // this.getBannerData(); 3.0.0隐藏
  },
  methods: {
    rootScroll(e) {
      let scrollTop = e.target.scrollTop;
      this.scrollHandle(scrollTop);
      this.setBgColor(scrollTop);
      this.setModuleScroll(scrollTop);
    },
    longTap(aa) {
      console.log("longTap:_____", aa);
    },
    swipe(aa) {
      console.log("swipe:_____", aa);
    },
    touchEnd(touchEnd) {
      console.log("touchEnd:_____", touchEnd);
    },
    touchMove(touchMove) {
      console.log("touchMove:_____", touchMove);
    },
    tap(tap) {
      console.log("tap:_____", tap);
    },
    pressMove(pressMove) {
      console.log("pressMove:_____", pressMove);
    },
    singleTap(singleTap) {
      console.log("singleTap:_____", singleTap);
    },
    // 设置列表模块的高度
    setModuleListHeight() {
      let { header, tab } = this.$refs;
      this.moduleListHeight =
        document.body.offsetHeight - header.$el.clientHeight - tab.clientHeight;
      console.log(
        "height:_____",
        document.body.offsetHeight,
        header.$el.clientHeight,
        tab.clientHeight,
        document.body.offsetHeight - header.$el.clientHeight - tab.clientHeight
      );
    },
    // 设置tab悬浮
    scrollHandle(y) {
      const { tab, header } = this.$refs;
      this.tabFixed = !!(y >= tab.offsetTop - header.$el.clientHeight);
    },
    // 设置预约量尺按钮悬浮
    fixedGauge(status) {
      this.gaugeFixed = this.isShare || status;
    },
    // 设置头部背景色
    setBgColor(y) {
      if (y >= 0) {
        this.bgColor = (parseInt(y) - this.$refs.tab.offsetTop + this.storeMsgTop) / 40;
      }
    },
    // 设置模块滚动条
    setModuleScroll(top) {
      let {
        moduleList,
        header,
        tab
      } = this.$refs;
      this.noSwiping = top <= moduleList.offsetTop - header.$el.clientHeight - tab.clientHeight;
    },
    // 获取店铺基本信息
    getMerchantInfo() {
      this.$http("getMerchantInfo", {
        merchantId: this.storeId
      }).then(
        data => {
          this.storeInfo = data.data.merchantExt;
        },
        err => {
          this.$toast(err.msg);
        }
      );
    },
    // tab 数据统计
    getTabDataTotal() {
      this.$http("getTabDataTotal", {
        merchantId: this.storeId
      }).then(
        data => {
          console.log("data:_____", data);
          this.tabDataTotal = data.data.merchantCenterHomeBo;
        },
        err => {
          this.$toast(err.msg);
        }
      );
    },
    // 设置店铺背景图
    setStoreBg() {
      this.$http("getStoreBg", {
        pageNum: 1,
        pageSize: 0
      }).then(data => {
        let arr = data.data.list.map(item => {
          return item.cover;
        });
        window.sessionStorage.setItem(
          "STORE_INDEX_PAGE_BG",
          JSON.stringify(arr)
        );
        this.getStoreBg();
      });
    },
    // 获取店铺背景图
    getStoreBg() {
      let storage = JSON.parse(
        window.sessionStorage.getItem("STORE_INDEX_PAGE_BG")
      );
      if (!storage) {
        this.setStoreBg();
      } else {
        do {
          this.storeBg = storage[this.$utils.randomNum()];
        } while (!this.storeBg);
      }
    },
    // 设置默认展示的模块
    setDefaultShowModule(idx) {
      window.sessionStorage.setItem("STORE_DEFAULT_SHOW_MODULE", idx);
    },
    // 获取默认展示的模块
    getDefaultShowModule() {
      let storage = window.sessionStorage.getItem("STORE_DEFAULT_SHOW_MODULE");
      if (typeof storage === "null") {
        this.tabActive = 0;
      } else {
        this.tabActive = storage * 1;
        window.sessionStorage.removeItem("STORE_DEFAULT_SHOW_MODULE");
      }
    },
    // 初始化广告 banner
    initBanner() {
      this.banner = new Swiper(".swiper-container", {
        autoplay: {
          disableOnInteraction: false
        },
        loop: this.bannerData.length !== 1,
        updateOnImagesReady: true,
        pagination: {
          el: ".swiper-pagination"
        }
      });
    },
    // 获取广告 banner 数据
    getBannerData() {
      this.$http("getBannerAdData", {
        merchantId: this.storeId,
        pageNum: 1,
        pageSize: 0
      }).then(data => {
        this.bannerData = data.data.list;
        this.$nextTick(() => {
          this.initBanner();
        });
      });
    },
    // 获取店铺的关注状态
    getStoreFollowStatus() {
      this.$http("getFollowStatusByStore", {
        merchantId: this.storeId
      }).then(data => {
        this.isFollowed = data.data.userFollowed;
      });
    },
    // 关注操作
    onFollow() {
      if (!this.$utils.judgeIsLogin(this)) return;

      this.$http(
        "followStatusByStore",
        {
          merchantId: this.storeId,
          state: this.isFollowed ? 0 : 1
        },
        {
          autoLoading: "no",
          noRepeat: true
        }
      ).then(
        data => {
          this.isFollowed = !this.isFollowed;
          let msg = this.isFollowed ? "关注成功" : "取消关注成功";
          this.$toast(msg);
        },
        err => {
          this.$toast(err.msg);
        }
      );
    },
    // 去认领店铺
    goClaimStore() {
      if (!this.$utils.judgeIsLogin(this)) return;

      let { merchantName, logo, address, type } = this.storeInfo;
      this.isShowPop = false;

      if (type !== 0) return false;

      this.$utils.openUrl("../claim_store/claim_store.html", {
        id: this.storeId
      });
    },
    // 跳转预约量尺
    goGauge() {
      if (!this.$utils.judgeIsLogin(this)) return false;

      this.setModuleScroll(this.tabActive);
      this.$utils.openUrl("~pages/gauge/gauge.html", {
        storeId: this.storeId
      });
    },
    // 跳转客服
    goService() {
      if (!this.$utils.judgeIsLogin(this)) return false;

      this.$http("getTalker", {
        merchantId: this.storeId
      }).then(
        data => {
          let { userId, nickname, avatar, phone } = data.data.merchantStaffExt;
          this.$utils.openUrl("~pages/im_alone/im_alone.html", {
            nickname,
            avatar,
            phone,
            id: userId
          });
        },
        err => {
          if (err.code == 200527) {
            window.location.href = "~lib/sobot/cs.html";
          }
        }
      );
    }
  }
};
</script>

<style lang="scss">
// @import '../../sass/_var.scss';
@import "./store.scss";
</style>

