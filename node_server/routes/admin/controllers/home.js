module.exports = {

  async indexPage ( req, res, next ) {
    if(!req.session.name){
      console.log(req.ip)
      req.session.name = '管理员'
    }
    await  res.render('home', { title: `首页-${req.session.name}`});
  },

}