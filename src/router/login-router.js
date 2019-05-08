const login = () => import(/* webpackChunkName: "login" */ '~views/login');

const loginRouter = [{
  path: '/login',
  name: 'login',
  component: login,
  meta: {
    title: '登录 - 阿拉私家'
  }
}]

export default loginRouter;
