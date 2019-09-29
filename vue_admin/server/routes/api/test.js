
var express = require('express')

var router = express.Router()

router.get('/', function (req, res, next) {
  let data = {
    message:'成功了',
    code: 1080,
    total: 100,
  }
  res.json(data)
})


module.exports = router
