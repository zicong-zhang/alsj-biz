<template>
  <div class="view-performance-target">
    <v-header title="业绩目标" />

    <div class="content">
      <i class="gap"></i>
      <header>
        <!-- 选择年份 -->
        <div class="select-year">
          <span>月份</span>
          <span>(2018)</span>
          <i class="iconfont icon-bottomnew"></i>
        </div>

        <!-- 计划业绩金额 -->
        <p>计划业绩金额(元)</p>

      </header>

      <div class="edit-plan-list">
        <ul>
          <li :class="{empty: janAmount == 0}">
            <label>1月</label><input type="text"
              :maxlength="maxLength"
              v-model="janAmount">
          </li>
          <li :class="{empty: fabAmount == 0}">
            <label>2月</label><input type="text"
              :maxlength="maxLength"
              v-model="fabAmount">
          </li>
          <li :class="{empty: marAmount == 0}">
            <label>3月</label><input type="text"
              :maxlength="maxLength"
              v-model="marAmount">
          </li>
          <li :class="{empty: aprAmount == 0}">
            <label>4月</label><input type="text"
              :maxlength="maxLength"
              v-model="aprAmount">
          </li>
          <li :class="{empty: mayAmount == 0}">
            <label>5月</label><input type="text"
              :maxlength="maxLength"
              v-model="mayAmount">
          </li>
          <li :class="{empty: junAmount == 0}">
            <label>6月</label><input type="text"
              :maxlength="maxLength"
              v-model="junAmount">
          </li>
          <li :class="{empty: julAmount == 0}">
            <label>7月</label><input type="text"
              :maxlength="maxLength"
              v-model="julAmount">
          </li>
          <li :class="{empty: augAmount == 0}">
            <label>8月</label><input type="text"
              :maxlength="maxLength"
              v-model="augAmount">
          </li>
          <li :class="{empty: sepAmount == 0}">
            <label>9月</label><input type="text"
              :maxlength="maxLength"
              v-model="sepAmount">
          </li>
          <li :class="{empty: octAmount == 0}">
            <label>10月</label><input type="text"
              :maxlength="maxLength"
              v-model="octAmount">
          </li>
          <li :class="{empty: novAmount == 0}">
            <label>11月</label><input type="text"
              :maxlength="maxLength"
              v-model="novAmount">
          </li>
          <li :class="{empty: decAmount == 0}">
            <label>12月</label><input type="text"
              :maxlength="maxLength"
              v-model="decAmount">
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "performance-target",
  data() {
    return {
      maxLength: 10,
      janAmount: "22222", 
      fabAmount: "22222",
      marAmount: "0",
      aprAmount: "0",
      mayAmount: "0",
      junAmount: "0",
      julAmount: "0",
      augAmount: "0",
      sepAmount: "0",
      octAmount: "0",
      novAmount: "0",
      decAmount: "0"
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss">
.view-performance-target {
  display: flex;
  flex-flow: column;
  .content {
    background: #fff;
    flex: 1;
    @include scroll(y);
    header {
      height: 82px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24px;
      border-bottom: 2px solid rgba(0, 0, 0, 0.06);
      color: #999;
      margin: 0 36px;
      margin-bottom: 24px;
    }
  }
  .edit-plan-list {
    padding: 0 36px;
    .empty {
      input {
        color: #333;
      }
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 24px;
    }
    input {
      width: 560px;
      height: 72px;
      background: #f5f5f5;
      border-radius: 8px;
      box-sizing: border-box;
      color: #39f;
      font-size: 24px;
      text-align: right;
      padding: 20px 24px;
    }
  }
}
</style>
