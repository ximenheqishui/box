module.exports = {
  async singleFile(req,res,next ) {
    try {
      let info = {
        file: req.file,
        name: 'admin'
      }
      await res.json(info)
    }catch (e) {
      next(e)
    }
  },
  async arrayFile (req,res,next ) {
    try {
      let info = {
        file: req.files,
        name: 'admin'
      }
      await res.json(info)
    }catch (e) {
      next(e)
    }
  },
  async arrayObjFile (req,res,next ) {
    try {
      let info = {
        file: req.files,
        name: 'admin'
      }
      await res.json(info)
    }catch (e) {
      next(e)
    }
  }
}
