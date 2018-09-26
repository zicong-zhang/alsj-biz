<template>
  <div class="view-performnace-total">
    <v-header title="总业绩" />
    <div class="content">
      <i class="gap"></i>
      <section class="title">
        <h3>年度总业绩106万</h3>
      </section>
      <div class="units">
        <div class="picker"
          @click="showDatePicker">
          <span>年份({{ year }})</span>
          <i class="iconfont icon-bottomnew"></i>
        </div>
        <p>单位：万元</p>
      </div>
      <div class="chart-container">
        <div class="chart"
          ref="chart"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import echarts from 'echarts';

export default {
  name: 'view-performnace-total',
  data() {
    return {
      year: '',
      chart: '',
      performanceList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  },
  computed: {
    dataList() {
      if (!this.performanceList) return [0];
    },
  },
  activated() {
    this.year = new Date().getFullYear();
    this.init();
  },
  methods: {
    ...mapActions(['getPerformanceTotalList']),
    showDatePicker() {
      this.$DatePicker({
        type: 'year-month',
        confirm: (value) => {
          this.year = value.getFullYear();
          this.init();
        },
      });
    },
    init() {
      this.getPerformanceTotalList(this.year).then((res) => {
        const list = res.data.list;
        if (list.length) {
          list.forEach((item) => {
            const idx = item.month - 1;
            this.performanceList.splice(idx, 1, item.amount / 10000);
          });
        } else {
          this.performanceList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        this.$nextTick(() => {
          this.chart ? this.setChartOpt() : this.initChart();
        });
      });
    },
    initChart() {
      this.charts = echarts.init(this.$refs.chart);
      this.setChartOpt();
      this.$once('hook:deactivated', () => {
        this.charts.dispose();
      });
    },
    setChartOpt() {
      this.charts.setOption({
        // 动画类型
        backOut(k) {
          let val = k;
          const s = 1.70158;
          return --val * val * ((s + 1) * val + s) + 1;
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          x: 48, // 图标距离上下左右的距离
          x2: 18,
          y: 10,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          offset: 18, // 文字距离轴线的偏移
          // 网格线
          splitLine: {
            show: true, // 去除网格线
            // 网格线颜色
            lineStyle: {
              color: ['#f2f2f2'],
            },
          },
          // splitArea : {show : true},//保留网格区域
          // 轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: '#999',
            },
          },
          // 轴线条颜色
          axisLine: {
            lineStyle: {
              color: '#f2f2f2',
              // type: 'solid',
              // width:'2'
            },
          },
          axisTick: {
            show: false, // 是否显示坐标轴刻度。
          },
        },
        yAxis: {
          type: 'value',
          offset: 5, // 文字距离轴线的偏移
          // 网格线
          splitLine: {
            show: true, // 去除网格线
            // 网格线颜色
            lineStyle: {
              color: ['#f2f2f2'],
            },
          },
          // splitArea : {show : true},//保留网格区域
          // 轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: '#999',
            },
          },
          // 轴线条颜色
          axisLine: {
            lineStyle: {
              color: '#fff',
              // type: 'solid',
              // width:'2'
            },
          },
          axisTick: {
            show: false, // 是否显示坐标轴刻度。
          },
        },
        series: [
          {
            data: this.performanceList,
            type: 'line',
            symbolSize: 8, // 圆点
            itemStyle: {
              normal: {
                color: '#39f', // 设置折线折点颜色
                lineStyle: {
                  color: '#39f', // 设置折线线条颜色
                },
              },
            },
            areaStyle: {
              normal: {
                // 配置渐变
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'RGBA(51, 153, 255, 0.2)',
                  },
                  {
                    offset: 1,
                    color: 'RGBA(51, 153, 255, 0)',
                  },
                ]),
              },
            },
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss">
.view-performnace-total {
  .title {
    background: #fff;
    padding: 0 36px;
    h3 {
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      font-size: 32px;
      padding: 32px 0;
      padding-left: 12px;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        display: block;
        width: 4px;
        height: 28px;
        background: #404040;
        border-radius: 4px;
      }
    }
  }
  .units {
    background: #fff;
    font-size: 24px;
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    i {
      font-size: 24px;
    }
    p,
    .picker {
      padding-top: 24px;
      padding-bottom: 50px;
    }
  }
  .chart-container {
    background: linear-gradient(to right, #2985ff, #3dadff);
    height: 500px;
    background: #fff;
    padding-left: 36px;
    padding-right: 18px;
  }
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
