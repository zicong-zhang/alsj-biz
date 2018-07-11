<template>
  <div :class="{'product-list': true, 'no-swiping': no}"
    ref="container">
    <ul ref="scrollContent"
      v-if="!noResult">
      <li v-for="item in dataList"
        :key="item.id">
        <div class="title">
          <h2 @click="goProductForSpace(item)">{{ item.spaceName }}·
            <span>{{ item.totalBySpace }}款</span>
          </h2>
          <span>
            <i class="iconfont icon-rightBtn"></i>
          </span>
        </div>
        <div class="img-box">
          <img :src="item.productList[0].goodsCover"
            v-img-err="'~~img/storeBg.jpg'"
            @click.stop="goDetail(item.productList[0],item.productList[0].id)" />
          <div class="second">
            <img :src="item.productList[1].goodsCover"
              v-img-err="'~~img/storeBg.jpg'"
              v-if="item.productList[1]"
              @click.stop="goDetail(item.productList[0],item.productList[1].id)" />
            <img :src="item.productList[2].goodsCover"
              v-img-err="'~~img/storeBg.jpg'"
              v-if="item.productList[2]"
              @click.stop="goDetail(item.productList[0],item.productList[2].id)" />
          </div>
        </div>
      </li>
        <VPageBottom v-show="dataList.length"/>
    </ul>

    <p class="no-result"
      v-if="noResult">没有产品</p>
  </div>
</template>

<script>
export default {
  name: "StoreItemProductList",
  props: ["no", "store-id", "active", "is-share"],
  data() {
    return {
      loaded: false,
      dataList: [],
      containerDom: null,
      scrollContentDom: null,
      noSwiping: true,
      noResult: false,
      getHistory: {}
    };
  },
  watch: {
    active: {
      handler(newVal) {
        if (newVal === 0 && !this.loaded) {
          this.getSpaceListByStore();
          this.loaded = true;
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.containerDom = this.$refs.container;
      this.scrollContentDom = this.$refs.scrollContent;

      this.$refs.container.addEventListener("scroll", e => {
        this.$emit("fixed-gauge", e.target.scrollTop);
      });
    });
  },
  methods: {
    // 获取空间列表
    getSpaceListByStore() {
      this.$http("getSpaceListByStore", {
        merchantId: this.storeId,
        pageNum: 1,
        pageSize: 0
      }).then(data => {
        if (data.data.list.length === 0) {
          this.noResult = true;
          return;
        }
        let list = data.data.list.map(item => {
          item.productList = [{}, {}, {}];
          return item;
        });
        this.dataList = list;
        list.forEach((item, idx) => {
          this.getProductListBySpace(item.spaceId, idx);
        });
      });
    },
    // 根据空间 获取产品列表
    getProductListBySpace(spaceId, idx) {
      this.$http("getProductListBySpace", {
        spaceId,
        merchantId: this.storeId,
        pageNum: 1,
        pageSize: 3
      }).then(
        data => {
          this.$set(this.dataList[idx], "productList", data.data.list);
        },
        err => {
          this.$toast(err.msg);
        }
      );
    },
    // 跳转产品详情
    goDetail(_item, id) {
      this.$emit("set-show-module", 0);
      if (this.$utils.getUserInfo()) {
        this.userHistory(_item);
      }
      this.$store.commit('bb', 'on')
      this.$router.push({
        name: 'product-detail',
        query: {
          id
        }
      })
    },
    // 跳转产品列表 根据空间展示
    goProductForSpace(item) {
      let { merchantId, spaceId, spaceName } = item;
      this.$utils.openUrl("../../pages/product/product_list_by_space.html", {
        storeId: merchantId,
        spaceId,
        spaceName
      });
    },
    //存储足迹缓存
    userHistory: function(_item) {
      var num = localStorage.getItem("historyNum") || 0;
      if (localStorage.getItem("userHistory")) {
        this.getHistory = JSON.parse(localStorage.getItem("userHistory"));
        for (let i = 0; i < this.getHistory.length; i++) {
          if (this.getHistory[i].goodsId == _item.id) {
            this.getHistory.splice(i, 1);
          }
        }
        this.getHistory.push({
          goodsId: _item.id,
          goodsName: _item.goodsName,
          goodsCover: _item.goodsCover
        });
        var historyStr = JSON.stringify(this.getHistory);
        localStorage.setItem("userHistory", historyStr);
      } else {
        num = 1;
        this.getHistory = [
          {
            goodsId: _item.id,
            goodsName: _item.goodsName,
            goodsCover: _item.goodsCover
          }
        ];
        var historyStr = JSON.stringify(this.getHistory);
        localStorage.setItem("userHistory", historyStr);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  ul {

  }
</style>
