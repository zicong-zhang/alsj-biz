<template>
  <div class="product-detail"
    ref="root"
    @scroll="setHeader">
    <div>
      <VHeader :title="title"
        :fixed="1"
        :opacity="headerOpacity"
        ref="header" />

      <div class="banner">
        <swiper :option="swiperConfig">
          <swiper-slide v-for="(item, index) in bannerData"
            :key="index">
            <img v-lazy="{src: item, loading: errProductImg, error: errProductImg}">
          </swiper-slide>
          <p class="swiper-pagination"
            slot="pagination"></p>
        </swiper>
      </div>

      <div class="content"
        ref="content">

        <!-- 产品信息 -->
        <div class="product-msg">
          <h2>{{ data.goodsName }}</h2>
          <ul>
            <li v-for="(item, idx) in data.spaceName"
              :key="idx">
              <span>{{ item }}</span>
            </li>
          </ul>
          <h3>{{ data.goodsPrice }}.
            <span>00&nbsp;(参考价格)</span>
          </h3>
          <div class="tips">
            <img src="~~img/save.png" />
            <a href="https://www.alasga.cn/wap/managementFunds.html">&nbsp;</a>
            <a href="https://www.alasga.cn/wap/guaranteedPayment.html">&nbsp;</a>
          </div>
        </div>
        <!-- 产品信息 -->

        <!-- 店铺信息 -->
        <div class="store-box"
          @click.stop="goStoreIndex">
          <div class="store-msg">
            <img :src="storeInfo.logo"
              v-img-err="'~~img/storeLogo.png'" />
            <div>
              <h3>{{ storeInfo.merchantName }}</h3>
              <p>
                <i class="iconfont icon-icon_stores_score"
                  v-for="(val, index) in grade.solid"
                  :key="'solid' + index"></i>
                <i class="iconfont icon-icon_stores_noScore"
                  v-for="(val, index) in grade.hollow"
                  :key="'hollow' + index"></i>
                <span>{{ grade.solid }}.0分</span>
              </p>
            </div>
          </div>
          <p class="product-qty">
            共
            <span>{{ productTotal }}</span>
            个产品
            <i class="iconfont icon-rightBtn"></i>
          </p>
        </div>
        <!-- 店铺信息 -->

        <!-- 定制周期 -->
        <div class="period">
          <div class="title"
            @click="goCustomizeDetail">
            <h2>定制流程</h2>
            <p class="days">
              {{ data.goodsCycle }}天
              <span>(视配送距离而定)</span>
            </p>
          </div>
          <div class="flow">
            <ul>
              <li v-for="(value, index) in cycleText"
                :key="index">
                <h2>{{ value }}</h2>
              </li>
            </ul>
          </div>
        </div>
        <!-- 定制周期 -->

        <!-- 产品详情图 -->
        <div class="detail">
          <div class="title">
            <h2>产品详情</h2>
          </div>
          <div class="product-content"
            v-html="data.goodsContent"></div>
        </div>
        <!-- 产品详情图 -->
        <VPageBottom />

        <!-- 底部导航 -->
        <nav class="nav"
          v-if="!isShare">
          <div class="handle">
            <p :class="{collect: true, collected: collected}"
              @touchend="onCollect">
              <i class="iconfont icon-btn_case_collectionP"
                v-if="collected"></i>
              <i class="iconfont icon-btn_case_collection"
                v-else></i>
              <span>{{ collected ? '已收藏' : '收藏' }}</span>
            </p>
            <p class="talk"
              @touchend="goService">
              <i class="iconfont icon-btn_product_comment"></i>
              <span>咨询</span>
            </p>
            <!-- <p class="tel" @touchend="call">
						<i class="iconfont icon-icon_store_comsServi"></i>
						<span>电话</span>
					</p> -->
          </div>
          <p @click.stop="goGauge">
            <img src="~~img/icon_case_design.png" />
          </p>
        </nav>

        <VDownload v-if="isShare" />
      </div>
    </div>

  </div>
</template>

<script>
/**
 * TODO
 * msg 的 offsetTop 和get... 永远为0
 * 店铺主页存储滚动高度 好像只会存储window的高度，无法存储元素内的滚动高度1   
 */
import errProductImg from "~img/product_img.jpg";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "ProductDetail",
  data() {
    return {
      cycleText: [
        "预约量尺",
        "确定方案",
        "签订合同",
        "付款",
        "生产",
        "上门安装",
        "确认完成",
        "售后服务"
      ],
      productId: "",
      headerOpacity: 0,
      data: {},
      banner: null,
      bannerData: [],
      storeInfo: {},
      productTotal: 0,
      collected: null,
      isShare: false,
      errProductImg
    };
  },
  computed: {
    root() {
      return this.$refs.root;
    },
    contentTop() {
      return this.$refs.content.offsetTop;
    },
    swiperConfig() {
      let config = {
        notNextTick: true,
        pagination: {
          el: ".swiper-pagination"
        },
        loop: this.bannerData.length !== 1,
        updateOnImagesReady: true
      };
      return config;
    },
    title() {
      let txt = (this.data.goodsName || "").slice(0, 10);
      return txt;
    },
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
    }
  },
  watch: {
    $route(to) {
      if (to.name === "product-detail") this.init();
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.updateHeaderOpacity();
  },
  updated() {
    this.updateHeaderOpacity();
  },
  methods: {
    init() {
      let { id, share } = this.$route.query;
      this.productId = id;
      this.isShare = share;
      this.getProductDetailData();
    },
    updateHeaderOpacity() {
      this.$nextTick(() => {
        this.headerOpacity = this.root.scrollTop / this.contentTop;
      });
    },
    // 获取产品详情数据
    getProductDetailData() {
      this.$http("getProductDetailData", {
        merchantGoodsId: this.productId
      }).then(
        data => {
          this.successGetDetailData(data);
        },
        err => {
          this.$toast(err.msg);
        }
      );
    },
    successGetDetailData(data) {
      let productData = data.data.merchantGoodsExt;
      this.data = productData;

      if (productData.goodsBanners) {
        this.bannerData = this.$utils
          .copyArr(productData.goodsBanners)
          .split(" , ");
      } else {
        this.bannerData.push("~~img/product_img.jpg");
      }

      this.getStoreInfo(productData.merchantId);
      this.checkCollection(productData.id);
      this.$nextTick(() => {
        // this.initBanner();
      });
    },
    // 获取店铺信息
    getStoreInfo(id) {
      this.$http("getStoreInfoAndQtyByProductDetail", {
        merchantId: id,
        pageNum: 1,
        pageSize: 1
      }).then(
        data => {
          let { merchant, total } = data.data;
          this.$set(this.$data, "storeInfo", merchant);
          this.productTotal = total;
        },
        err => {
          this.$toast(err.msg);
        }
      );
    },
    // 初始化 banner
    initBanner() {
      this.banner = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: this.bannerData.length !== 1,
        // preloadImages:true,
        updateOnImagesReady: true
      });
    },
    // 检查收藏状态
    checkCollection(id) {
      if (!this.$utils.getUserInfo()) return false;
      this.$http(
        "checkProductCollectionStatus",
        {
          goodsId: id
        },
        {
          autoLoading: "no"
        }
      ).then(
        data => {
          this.collected = data.data.userCollected;
        },
        err => {
          this.$toast(err.msg);
        }
      );
    },
    // 收藏操作
    onCollect() {
      if (!this.$utils.judgeIsLogin(this)) return false;

      let collected = this.collected;
      if (typeof collected === "null") return false;

      this.$http(
        "onProductCollection",
        {
          goodsId: this.data.id,
          state: collected ? 0 : 1
        },
        {
          autoLoading: "no",
          noRepeat: true
        }
      ).then(
        data => {
          this.collected = !collected;
          let msg = collected ? "取消收藏成功" : "收藏成功";
          this.$toast(msg);
        },
        err => {
          this.$toast(err.msg);
        }
      );
    },
    // 设置头部渐变
    setHeader() {
      console.log(
        ":_____",
        this.root.scrollTop,
        this.contentTop,
        this.$refs.header.$el.clientHeight,
        (parseInt(this.root.scrollTop) -
          this.contentTop +
          this.$refs.header.$el.clientHeight) /
          40
      );
      this.headerOpacity =
        parseInt(
          this.root.scrollTop -
            this.contentTop +
            this.$refs.header.$el.clientHeight
        ) / 40;
    },
    // 去预约量尺
    goGauge() {
      if (!this.$utils.judgeIsLogin(this)) return false;

      this.$utils.openUrl("../../pages/gauge/gauge.html", {
        storeId: this.storeInfo.id
      });
    },
    // 跳转店铺主页
    goStoreIndex() {
      this.$store.commit("bb", "on");
      this.$router.push({
        name: "store",
        query: {
          id: this.data.merchantId
        }
      });
    },
    // 拨打电话
    call() {
      if (!this.storeInfo.fixPhone) return false;
      window.location.href = `tel:${this.storeInfo.fixPhone}`;
    },
    // 跳转客服
    goService() {
      if (!this.$utils.judgeIsLogin(this)) return false;

      this.$http("getTalker", {
        merchantId: this.data.merchantId
      }).then(
        data => {
          let { userId, nickname, avatar, phone } = data.data.merchantStaffExt;
          this.$utils.openUrl("../../pages/im_alone/im_alone.html", {
            nickname,
            avatar,
            phone,
            id: userId
          });
        },
        err => {
          if (err.code == 200527) {
            window.location.href = "../../lib/sobot/cs.html";
          }
        }
      );
    },
    // 跳转定制流程详情
    goCustomizeDetail() {
      window.location.href = "https://www.alasga.cn/wap/article.html";
    }
  }
};
</script>
<style lang="scss">
@import "./product_detail.scss";
</style>
