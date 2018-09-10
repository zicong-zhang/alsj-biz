<template>
  <div class="view-performnace-total">
    <v-header title="总业绩"/>
    <div class="content">
      <i class="gap"></i>
      <section class="title">
        <h3>年度总业绩106万</h3>
      </section>
      <div class="units">
        <div class="picker">
          <span>年份(2018)</span>
          <i class="iconfont icon-bottomnew"></i>
        </div>
        <p>单位：万元</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: 'view-performnace-total',
  data() {
    return {
      year: ''
    }
  },
  created() {
    this.year = new Date().getFullYear();
    this.init();
  },
  methods: {
    ...mapActions(['getPerformanceTotalList']),
    init() {
      this.getPerformanceTotalList(this.year)
        .then(res => {
          console.log('res:_____', res);
        })
    }
  }
}
</script>
<style lang="scss">
.view-performnace-total {
  .content {
  }
  .title {
    background: #fff;
    padding: 0 36px;
    h3 {
      border-bottom: 1px solid rgba(0, 0, 0, .06);
      font-size: 32px;
      padding: 32px 0;
      padding-left: 12px;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        display: block;
        width: 4px;
        height: 28px;
        background: #404040;
        border-radius: 4px;
      }
    }
  }
  .units {
    background: #fff;
    font-size: 24px;
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    padding-top: 24px;
    padding-bottom: 50px;
    i {
      font-size: 24px;
      // margin-left: 8px;
    }
  }
}
</style>
