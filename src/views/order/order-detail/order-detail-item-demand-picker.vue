<template>
  <div class="order-detail-item-demand-picker">
    <div class="cover"
      v-stop-cover
      v-if="show"
      @click.self="closePicker"></div>

    <transition name="show-picker">
      <div class="demand-picker-container"
        v-if="show">

        <!-- 标题 -->
        <div class="demand-picker-title">
          <div>
            <i class="iconfont icon-btn_all_close1"
              @click="closePicker"></i>
            <h4>选择客户的定制需求</h4>
            <span class="demand-picker-save-btn"
              @click="saveDemand">保存</span>
          </div>
          <i class="horizon-bar"></i>
        </div>

        <!-- 空间 -->
        <div class="demand-picker-space-list">
          <ul>
            <li :class="{'space-active': activeSpace == idx}"
              v-for="(item, idx) in spaceList"
              :key="`space${item.id}`"
              @click="selectSpace(idx)">
              <p>{{ item.name }}</p>
              <span v-show="item.activeQty">·{{ item.activeQty }}</span>
            </li>
          </ul>
        </div>

        <!-- 功能列表 -->
        <i class="horizon-bar"></i>
        <div class="demand-picker-function-list">
          <ul v-if="spaceList">
            <li :class="{'function-active': item.active, 'demand-function-list': true}"
              v-for="(item, idx) in functionList[activeSpace]"
              :key="`functionList${item.id}`"
              @click="selectFunction(item, idx)">{{ item.name }}</li>
          </ul>
        </div>
      </div>

    </transition>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'OrderDetailItemDemandPicker',
  props: {
    show: {
      type: Boolean,
      defalut: false,
    },
  },
  data() {
    return {
      isShowDemandPicker: false,
      dataLoaded: false, // 是否已经请求数据
      activeSpace: 0, // 当前选中的空间名称 的下标
      spaceList: [],
      functionList: [],
    };
  },
  computed: {
    spaces() {
      return this.$store.state.orderDetailModule.spaceList;
    },
    functions() {
      return this.$store.state.orderDetailModule.functionList;
    },
  },
  watch: {
    // 监听本组件是否第一次展示
    show(newVal) {
      if (!this.dataLoaded && newVal) {
        this.dataLoaded = true;
        this.getSpaceList();
      }
    },
    spaces(newVal) {
      this.spaceList = JSON.parse(JSON.stringify(newVal));
    },
    functions(newVal) {
      this.functionList = JSON.parse(JSON.stringify(newVal));
    },
  },
  methods: {
    ...mapActions([
      'getSpaceList', // 获取空间列表
      'updateDemand', // 保存修改定制需求
    ]),
    // 关闭选择器
    closePicker() {
      this.functionList = JSON.parse(JSON.stringify(this.functions));
      this.$emit('close');
    },
    // 选中空间
    selectSpace(idx) {
      this.activeSpace = idx;
    },
    // 选中功能
    selectFunction(item, idx) {
      item.active = !item.active;
      this.functionList[this.activeSpace].splice(idx, item);
    },
    // 保存选中的定制需求
    saveDemand() {
      this.$emit('close');
      const arr = [];
      this.functionList.forEach((item) => {
        item.forEach((value) => {
          value.active && arr.push(value);
        });
      });
      this.updateDemand(arr).then(this.$Toast('修改成功'));
    },
  },
};
</script>
<style lang="scss">
.order-detail-item-demand-picker {
  .cover {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 50;
    background: rgba(0, 0, 0, 0.6);
  }
}
.demand-picker-container {
  width: 100%;
  height: 284px * 2;
  background: #fff;
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 51;
}
.demand-picker-title {
  div {
    height: 98px;
    line-height: 98px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h4 {
    font-size: 30px;
    flex: 1;
    text-align: center;
  }
  .icon-btn_all_close1 {
    display: block;
    width: 100px;
    color: #999;
    font-size: 22px;
    padding-left: 36px;
  }
  span {
    display: block;
    width: 120px;
    height: 48px;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
    border: 1px solid $main;
    border-radius: 8px;
    color: $main;
    margin-right: 36px;
  }
}
.demand-picker-space-list {
  @include scroll(x);
  ul {
    display: flex;
    padding-left: 36px;
  }
  li {
    height: 86px;
    flex: none;
    display: flex;
    align-items: center;
    color: #999;
    padding-right: 50px;
  }
  p {
    font-size: 32px;
    font-weight: normal;
  }
  span {
    font-size: 20px;
    line-height: 1.7;
  }
  .space-active {
    color: $main;
  }
}

.demand-picker-function-list {
  height: 100%;
  @include scroll(y);
  ul {
    min-height: 100%;
    display: flex;
    flex-flow: wrap;
    align-content: flex-start;
    // justify-content: space-between;
    padding: 0 36px;
    padding-top: 36px;
    padding-bottom: 24px;
  }
  li {
    flex: none;
    width: 210px;
    height: 64px;
    text-align: center;
    box-sizing: border-box;
    color: #333;
    margin: 0;
    margin-bottom: 24px;
    margin-right: 24px;
    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
  .function-active {
    background: $main;
    color: #fff;
  }
}
</style>
