<template>
  <div class="staff-detail-item-info">
    <!-- 详细信息 -->
    <div class="base-info">
      <v-cell v-if="info.positionType === 2"
        label="从业年限:"
        :value="info.experience"
        align="left" />
      <v-cell v-if="info.positionType === 2"
        label="擅长风格:"
        :value="(info.styleList || []).join('、')"
        align="left" />
      <v-cell v-if="info.positionType === 2"
        label="设计理念:"
        :value="info.concept"
        align="left"
        line="20" />
      <v-cell label="加入时间:"
        :value="info.createDate"
        align="left" />
      <v-cell label="职位:"
        :value="info.positionTypeName"
        align="left" />
      <v-cell label="拥有权限:"
        align="left" />
    </div>

    <!-- 权限列表 -->
    <div class="permission-list">
      <permission-item v-for="item in permissionList"
        :key="`${item.id}permission-item`"
        :item="item" />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import PermissionItem from '../staff-permission-component';

export default {
  name: 'staff-detail-item-info',
  components: {
    PermissionItem
  },
  data() {
    return {
      info: {},
      permissionList: []
    };
  },
  activated() {
    this.getInfo();
    this.getPermission();
  },
  methods: {
    ...mapActions(['getStaffDetailInfo', 'getStaffPermission']),
    getInfo() {
      this.getStaffDetailInfo(this.$route.query.id).then((res) => {
        this.info = res.data.merchantStaffExt;
      });
    },
    getPermission() {
      this.getStaffPermission(this.$route.query.roleId).then((res) => {
        this.permissionList = res.data.list;
      });
    }
  }
};
</script>
<style lang="scss">
.staff-detail-item-info {
  height: 100%;
  @include scroll(y);
  background: #fff;
  padding: 0 36px;
  .base-info {
    padding-top: 12px;
    padding-bottom: 32px;
  }
  .v-cell {
    padding-top: 24px;
  }
}
</style>
