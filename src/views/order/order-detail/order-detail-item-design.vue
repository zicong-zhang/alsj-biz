
<template>
  <div class="order-detail-item-design"
    v-if="orderDetailStatus >= 2">
    <H2 title="上传设计方案"></H2>

    <div class="design-list">

      <VUpload :files="designList"
        @on-del="delPic"
        @success="uploadSuccess" />

    </div>
  </div>
</template>

<script>
import H2 from "./order-detail-item-h2";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "OrderDetailItemDesign",
  components: {
    H2
  },
  data() {
    return {
      fileList: []
    };
  },
  computed: {
    ...mapGetters(["designList", "orderDetailStatus"])
  },
  methods: {
    ...mapActions([
      "updateDesignPic" // 修改设计方案图片
    ]),
    // 上传成功
    uploadSuccess(path) {
      const newArr = [].concat(this.designList, [path]);
      this.updateDesignPic(newArr);
    },
    // 删除图片
    delPic(idx) {
      let arr = this.designList.splice(idx, 1);
      console.log('arr:_____', idx, arr);
      this.updateDesignPic(arr);
    }
  }
};
</script>

<style lang="scss">
.order-detail-item-design {
  background: #fff;
  padding: 0 e(36px);
  margin-bottom: e(16px);
}
.design-list {
  width: 100%;
  padding-bottom: e(36px);
}
</style>
