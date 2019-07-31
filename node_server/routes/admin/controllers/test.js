module.exports = {

  async indexPage ( req, res, next ) {
    await  res.render('test', { title: '测试页面'});
  },
  async indexPage2 ( req, res, next ) {
      await  res.render('test2', { title: '测试页面'});
  },
  async indexPage3 ( req, res, next ) {
      await  res.render('react-test', { title: 'react测试页面'});
  },

}