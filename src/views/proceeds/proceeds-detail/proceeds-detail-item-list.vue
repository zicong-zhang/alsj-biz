<template>
  <div class="proceeds-detail-item-list">
    <v-scroll
      :enabled="nextPage"
      :on-refresh="init"
      :on-load="getData"
      class="scroll-container"
    >
      <h2>{{ title }}</h2>
      <ul>
        <list-item
          v-for="(item, idx) in list"
          :key="createKey(item.orderNo, idx)"
          :item="item"
          :type="type"
        />
      </ul>
    </v-scroll>
  </div>
</template>

<script>
import ListItem from './proceeds-detail-item-list-item';

export default {
  name: 'proceeds-detail-item-list',
  components: {
    ListItem
  },
  props: {
    title: String,
    type: Number,
    page: Number,
    load: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      list: [],
      nextPage: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    init() {
      console.log('3333:_____', 3333);
      this.nextPage = true;
      this.$emit('update-page-num', 'init');
      return this.getData();
    },
    getData() {
      return this.load().then(res => {
        if (this.page == 1) this.list = [];

        const { list, next } = res.data;
        this.list = this.list.concat(list);
        this.nextPage = next;
        next && this.updatePageNum();
      });
      /* this.$http('/statistic/getAllReceiptItemList', {
          merchantId: 1,
          month: 6,
          pageNum: 1,
          pageSize: 40,
          year: 2018
        }).then((res) => {
          this.list = res.data.list;
        }); */
    },
    updatePageNum(isInit) {
      this.$emit('update-page-num', isInit);
    },
    createKey(uuid, idx) {
      const config = ['proceeds-detail-actual-income-', 'proceeds-detail-wait-income-'];
      return `${config[this.type]}${uuid}${idx}`;
    }
  }
};
</script>
<style lang="scss">
  .proceeds-detail-item-list {
    overflow: hidden;
    height: calc(100% - 287px);
    h2 {
      background: #fff;
      font-size: 32px;
      font-weight: bold;
      padding: 32px 0;
      padding-left: 48px;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        left: 36px;
        top: 50%;
        transform: translateY(-50%);
        display: block;
        width: 4px;
        height: 28px;
        background: #333;
        border-radius: 4px;
      }
    }
    ul {
      background: #fff;
      padding: 0 36px;
    }
  }
</style>
