<template>
  <div class="order-detail-item-demand-picker">
    <transition name="v-cover">
      <div class="cover"
        v-stop-cover
        v-show="show"
        @click.self="closePicker"></div>
    </transition>

    <transition name="show-picker">
      <div class="demand-picker-container"
        v-show="show">

        <!-- 标题 -->
        <div class="demand-picker-title">
          <div>
            <i class="icon i-btn_all_close1"
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
              v-for="(item, idx) in spaces"
              :key="`space-${item.id}`"
              @click="selectSpace(idx)">
              <p>{{ item.name }}</p>
              <span v-show="item.activeQty">·{{ item.activeQty }}</span>
            </li>
          </ul>
        </div>

        <!-- 功能列表 -->
        <i class="horizon-bar"></i>
        <div class="demand-picker-function-list">
          <ul v-if="spaces">
            <li :class="{
                'function-active': selectedFunctionList.includes(item.id),
                'demand-function-list': true
              }"
              v-for="item in functions[activeSpace]"
              :key="`functionList-${item.id}`"
              @click="selectFunction(item.id)">{{ item.name }}</li>
          </ul>
        </div>
      </div>

    </transition>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'OrderDetailItemDemandPicker',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowDemandPicker: false,
      dataLoaded: false, // 是否已经请求数据
      activeSpace: 0, // 当前选中的空间名称 的下标
      selectedFunctionList: [], // 临时选中的功能
      allFunctions: [] // 所有功能项 用于提交时通过 id 提取功能项，一维数组
    };
  },
  computed: {
    ...mapGetters([
      'demands', // 曾经提交的定制需求
      'spaces', // 空间列表
      'functions' // 功能列表
    ]),
    // 曾经提交的定制需求提取的 id
    alreadySelectedIds() {
      if (this.demands.length) {
        return this.demands.map(item => item.id);
      }
      return [];
    }
  },
  watch: {
    // 监听本组件是否第一次展示
    show(newVal) {
      if (!this.dataLoaded && newVal) {
        this.dataLoaded = true;
        this.getSpaceList().then(this.copyAlreadyIdsToSelected);
      } else {
        this.copyAlreadyIdsToSelected();
      }
    },
    functions(newVal) {
      const list = this.functions.flat();
      this.$set(this.$data, 'allFunctions', list);
    }
  },
  methods: {
    ...mapActions([
      'getSpaceList', // 获取空间列表
      'updateDemand' // 保存修改定制需求
    ]),
    ...mapMutations([
      'UPDATE_DEMAND' // 修改定制需求展示列表
    ]),
    // 关闭选择器
    closePicker() {
      const list = this.selectedFunctionList;
      this.selectedFunctionList = [];
      this.activeSpace = 0;
      this.$emit('close');
    },
    copyAlreadyIdsToSelected() {
      if (this.alreadySelectedIds.length) {
        this.selectedFunctionList = this.$utils.copyArr(this.alreadySelectedIds);
      }
    },
    // 选中空间
    selectSpace(idx) {
      this.activeSpace = idx;
    },
    // 选中功能
    selectFunction(id) {
      const idx = this.selectedFunctionList.indexOf(id);

      if (idx > -1) {
        this.selectedFunctionList.splice(idx, 1);
      } else {
        this.selectedFunctionList.push(id);
      }
    },
    // 保存选中的定制需求
    saveDemand() {
      this.updateDemand(this.selectedFunctionList)
        .then(() => {
          const list = [];
          this.allFunctions.forEach(item => {
            this.selectedFunctionList.forEach(id => {
              if (id == item.id) list.push(item);
            });
          });

          this.UPDATE_DEMAND(list);
          this.$Toast('修改成功');
          this.$emit('close');
        })
        .catch(err => {
          this.$emit('close');
          this.$Toast(err.msg);
        });
    }
  }
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
