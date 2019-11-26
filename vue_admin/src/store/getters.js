const getters = {
  common: state => state.common,
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  test: state => state.test,
  css: state => state.css,
  isCollapse: state => state.css.aside.isCollapse,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
