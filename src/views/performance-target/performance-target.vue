<template>
  <div class="view-performance-target">
    <v-header title="业绩目标" />

    <div class="content">
      <i class="gap"></i>
      <div class="container">
        <header>
          <!-- 选择年份 -->
          <div class="select-year"
            @click="showDatePicker">
            <span>月份</span>
            <span>({{ year }})</span>
            <i class="icon i-bottom"></i>
          </div>

          <!-- 计划业绩金额 -->
          <p>计划业绩金额(元)</p>

        </header>

        <div class="edit-plan-list">
          <ul>
            <li>
              <label>1月</label><input type="text"
                v-model="janAmount"
                placeholder="0"
                @input="limitInput('janAmount')"
                @focus="unFormatNum('janAmount')"
                @blur="formatNum('janAmount')" />
            </li>
            <li>
              <label>2月</label><input type="text"
                v-model="fabAmount"
                placeholder="0"
                @input="limitInput('fabAmount')"
                @focus="unFormatNum('fabAmount')"
                @blur="formatNum('fabAmount')" />
            </li>
            <li>
              <label>3月</label><input type="text"
                v-model="marAmount"
                placeholder="0"
                @input="limitInput('marAmount')"
                @focus="unFormatNum('marAmount')"
                @blur="formatNum('marAmount')" />
            </li>
            <li>
              <label>4月</label><input type="text"
                v-model="aprAmount"
                placeholder="0"
                @input="limitInput('aprAmount')"
                @focus="unFormatNum('aprAmount')"
                @blur="formatNum('aprAmount')" />
            </li>
            <li>
              <label>5月</label><input type="text"
                v-model="mayAmount"
                placeholder="0"
                @input="limitInput('mayAmount')"
                @focus="unFormatNum('mayAmount')"
                @blur="formatNum('mayAmount')" />
            </li>
            <li>
              <label>6月</label><input type="text"
                v-model="junAmount"
                placeholder="0"
                @input="limitInput('junAmount')"
                @focus="unFormatNum('junAmount')"
                @blur="formatNum('junAmount')" />
            </li>
            <li>
              <label>7月</label><input type="text"
                v-model="julAmount"
                placeholder="0"
                @input="limitInput('julAmount')"
                @focus="unFormatNum('julAmount')"
                @blur="formatNum('julAmount')" />
            </li>
            <li>
              <label>8月</label><input type="text"
                v-model="augAmount"
                placeholder="0"
                @input="limitInput('augAmount')"
                @focus="unFormatNum('augAmount')"
                @blur="formatNum('augAmount')" />
            </li>
            <li>
              <label>9月</label><input type="text"
                v-model="sepAmount"
                placeholder="0"
                @input="limitInput('sepAmount')"
                @focus="unFormatNum('sepAmount')"
                @blur="formatNum('sepAmount')" />
            </li>
            <li>
              <label>10月</label><input type="text"
                v-model="octAmount"
                placeholder="0"
                @input="limitInput('octAmount')"
                @focus="unFormatNum('octAmount')"
                @blur="formatNum('octAmount')" />
            </li>
            <li>
              <label>11月</label><input type="text"
                v-model="novAmount"
                placeholder="0"
                @input="limitInput('novAmount')"
                @focus="unFormatNum('novAmount')"
                @blur="formatNum('novAmount')" />
            </li>
            <li>
              <label>12月</label><input type="text"
                v-model="decAmount"
                placeholder="0"
                @input="limitInput('decAmount')"
                @focus="unFormatNum('decAmount')"
                @blur="formatNum('decAmount')" />
            </li>
          </ul>
        </div>

        <div class="year-amount-total">
          <span>全年</span>
          <p>{{ formatNum('total') }}</p>
        </div>
      </div>
      <i class="gap"></i>

    </div>

    <div class="handle-btns">
      <p @click="cancel">取消</p>
      <p @click="updateTargetData">确定目标</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'performance-target',
  data() {
    return {
      maxLength: 10, // 输入金额位数限制
      year: 2019, // 当前选中年份
      id: '', // 店铺目标id

      janAmount: '',
      fabAmount: '',
      marAmount: '',
      aprAmount: '',
      mayAmount: '',
      junAmount: '',
      julAmount: '',
      augAmount: '',
      sepAmount: '',
      octAmount: '',
      novAmount: '',
      decAmount: '',
      total: '0'
    };
  },
  created() {
    this.year = new Date().getFullYear();
    this.getDataList();
  },
  methods: {
    ...mapActions([
      'getOnePerformanceTargetList', // 获取店铺某一年的业绩目标列表
      'updatePerformTargetList', // 更新店铺某一年业绩目标列表
      'getStoreSaleTarget' // 获取店铺目标金额, 调用接口刷新数据
    ]),
    showDatePicker() {
      const year = new Date().getFullYear();
      const arr = Array(5).fill(year);
      const prev = arr.map((item, idx) => {
        return {
          text: year - (5 - idx),
          value: year - (5 - idx)
        };
      })
      const next = arr.map((item, idx) => {
        return {
          text: year + idx,
          value: year + idx
        };
      })

      console.log('prev. next:_____', prev.next);

      this.$Picker({
        title: '选择年份',
        list: [
          {
            values: [...prev, ...next]
          }
        ],
        onConfirm: ([{ value }]) => {
          console.log('value:_____', value);
          this.year = value;
          this.getDataList();
        }
      });
    },
    getDataList() {
      this.getOnePerformanceTargetList(this.year).then((res) => {
        const data = res.data.merchantGoalExt;
        this.id = data.id;
        this.total = data.totalGoalAmount;
        this.setAmount(data);
      });
    },
    // 设置数据中已存在金额
    setAmount(data) {
      this.formatNum('janAmount', data.janAmount || 0);
      this.formatNum('fabAmount', data.fabAmount || 0);
      this.formatNum('marAmount', data.marAmount || 0);
      this.formatNum('aprAmount', data.aprAmount || 0);
      this.formatNum('mayAmount', data.mayAmount || 0);
      this.formatNum('junAmount', data.junAmount || 0);
      this.formatNum('julAmount', data.julAmount || 0);
      this.formatNum('augAmount', data.augAmount || 0);
      this.formatNum('sepAmount', data.sepAmount || 0);
      this.formatNum('octAmount', data.octAmount || 0);
      this.formatNum('novAmount', data.novAmount || 0);
      this.formatNum('decAmount', data.decAmount || 0);
    },
    limitInput(name) {
      this[name] = this[name]
        .toString()
        .replace(/\D/g, '')
        .slice(0, 8);
    },
    // 某个 input 失去焦点时 进行格式化
    formatNum(name, value) {
      const val = typeof value !== 'undefined' ? value : this[name];
      this[name] = this.$utils.numInsertSymbol(val);
      return this[name];
    },
    // 某个 input 获取焦点时去除格式化
    unFormatNum(name) {
      this[name] = this[name].replace(/\D/g, '');
    },
    // 提交更新目标数据
    updateTargetData() {
      this.updatePerformTargetList(this.$data).then(() => {
        this.getStoreSaleTarget().then(() => {
          this.$Toast('修改成功');
          // 因涉及进度的百分比字符串，并且月份的数据格式过于分散，因此采用重调接口
          this.$utils.back();
        });
      });
    },
    // 取消修改
    cancel() {
      this.$utils.back();
    }
  }
};
</script>
<style lang="scss">
.view-performance-target {
  display: flex;
  flex-flow: column;
  .content {
    // background: #fff;
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
  .container {
    background: #fff;
  }
  .select-year {
    height: 100%;
    line-height: 82px;
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
    label {
      font-size: 24px;
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
      &::-webkit-input-placeholder {
        color: #333;
      }
    }
  }
  .year-amount-total {
    height: 82px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    margin: 0 36px;
  }
  .handle-btns {
    height: 98px;
    display: flex;
    p {
      flex: 1;
      line-height: 98px;
      text-align: center;
      font-size: 32px;
      background: #fff;
      &:last-child {
        color: #fff;
        background: linear-gradient(to left, #2985ff, #3dadff);
      }
    }
  }
}
</style>
