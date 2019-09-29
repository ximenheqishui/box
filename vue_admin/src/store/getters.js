const getters = {
  userInfo: state => state.user.userInfo,
  test: state => state.test,
  css: state => state.css,
  isCollapse: state => state.css.aside.isCollapse,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
