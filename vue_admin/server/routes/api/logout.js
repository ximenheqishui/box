
var express = require('express')

var router = express.Router()

router.get('/', function (req, res, next) {
  console.log(req.query.token)
  // console.log(req.body.token)
  let data = {
    message:'成功了',
    code: 0
  }
  // res.json(400,data)
  res.json(data)
})


module.exports = router
