<template>
  <div class="view-product-center">
    <v-header title="产品中心">
      <div class="right-btn btn"
        slot="right-one"
        @click="changeMode">
        <p>编辑</p>
      </div>
    </v-header>
    <div class="content">
      <i class="gap"></i>
      <ul v-if="productList.length">
        <li v-for="item in productList"
          :key="`product-list-item${item.id}`"
          class="item"
          @click="selectProductItem(item.id)">
          <i v-show="editMode"
            :class="{
              icon: true, 
              'i-danxuanweixuanzhong': !selectedList.includes(item.id),
              'i-danxuanxuanzhong': selectedList.includes(item.id)
            }"></i>
          <v-img :src="item.goodsCover"
            :loading="defaultImg" />
          <section>
            <header>{{ item.goodsName }}</header>
            <p v-if="item">
              <span v-for="(value, idx) in item.spaceName"
                :key="`product-list-item-space-list${idx}`">{{ value }}</span>
            </p>
          </section>
        </li>
      </ul>
    </div>
    <nav v-show="editMode"
      class="handle-bar">
      <i :class="{
          icon: true, 
          'i-danxuanweixuanzhong': selectedList.length !== productList.length && productList.length !== 0,
          'i-danxuanxuanzhong': selectedList.length === productList.length && productList.length !== 0
        }"></i>
      <p>全选</p>
      <div class="del-btn"
        @click="delProduct">
        <span>删除</span>
        <span v-show="selectedList.length"
          key="product-center-del-btn">({{ selectedList.length }})</span>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import loginImg from '~img/login_bg1.png';
import defaultImg from '~img/placeholder/store_logo.png';

export default {
  name: 'view-product-center',
  data() {
    return {
      pageNum: 1,
      defaultImg,
      productList: [],
      editMode: false, // 编辑模式
      selectedList: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions([
      'getProductList',
      'delProduct'
    ]),
    init() {
      this.pageNum = 1;
      this.getProductListData();
    },
    getProductListData() {
      this.getProductList(this.pageNum).then(res => {
        this.productList = res.data.list;
      });
    },
    // 删除模式
    changeMode(item) {
      this.editMode = !this.editMode;
      this.selectedList.splice(0, this.selectedList.length);
    },
    // 选中产品
    selectProductItem(id) {
      const idx = this.selectedList.indexOf(id);
      if (idx > -1) {
        this.selectedList.splice(idx, 1);
      } else {
        this.selectedList.push(id);
      }
    },
    // 删除产品
    delProduct() {
      const list = this.selectedList;
      if (list.length) {
        this.delProduct(list)
          .then(res => {
            const newList = this.productList.filter(item => this.selectedList.some(value => item.id == value))
            this.$set(this.$data, 'productList', newList);
            this.$Toast('删除成功');
          })
      } else {
        this.$Toast('请选择需要删除的产品');
      }
    }
  }
};
</script>
<style lang="scss">
.view-product-center {
  display: flex;
  flex-flow: column;
  .content {
    flex: 1;
    @include scroll(y);
  }
  .right-btn {
    left: auto;
    right: 0px;
    font-size: 24px;
    padding-right: 36px;
    p {
      line-height: 88px;
    }
  }
  .v-img {
    flex: none;
    width: 180px;
    height: 120px;
    border-radius: 8px;
    margin-right: 24px;
  }
  .item {
    display: flex;
    align-items: center;
    background: #fff;
    overflow: hidden;
    padding: 32px 36px;
    position: relative;
    &:not(:last-child) {
      &:after {
        content: '';
        display: block;
        height: 1px;
        background: #eaeaea;
        position: absolute;
        bottom: 0;
        left: 36px;
        right: 36px;
        z-index: 30;
      }
    }
    section {
      flex: 1;
      height: 120px;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
    }
    header {
      font-size: 32px;
      @include over(2);
      margin-bottom: 12px;
    }
    p {
      display: flex;
      height: 36px;
      overflow: hidden;
      flex-flow: wrap;
    }
    span {
      display: inline-block;
      height: 32px;
      line-height: 32px;
      flex: none;
      background: #f5f5f5;
      border-radius: 32px;
      color: #c7c7c7;
      font-size: 20px;
      padding: 0 16px;
      padding-top: 2px;
      margin-right: 16px;
      margin-bottom: 16px;
    }
  }
  .icon {
    flex: none;
    margin-right: 30px;
  }
  .i-danxuanweixuanzhong {
    color: #c7c7c7;
  }
  .i-danxuanxuanzhong {
    color: $main;
  }
  .handle-bar {
    height: 100px;
    line-height: 100px;
    background: #fff;
    border-top: 1px solid #eaeaea;
    font-size: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 36px;
    p {
      flex: 1;
    }
  }
  .del-btn {
    flex: none;
    display: block;
    width: 250px;
    height: 100px;
    line-height: 100px;
    background: $main;
    color: #fff;
    text-align: center;
  }
}
</style>
