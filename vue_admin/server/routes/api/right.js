var express = require('express')

var router = express.Router()

router.get('/', function (req, res, next) {

  let data = {
    message: '成功了',
    code: 0,
    data: [
      { id: 0,
      name: '顶级元素',
      children:[
        {
          id: 3,
          name: '系统设置',
          pid: 0,
          rule1: '',
          rule2: '',
          children: [
            {
            id: 31,
            name: '菜单设置',
            pid: 3,
            rule1: '',
            rule2: '',
            children: [
              { id: 314,
                name: '菜单列表',
                pid: 31,
                rule1: '',
                rule2: '',
              },
              {
              id: 311,
              name: '添加菜单',
              pid: 31,
              rule1: '',
              rule2: '',
            },
              {
                id: 312,
                name: '修改菜单',
                pid: 31,
                rule1: '',
                rule2: '',
              },
              {
                id: 313,
                name: '删除菜单',
                pid: 31,
                rule1: '',
                rule2: '',
              }
            ]
          },
            {
              id: 32,
              name: '权限管理',
              pid: 3,
              rule1: '',
              rule2: '',
              children: [
                { id: 324,
                  name: '权限列表',
                  pid: 32,
                  rule1: '',
                  rule2: '',
                },
                {
                  id: 321,
                  name: '添加权限',
                  pid: 32,
                  rule1: '',
                  rule2: '',
                },
                {
                  id: 322,
                  name: '修改权限',
                  pid: 32,
                  rule1: '',
                  rule2: '',
                },
                {
                  id: 323,
                  name: '删除权限',
                  pid: 32,
                  rule1: '',
                  rule2: '',
                }
              ]
            }
          ]
        }
      ] }
      ]
  }
  // res.json(400,data)
  res.json(data)
})
router.post('/add', function (req, res, next) {
  console.log(req.body)

  let data = {
    message: '成功了',
    code: 0,
    id: parseInt(Math.random()*100),
  }
  // res.json(400,data)
  res.json(data)
})
router.post('/change', function (req, res, next) {
  console.log(req.body)

  let data = {
    message: '成功了',
    code: 0
  }
  // res.json(400,data)
  res.json(data)
})
router.get('/del', function (req, res, next) {
  let data = {
    message: '成功了',
    code: 0
  }
  // res.json(400,data)
  res.json(data)
})

module.exports = router
