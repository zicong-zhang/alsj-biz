<template>
  <div class="customer-list-item-list">
    <v-scroll class="scroll-container"
      :enabled="nextPage"
      :on-refresh="onRefresh"
      :on-load="onLoad">
      <ul>
        <li v-for="item in customerList"
          :key="item.id"
          @click="toCustomerDetail(item.id)">
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
    </v-scroll>

  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import imgPlaceholder from '~img/placeholder_user.png';

export default {
  name: 'customer-list-item-list',
  data() {
    return {
      nextPage: true,
      imgPlaceholder,
      isFinishLoad: false,
    };
  },
  computed: {
    ...mapState({
      customerList: state => state.customerModule.customerList,
    }),
  },
  watch: {
    isFinishLoad(val) {
      console.log('isFinishLoad:_____', val);
    },
  },
  created() {
    this.getDataList();
  },
  methods: {
    ...mapActions(['getCustomerList']),
    ...mapMutations(['INIT_CUSTOMER_LIST_PAGE_NUM']),
    getDataList() {
      return this.getCustomerList().then((res) => {
        this.nextPage = res.data.next;
      });
    },
    onRefresh() {
      this.nextPage = true;
      this.INIT_CUSTOMER_LIST_PAGE_NUM();
      return this.getDataList();
    },
    onLoad() {
      return this.getDataList();
    },
    toCustomerDetail(id) {
      this.$utils.go({
        name: 'customer-info',
        query: {
          id,
        },
      });
    },
  },
};
</script>
<style lang="scss">
.customer-list-item-list {
  height: 100%;
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
