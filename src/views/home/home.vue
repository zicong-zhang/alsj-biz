<template>
  <div>
    <HomeHeader />
    <HomeTips />
    <HomeGather/>
    <div class="sale-champion">
      <h4><i class="iconfont icon-btn_case_collectionP"></i>本月销售冠军</h4>
      <p>张三丰 6.3万</p>
    </div>
  </div>
</template>


<script>
import HomeHeader from "./home-header";
import HomeTips from "./home-tips";
import HomeGather from './home-gather';

export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeTips,
    HomeGather
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
.sale-champion {
  height: r(80px);
  line-height: r(80px);
  background: #fff;
  display: flex;
  justify-content:  space-between;
  align-items: center;
  color: #3399FF;
  font-size: r(32px);
  padding: 0 r(36px);
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
