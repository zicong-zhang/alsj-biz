<template>
  <div class="view-select-staff">
    <v-header title="添加店员" />
    <i class="gap"></i>
    <div class="content">
      <div class="title">
        <h2>选择店员职位</h2>
        <p @click="toCheckExample"><i class="icon i-jingshigantanhao"></i><span>查看权限说明</span></p>
      </div>
      <ul class="job-list">
        <li v-for="(item, idx) in jobList"
          :key="idx"
          @click="toAddStaff(item)">
          <div class="job-name">
            <img :src="item.img" />
            <span>添加{{ item.name }}</span>
          </div>
          <p class="job-desc">{{ item.desc }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'view-select-staff',
  data() {
    return {
      jobList: [{
        img: require('~img/staff/icon_addShopAssistant_boss.png'),
        name: '店长',
        desc: '当有店员离职（删除店员）时，离职店员的订单和客户自动优先移交给店长，由店长自行分配给其他店员继续跟进。店长离职时，其订单和客户自动移交给店铺所有者。',
      }, {
        img: require('~img/staff/icon_addShopAssistant_lead.png'),
        name: '导购',
        desc: '引导顾客促成订单交易，接待店铺的客户，与店长和设计师一起完成销售目标，配合店长的工作。',
      }, {
        img: require('~img/staff/icon_addShopAssistant_designer.png'),
        name: '设计师',
        desc: '具备出设计方案能力；拥有设计师角色的店员，会展示在阿拉私家消费者端APP的店铺主页->设计师栏目下，方便消费者找到喜欢的设计师进行沟通；拥有专属的设计师主页，便于设计师展示其设计能力，以便更好地招揽客户。',
      }],
    };
  },
  created() {},
  methods: {
    // 查看权限说明
    toCheckExample() {
      this.$utils.go({
        // ...
      })
    },
    // 添加店员
    toAddStaff() {
      this.$utils.go({
        name: 'add-staff',
      })
    },
  },
};
</script>
<style lang="scss">
.view-select-staff {
  display: flex;
  flex-flow: column;
  .content {
    flex: 1;
    background: #fff;
    padding: 0 36px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 95px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    margin-bottom: 40px;
    h2 {
      font-size: 32px;
      padding-left: 16px;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        width: 4px;
        height: 28px;
        background: #333;
        border-radius: 4px;
      }
    }
    p {
      height: 100%;
      display: flex;
      align-items: center;
      color: $main;
    }
    i {
      color: $main;
      margin-right: 8px;
    }
  }
  .job-list {
    li {
      display: flex;
      height: 204px;
      border-radius: 8px;
      background: #E5F2FF;
      margin-bottom: 24px;
    }
  }
  .job-name {
    flex: none;
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 166px;
    box-sizing: border-box;
    background: linear-gradient(to bottom, #3BAEFF , #2486FF);
    border-radius: 8px 0 0 8px;
    padding-top: 26px;

    img {
      width: 112px;
      height: 112px;
      margin-bottom: 12px;
    }
    span {
      font-size: 24px;
      color: #fff;
    }
  }
  .job-desc {
    flex: 1;
    align-self: center;
    line-height: 28px;
    border-radius: 0px 8px 8px 0;
    color: #3380CC;
    text-align: justify;
    font-size: 20px;
    padding: 0 32px;
  }
}
</style>
