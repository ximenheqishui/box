module.exports = {

  async indexPage ( req, res, next ) {
    await  res.render('canvas/canvas1', { title: 'canvas1'});
  },

}