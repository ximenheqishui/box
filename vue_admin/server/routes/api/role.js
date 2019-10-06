var express = require('express')

var router = express.Router()

router.get('/getByPage', function (req, res, next) {

  let data = {
    message: '成功了',
    code: 0,
    data:{
      totalCount: 200,
      list:  [
        {
          id: '1',
          name: '超级管理员',
          description: '上海市普s陀区金沙江路 1518 弄，上海市普s金沙江路 1518 弄上海市普s陀',
          create_time: '2017-12-11 23:12:11',
          update_time: '2017-12-11 23:12:11'
        },
        {
          id: '2',
          name: '超级管理员',
          description: '上海市普s陀区金沙江路 1518 弄，上海市普s金沙江路 1518 弄上海市普s陀',
          create_time: '2017-12-11 23:12:11',
          update_time: '2017-12-11 23:12:11'
        },
        {
          id: '3',
          name: '超级管理员',
          description: '上海市普s陀区金沙江路 1518 弄，上海市普s金沙江路 1518 弄上海市普s陀',
          create_time: '2017-12-11 23:12:11',
          update_time: '2017-12-11 23:12:11'
        },
        {
          id: '4',
          name: '超级管理员',
          description: '上海市普s陀区金沙江路 1518 弄，上海市普s金沙江路 1518 弄上海市普s陀',
          create_time: '2017-12-11 23:12:11',
          update_time: '2017-12-11 23:12:11'
        }
      ]
    }
  }
  // res.json(400,data)
  res.json(data)
})
router.post('/save', function (req, res, next) {
  console.log(req.body)

  let data = {
    message: '成功了',
    code: 0,
    id: parseInt(Math.random()*100),
  }
  // res.json(400,data)
  res.json(data)
})
router.put('/update',function (req, res, next) {
  console.log(req.body)

  let data = {
    message: '成功了',
    code: 0,
    data:{
      id: '123345'
    }
  }
  // res.json(400,data)
  res.json(data)
})
router.delete('/delByIds/:id',function (req, res, next) {
  let data = {
    message: '成功了',
    code: 0
  }
  // res.json(400,data)
  res.json(data)
})
router.get('/getPermission',function (req, res, next) {

  let data = {
    message: '成功了',
    code: 0,
    data: [0,1]
  }
  // res.json(400,data)
  res.json(data)
})
router.put('/savePermission',function (req, res, next) {
  console.log(req.body)

  let data = {
    message: '成功了',
    code: 0,
    data:{
      id: '123345'
    }
  }
  // res.json(400,data)
  res.json(data)
})

module.exports = router
