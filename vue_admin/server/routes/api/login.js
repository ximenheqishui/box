
var express = require('express')

var router = express.Router()

router.post('/', function (req, res, next) {

  let data = {
    message:'成功了',
    code: 0,
    token: 'tokenadsdsdsdsdsdsdsdsds'
  }
  // res.json(400,data)
  res.json(data)
})


module.exports = router
