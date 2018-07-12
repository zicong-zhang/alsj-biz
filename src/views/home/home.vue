<template>
  <div class="view-home">
    <HomeHeader />
    
    <div class="content">
      <HomeTips />
      <HomeGather/>
      <div class="sale-champion">
        <h4>
          <i class="iconfont icon-btn_case_collectionP"></i>本月销售冠军</h4>
        <p>张三丰 6.3万</p>
      </div>
      <HomeSaleTarget/>
      <HomeActions/>
    </div>

    <VFooter/>
  </div>
</template>


<script>
import HomeHeader from "./home-header";
import HomeTips from "./home-tips";
import HomeGather from "./home-gather";
import HomeSaleTarget from "./home-sale-target";
import HomeActions from "./home-actions";

export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeTips,
    HomeGather,
    HomeSaleTarget,
    HomeActions
  },
  data() {
    return {
      title: "阿拉私家",
      showBack: false
    };
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
.view-home {
  display: flex;
  flex-flow: column;
  .content {
    flex: 1;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
  }
}
.sale-champion {
  height: r(80px);
  line-height: r(80px);
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3399ff;
  font-size: r(32px);
  padding: 0 r(36px);
  margin-bottom: r(16px);
  h4 {
    font-weight: normal;
    font-size: r(32px);
  }
  i {
    font-size: r(30px);
    margin-right: r(8px);
  }
}
</style>
