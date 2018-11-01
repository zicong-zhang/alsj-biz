<template>
  <div class="view-staff-list">
    <v-header title="店员">
      <span class="add-staff-btn"
        slot="right-one"
        @click="toAddStaff">
        <i class="icon i-tianjia"></i>
      </span>
    </v-header>
    <div class="content">
      <i class="gap"></i>
      <ul class="staff-list">
        <li v-for="item in dataList"
          :key="`staff-list-${item.id}`"
          @click="toStaffDetail(item)">
          <v-img :src="item.avatar"
            loading-type="user" />
          <div class="staff-info">
            <h4>
              <span>{{ item.nickname }}</span>
              <i v-if="item.sex == 1"
                class="icon i-xingbie-nan"></i>
              <i v-else
                class="icon i-xingbie-nv"></i>
            </h4>
            <p>{{ item.positionTypeName }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'view-staff-list',
  data() {
    return {
      aa: 0,
      dataList: []
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    ...mapActions(['getStaffList']),
    getDataList() {
      this.getStaffList().then(res => {
        this.aa++;
        this.dataList = res.data.list;
      });
    },
    toStaffDetail({ id, avatar, nickname, positionTypeName, roleId, phone }) {
      this.$utils.go({
        name: 'staff-detail',
        query: {
          id,
          avatar,
          nickname,
          roleId,
          phone,
          positionTypeName
        }
      });
    },
    toAddStaff() {
      this.$utils.go({
        name: 'staff-select'
      })
    }
  }
};
</script>
<style lang="scss">
.view-staff-list {
  .add-staff-btn {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 88px;
    padding-right: 36px;
    i {
      color: $main;
      font-size: 32px;
    }
  }
  li {
    height: 144px;
    display: flex;
    align-items: center;
    background: #fff;
    padding: 0 36px;
    &:not(:last-child) {
      border-bottom: 1px solid #eaeaea;
    }
    h4 {
      display: flex;
      align-items: center;
      font-size: 32px;
      font-weight: normal;
      margin-bottom: 8px;
    }
    p {
      width: 80px;
      height: 32px;
      line-height: 34px;
      font-size: 20px;
      background: #e5f2ff;
      border-radius: 4px;
      text-align: center;
      color: #2299ff;
    }
  }
  .icon {
    font-size: 24px;
    margin-left: 8px;
  }
  .v-img {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    margin-right: 18px;
  }
}
</style>
