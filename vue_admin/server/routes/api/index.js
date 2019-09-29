let express = require('express')
let router = express.Router()
let path = require('path')

router.use(async function (res, req, next) {
  await new Promise(resolve => {
    setTimeout(function () {
      resolve()
    }, 500)
  })
  next()
})

router.get('/', (req, res) => {
  res.json({ a: 123 })
})

// 导出xls表格
router.get([
  '/refuelingRecord/queryByCondition/export',
  '/company/queryByCondition/export',
  '/tanker/queryByCondition/export',
  '/tankerAlert/queryByCondition/export',
  '/report3/queryByCondition/export',
  '/report2/queryByCondition/export',
  '/report1/queryByCondition/export'
], function (req, res, next) {
  res.download(path.join(__dirname, './test.xls'), 'test.xls', function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('ok')
    }
  })
})

// 字典
router.get('/sys/dict/getDictConstant', (req, res) => {
  res.json({
    code: 0,
    message: '成功了',
    data: {
      status:[  { id: 0, name: '正常' }, { id: 1, name: '禁用' }],
      sex: [{ id: 1, name: '男' }, { id: 2, name: '女' }],

      statuses: [{ 'id': 0, 'label': '有效' }, { 'id': 1, 'label': '停用' }, { 'id': -1, 'label': '删除' }],
      'monitorTypes': [{ 'id': 1, 'label': '加油站' }, { 'id': 2, 'label': '商贸企业' }],
      'terms': [{ 'id': 1, 'label': '月度' }, { 'id': 2, 'label': '季度' }, { 'id': 3, 'label': '年度' }],
      'alertTypes': [{ 'id': 1, 'label': '设备离线' }, { 'id': 2, 'label': '网络异常' }]
    }
  })
})

//  实时采集信息的列表
router.get('/refuelingRecord/queryByCondition', (req, res) => {
  res.json({
    'message': 'success',
    'code': 0,
    'data': {
      'totalCount': 20364,
      'pageCount': 2037,
      'displayCount': 10,
      'list':
        [{
          'cellStyleMap': {},
          'id': 1,
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': null,
          'delFlag': null,
          'areaId': 2,
          'areaName': '第二区域',
          'dutyNo': '1015',
          'dutyName': '第二加油站',
          'refuelingGunNo': '1#',
          'refuelingType': '92#汽油',
          'acquisitionModuleNo': null,
          'quantity': 18.25,
          'price': 5.48,
          'totalAmount': 100.00,
          'recordingTime': '2019-08-13 18:15:58',
          'operation': null
        }, {
          'cellStyleMap': {},
          'id': 2,
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': null,
          'delFlag': null,
          'areaId': 2,
          'areaName': '第二区域',
          'dutyNo': '1015',
          'dutyName': '第二加油站',
          'refuelingGunNo': '5#',
          'refuelingType': '92#汽油',
          'acquisitionModuleNo': null,
          'quantity': 43.80,
          'price': 5.48,
          'totalAmount': 240.00,
          'recordingTime': '2019-08-13 18:14:37',
          'operation': null
        }, {
          'cellStyleMap': {},
          'id': 3,
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': null,
          'delFlag': null,
          'areaId': 2,
          'areaName': '第二区域',
          'dutyNo': '1013',
          'dutyName': '三十九加油站',
          'refuelingGunNo': '3#',
          'refuelingType': '92#汽油',
          'acquisitionModuleNo': null,
          'quantity': 36.50,
          'price': 5.48,
          'totalAmount': 200.00,
          'recordingTime': '2019-08-13 18:00:42',
          'operation': null
        }, {
          'cellStyleMap': {},
          'id': 4,
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': null,
          'delFlag': null,
          'areaId': 2,
          'areaName': '第二区域',
          'dutyNo': '1014',
          'dutyName': '二十二加油站',
          'refuelingGunNo': '1#',
          'refuelingType': '92#汽油',
          'acquisitionModuleNo': null,
          'quantity': 18.25,
          'price': 5.48,
          'totalAmount': 100.00,
          'recordingTime': '2019-08-13 17:49:46',
          'operation': null
        }, {
          'cellStyleMap': {},
          'id': 5,
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': null,
          'delFlag': null,
          'areaId': 2,
          'areaName': '第二区域',
          'dutyNo': '1013',
          'dutyName': '三十九加油站',
          'refuelingGunNo': '3#',
          'refuelingType': '92#汽油',
          'acquisitionModuleNo': null,
          'quantity': 18.25,
          'price': 5.48,
          'totalAmount': 100.00,
          'recordingTime': '2019-08-13 17:39:41',
          'operation': null
        }, {
          'cellStyleMap': {},
          'id': 6,
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': null,
          'delFlag': null,
          'areaId': 2,
          'areaName': '第二区域',
          'dutyNo': '1015',
          'dutyName': '第二加油站',
          'refuelingGunNo': '5#',
          'refuelingType': '92#汽油',
          'acquisitionModuleNo': null,
          'quantity': 18.25,
          'price': 5.48,
          'totalAmount': 100.00,
          'recordingTime': '2019-08-13 17:37:36',
          'operation': null
        }, {
          'cellStyleMap': {},
          'id': 7,
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': null,
          'delFlag': null,
          'areaId': 2,
          'areaName': '第二区域',
          'dutyNo': '1015',
          'dutyName': '第二加油站',
          'refuelingGunNo': '1#',
          'refuelingType': '92#汽油',
          'acquisitionModuleNo': null,
          'quantity': 18.25,
          'price': 5.48,
          'totalAmount': 100.00,
          'recordingTime': '2019-08-13 17:25:57',
          'operation': null
        }, {
          'cellStyleMap': {},
          'id': 8,
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': null,
          'delFlag': null,
          'areaId': 2,
          'areaName': '第二区域',
          'dutyNo': '1015',
          'dutyName': '第二加油站',
          'refuelingGunNo': '1#',
          'refuelingType': '92#汽油',
          'acquisitionModuleNo': null,
          'quantity': 18.25,
          'price': 5.48,
          'totalAmount': 100.00,
          'recordingTime': '2019-08-13 17:21:57',
          'operation': null
        }, {
          'cellStyleMap': {},
          'id': 9,
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': null,
          'delFlag': null,
          'areaId': 2,
          'areaName': '第二区域',
          'dutyNo': '1010',
          'dutyName': '二十三加油站',
          'refuelingGunNo': '5#',
          'refuelingType': '92#汽油',
          'acquisitionModuleNo': null,
          'quantity': 81.20,
          'price': 5.48,
          'totalAmount': 445.00,
          'recordingTime': '2019-08-13 17:21:25',
          'operation': null
        }, {
          'cellStyleMap': {},
          'id': 10,
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': null,
          'delFlag': null,
          'areaId': 2,
          'areaName': '第二区域',
          'dutyNo': '1010',
          'dutyName': '二十三加油站',
          'refuelingGunNo': '1#',
          'refuelingType': '0#柴油',
          'acquisitionModuleNo': null,
          'quantity': 35.78,
          'price': 5.59,
          'totalAmount': 200.00,
          'recordingTime': '2019-08-13 17:21:11',
          'operation': null
        }]
    }
  })
})
// 获取区域列表
router.get('/area/getAreaTree', (req, res) => {
  res.json({
    code: 0,
    message: '成功了',
    data: [{
      id: 1,
      label: '一级 2',
      children: [{
        id: 3,
        label: '二级 2-1',
        children: [{
          id: 4,
          label: '三级 3-1-1'
        }, {
          id: 5,
          label: '三级 3-1-2',
        }]
      }, {
        id: 2,
        label: '二级 2-2',
        children: [{
          id: 6,
          label: '三级 3-2-1'
        }, {
          id: 7,
          label: '三级 3-2-2'
        }]
      }]
    }]
  })
})
// 获取加油站列表
router.get('/company/getAllCompany', (req, res) => {
  res.json({
    code: 0,
    message: '成功了',
    data: [
      {
        companyName: '加油站1',
        id: 1,
        guns: [
          {
            id: 'ffe2090a15514959beefdab26aac72001',
            dutyName: '1#',
            modelNo: '86034404355903900',
          },
          {
            id: 'ffe2090a15514959beefdab26aac72002',
            dutyName: '2#',
            modelNo: '86034404355903900',
          },
          {
            id: 'ffe2090a15514959beefdab26aac72003',
            dutyName: '3#',
            modelNo: '86034404355903900',
          }
        ]
      },
      {
        companyName: '加油站2',
        id: 2,
        guns: [
          {
            id: 'ffe2090a15514959beefdab26aac72001',
            dutyName: '1#',
            modelNo: '86034404355903900',
          },
          {
            id: 'ffe2090a15514959beefdab26aac72002',
            dutyName: '2#',
            modelNo: '86034404355903900',
          },
          {
            id: 'ffe2090a15514959beefdab26aac72003',
            dutyName: '3#',
            modelNo: '86034404355903900',
          }
        ]
      },
      {
        companyName: '加油站3',
        id: 3,
        guns: [
          {
            id: 'ffe2090a15514959beefdab26aac72001',
            dutyName: '1#',
            modelNo: '86034404355903900',
          },
          {
            id: 'ffe2090a15514959beefdab26aac72002',
            dutyName: '2#',
            modelNo: '86034404355903900',
          },
          {
            id: 'ffe2090a15514959beefdab26aac72003',
            dutyName: '3#',
            modelNo: '86034404355903900',
          }
        ]
      },
      {
        companyName: '加油站4',
        id: 4,
        guns: [
          {
            id: 'ffe2090a15514959beefdab26aac72001',
            dutyName: '1#',
            modelNo: '86034404355903900',
          },
          {
            id: 'ffe2090a15514959beefdab26aac72002',
            dutyName: '2#',
            modelNo: '86034404355903900',
          },
          {
            id: 'ffe2090a15514959beefdab26aac72003',
            dutyName: '3#',
            modelNo: '86034404355903900',
          }
        ]
      },
      {
        companyName: '加油站5',
        id: 5,
        guns: [
          {
            id: 'ffe2090a15514959beefdab26aac72001',
            dutyName: '1#',
            modelNo: '86034404355903900',
          },
          {
            id: 'ffe2090a15514959beefdab26aac72002',
            dutyName: '2#',
            modelNo: '86034404355903900',
          },
          {
            id: 'ffe2090a15514959beefdab26aac72003',
            dutyName: '3#',
            modelNo: '86034404355903900',
          }
        ]
      },
    ]
  })
})


// 暂时不相关
router.use('/test', require('./test.js'))
router.use('/login', require('./login.js'))
router.use('/userInfo', require('./userInfo.js'))
router.use('/logout', require('./logout.js'))
router.use('/right', require('./right.js'))
router.use('/sys/permission', require('./menu.js'))
router.use('/sys/department', require('./department.js'))
router.use('/sys/role', require('./role.js'))
router.use('/sys/user/admin', require('./user.js'))

module.exports = router
