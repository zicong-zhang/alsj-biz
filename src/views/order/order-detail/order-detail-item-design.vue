
<template>
  <div class="order-detail-item-design"
    v-if="orderDetailStatus >= 2">
    <H2 title="上传设计方案"></H2>

    <div class="design-list">

      <v-upload :files="designList"
        @on-del="delPic"
        @success="uploadSuccess" />

    </div>
  </div>
</template>

<script>
import H2 from './order-detail-item-h2';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'OrderDetailItemDesign',
  components: {
    H2
  },
  data() {
    return {
      fileList: []
    };
  },
  computed: {
    ...mapGetters(['designList', 'orderDetailStatus'])
  },
  methods: {
    ...mapActions([
      'updateDesignPic' // 修改设计方案图片
    ]),
    // 上传成功
    uploadSuccess(path) {
      const newArr = [].concat(this.designList, [path]);
      this.updateDesignPic(newArr);
    },
    // 删除图片
    delPic(idx) {
      const newArr = [...this.designList];
      newArr.splice(idx, 1);
      this.updateDesignPic(newArr);
    }
  }
};
</script>

<style lang="scss">
.order-detail-item-design {
  background: #fff;
  margin-bottom: 16px;
  .order-detail-item-h2 {
    margin: 0 36px;
  }
}
.design-list {
  width: 100%;
  padding-bottom: 36px;
}
</style>
