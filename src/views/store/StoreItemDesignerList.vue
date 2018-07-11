<template>
  <div :class="{'designer-list': true, 'no-swiping': no}"
    ref="container">
    <ul ref="scrollContent"
      v-if="!noResult">
      <li v-for="(item ,idx) in designerList"
        :key="idx"
        @click="goDesignerIndex(item.id)">
        <img v-lazy="{src: item.avatar, loading: '~~img/errorImg2.jpg', error: '~~img/errorImg2.jpg'}" />
        <div class="designer-info">
          <h2>{{ item.nickname }}</h2>
          <p class="grade">
            <i class="iconfont icon-icon_stores_score"
              v-for="(value, index) in item.gradeObj.solid"
              :key="index"></i>
            <i class="iconfont icon-icon_stores_noScore"
              v-for="(value, index) in item.gradeObj.hollow"
              :key="index"></i>
            <span>{{ item.grade }}.0分</span>
          </p>
        </div>
        <div class="datum">
          <h3 class="fans">
            <p>{{ item.followCount || 0 }}</p>
            <span>粉丝</span>
          </h3>
          <h3 class="work">
            <p>{{ item.experience || 0 }}年</p>
            <span>从业年限</span>
          </h3>
        </div>
      </li>
      <li class="page-bottom"
        v-show="dataList.length">
        <img src="~~img/page_bottom.png" />
      </li>
    </ul>

    <p class="no-result"
      v-if="noResult">没有设计师</p>
  </div>
</template>

<script>
export default {
  name: 'StoreItemDesignerList',
  props: ["no", "store-id", "active"],
  data() {
    return {
      loaded: false,
      dataList: [],
      containerDom: null,
      scrollContentDom: null,
      noSwiping: true,
      noResult: false
    };
  },
  watch: {
    active: {
      handler(newVal) {
        if (newVal === 2 && !this.loaded) {
          this.getDesignerList();
          this.loaded = true;
        }
      },
      immediate: true
    }
  },
  computed: {
    designerList() {
      if (!this.dataList.length) return [];

      let arr = this.dataList.map((item, idx) => {
        let obj = {
          solid: this.dataList[idx].grade,
          hollow: 5 - this.dataList[idx].grade
        };
        item.gradeObj = obj;

        return item;
      });
      return arr;
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
    getDesignerList() {
      this.$http2(
        API.getDesignerListByStore,
        {
          merchantId: this.storeId,
          pageNum: 1,
          pageSize: 0
        },
        data => {
          if (data.data.list.length === 0) {
            this.noResult = true;
          } else {
            this.dataList = data.data.list;
          }
        },
        err => {
          this.toast(err.msg);
        }
      );
    },
    // 跳转设计师主页
    goDesignerIndex(id) {
      this.$emit("set-show-module", 2);
      this.$utils.openUrl("../../pages/designer/designer_index.html", {
        id
      });
    }
  }
};
</script>