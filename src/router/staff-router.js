const staffRouter = [{
  path: '/staff-list',
  name: 'staff-list',
  component: () =>
    import(/* webpackChunkName: "staff-list" */ '~views/staff/staff-list/staff-list'),
  meta: {
    title: '店员 - 阿拉私家',
  },
}, {
  path: '/staff-detail',
  name: 'staff-detail',
  component: () =>
    import(/* webpackChunkName: "staff-detail" */ '~views/staff/staff-detail/staff-detail'),
  meta: {
    title: '店员详情 - 阿拉私家',
  },
}, {
  path: '/staff-select',
  name: 'staff-select',
  component: () =>
    import(/* webpackChunkName: "staff-select" */ '~views/staff/add-staff/select-staff'),
  meta: {
    title: '添加店员 - 阿拉私家',
  },
}, {
  path: '/add-staff',
  name: 'add-staff',
  component: () =>
    import(/* webpackChunkName: "add-staff" */ '~views/staff/add-staff/add-staff'),
  meta: {
    title: '添加店员 - 阿拉私家',
  },
}];

export default staffRouter;
