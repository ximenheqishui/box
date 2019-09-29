var express = require('express')

var router = express.Router()



router.get('/getByCondition',function (req, res, next) {


  let data = {
    message: '成功了',
    code: 0,
    data:{
      totalCount: 200,
      list:  [
        {
          id: '1',
          user_name: '张三',
          password: '',
          email: '296876606@QQ.com',
          mobile: '18354205371',
          sex: 1,
          sex_name: '男',
          dept_id: '33',
          dept_path:JSON.stringify([0,3,33]),
          dept_name: '总部',
          roles:[{id:1,name:'123'}],
          role_ids: ['1'],
          status: '0',
          create_time: '2017-12-11 12:12:12',
          avatar: '/static/img/avatar.jpg'
        },
        {
          id: '1',
          user_name: '李三',
          password: '',
          email: '296876609@QQ.com',
          mobile: '18354205372',
          sex: 1,
          sex_name: '男',
          dept_id: '33',
          dept_path:JSON.stringify([0,3,33]),
          dept_name: '总部',
          roles:[{id:1,name:'123'}],
          role_ids: ['1'],
          status: '0',
          create_time: '2017-12-11 11:12:12',
          avatar: '/static/img/avatar.jpg'
        }
      ]
    }
  }
  // res.json(400,data)
  res.json(data)
})

router.post('/save',function (req, res, next) {
  console.log(req.body)

  let data = {
    message: '成功了',
    code: 0,
    data:{
      id: new Date().getTime()
    }
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
module.exports = router
