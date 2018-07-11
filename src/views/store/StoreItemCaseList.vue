<template>
  <div :class="{'case-list': true, 'no-swiping': no}"
    ref="container"
    v-scroll="scrollConfig">
    <ul class="clearfix scroll-container"
      ref="scrollContent"
      v-if="!noResult">
      <li v-for="(item, idx) in dataList"
        :key="item.id"
        @click.stop="goCaseDetail(item.id)">
        <img :src="item.caseCover"
          v-img-err="'~~img/storeBg.jpg'"
          v-if="idx < 3" />
        <img v-lazy="{src: item.caseCover, loading: '~~img/storeBg.jpg', error: '~~img/storeBg.jpg'}"
          v-else/>
        <div class="case-info">
          <h3>{{ (item.designerName || '').slice(0, 8) }}</h3>
          <h2>『 {{ item.styleName }} 』</h2>
          <p>{{ item.caseTitle }}</p>
        </div>
      </li>
      <li class="loading"
        ref="loading"
        v-show="loading"></li>
      <li class="page-bottom"
        v-if="noMore">
        <img src="~~img/page_bottom.png" />
      </li>
    </ul>

    <p class="no-result"
      v-if="noResult">没有案例</p>
  </div>
</template>

<script>
export default {
  name: 'StoreItemCaseList',
  props: ["no", "store-id", "active"],
  data() {
    return {
      loaded: false,
      dataList: [],
      containerDom: null,
      scrollContentDom: null,
      noSwiping: true,
      scrollConfig: {
        api: 'getCaseListByStore',
        fn: this.getCaseList
      },
      loading: false,

      pageNum: 1,
      pageSize: 7,

      noResult: false,
      noMore: false
    };
  },
  watch: {
    active: {
      handler(newVal) {
        if (newVal === 1 && !this.loaded) {
          this.getCaseList();
          this.loaded = true;
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.listenScroll();
      // this.$utils.createLoading(this.$refs.loading);
    });
  },
  methods: {
    getCaseList() {
      if (this.noResult || this.noMore) return false;
      this.loading = true;
      this.$http2(
        'getCaseListByStore',
        {
          merchantId: this.storeId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        },
        data => {
          let { list, next } = data.data;
          this.successGetData(list, next);
        },
        err => {
          this.$toast(err.msg);
        },
        {
          autoLoading: "no",
          noRepeat: true,
          complete: data => {
            this.loading = false;
          }
        }
      ).then(data => {
        console.log('1111:_____', data);
      }, err => {
        console.log('22222:_____', err);
      })
    },
    successGetData(list, next) {
      if (!list.length && !this.dataList.length) {
        this.noResult = true;
        return;
      }
      if (!next) this.noMore = true;

      this.pageNum++;
      this.dataList = this.dataList.concat(list);
    },
    // 跳转案例详情
    goCaseDetail(id) {
      this.$emit("set-show-module", 1);
      this.$utils.openUrl("../../pages/case/case_detail.html", {
        id
      });
    },
    // 监听滚动
    listenScroll() {
      this.containerDom = this.$refs.container;
      this.scrollContentDom = this.$refs.scrollContent;

      this.$refs.container.addEventListener("scroll", e => {
        this.$emit("fixed-gauge", e.target.scrollTop);
      });
    }
  }
};
</script>