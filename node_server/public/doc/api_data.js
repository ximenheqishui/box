define({ "api": [
  {
    "type": "delete",
    "url": "/admin/article",
    "title": "删除文章",
    "name": "DelArticle",
    "group": "article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>以逗号隔开的id字符串</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/article.js",
    "groupTitle": "article",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/article"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/admin/articleType",
    "title": "删除文章分类",
    "name": "DelArticleType",
    "group": "articleType",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>以逗号隔开的id字符串</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/articleType.js",
    "groupTitle": "articleType",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/articleType"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/articleType",
    "title": "添加文章分类",
    "name": "addArticleType",
    "group": "articleType",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parent_id",
            "description": "<p>父节点的ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent_name",
            "description": "<p>父节点名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort_order",
            "description": "<p>排序</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用  0 是启用  1 是不启用</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/articleType.js",
    "groupTitle": "articleType",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/articleType"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/articleType",
    "title": "获取文章分类",
    "name": "getArticleType",
    "group": "articleType",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用 ：0 是启用、1 是不启用、空或者不存在为全部</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/articleType.js",
    "groupTitle": "articleType",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/articleType"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/admin/articleType",
    "title": "修改文章分类",
    "name": "updateArticleType",
    "group": "articleType",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>文章名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parent_id",
            "description": "<p>父节点的ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent_name",
            "description": "<p>父节点名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort_order",
            "description": "<p>排序</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用  0 是启用  1 是不启用</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/articleType.js",
    "groupTitle": "articleType",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/articleType"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/article",
    "title": "添加文章",
    "name": "addArticle",
    "group": "article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>文章名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type_id",
            "description": "<p>文章类别ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_path",
            "description": "<p>文章类别路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>关键词</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>文章描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>文章内容</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cover",
            "description": "<p>文章封面url</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用  0 是启用  1 是不启用</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/article.js",
    "groupTitle": "article",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/article"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/article",
    "title": "获取文章",
    "name": "getArticle",
    "group": "article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pn",
            "description": "<p>第几页: 不存在获取所有符合筛选条件数据</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page_size",
            "description": "<p>每页多少条：不存在获取所有符合筛选条件数据</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>文章名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_id",
            "description": "<p>文章类别</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>关键词</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用 ：0 是启用、1 是不启用</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "start_date",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "end_date",
            "description": "<p>结束时间</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/article.js",
    "groupTitle": "article",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/article"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/admin/article",
    "title": "修改文章",
    "name": "updateArticle",
    "group": "article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>文章名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type_id",
            "description": "<p>文章类别ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_path",
            "description": "<p>文章类别路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>关键词</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>文章描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>文章内容</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cover",
            "description": "<p>文章封面url</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用  0 是启用  1 是不启用</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/article.js",
    "groupTitle": "article",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/article"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/excelExport",
    "title": "导出",
    "name": "excelExport",
    "group": "common",
    "version": "0.0.0",
    "filename": "routes/admin/controllers/common.js",
    "groupTitle": "common",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/excelExport"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/dictionaries",
    "title": "获取全部的数据字典",
    "name": "getDictionaries",
    "group": "common",
    "version": "0.0.0",
    "filename": "routes/admin/controllers/common.js",
    "groupTitle": "common",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/dictionaries"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/login",
    "title": "登录",
    "name": "login",
    "group": "common",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "account",
            "description": "<p>账户</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/common.js",
    "groupTitle": "common",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/login"
      }
    ]
  },
  {
    "type": "get",
    "url": "/admin/logout",
    "title": "退出",
    "name": "logout",
    "group": "common",
    "version": "0.0.0",
    "filename": "routes/admin/controllers/common.js",
    "groupTitle": "common",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/logout"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "all",
    "url": "/null",
    "title": "返回的常规格式",
    "name": "returnCommon",
    "group": "common",
    "error": {
      "examples": [
        {
          "title": "服务器代码错误:",
          "content": "HTTP/1.1 500  服务器错误\n{\n  \"error\": \"错误信息\",\n  \"message\": \"具体的所有的信息在开发模式下才会有信息\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "成功:",
          "content": "HTTP/1.1 200 OK\n{\n \"code\": 0,\n \"message\": \"成功了\"\n}\n HTTP/1.1 200 OK\n{\n \"code\": 2,\n \"message\": \"登录超时或未登录\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/common.js",
    "groupTitle": "common",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/null"
      }
    ]
  },
  {
    "type": "get",
    "url": "/admin/userInfo",
    "title": "获取用户信息",
    "name": "userInfo",
    "group": "common",
    "version": "0.0.0",
    "filename": "routes/admin/controllers/common.js",
    "groupTitle": "common",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/userInfo"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/admin/department",
    "title": "删除部门",
    "name": "DelDepartment",
    "group": "department",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>以逗号隔开的id字符串</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/department.js",
    "groupTitle": "department",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/department"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/department",
    "title": "添加部门",
    "name": "addDepartment",
    "group": "department",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>部门名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parent_id",
            "description": "<p>父节点的ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent_name",
            "description": "<p>父节点名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort_order",
            "description": "<p>排序</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用  0 是启用  1 是不启用</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/department.js",
    "groupTitle": "department",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/department"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/department",
    "title": "获取部门",
    "name": "getDepartment",
    "group": "department",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用 ：0 是启用、1 是不启用、空或者不存在为全部</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/department.js",
    "groupTitle": "department",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/department"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/department/leader",
    "title": "获取部门领导者",
    "name": "getDepartmentLeader",
    "group": "department",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "department_id",
            "description": "<p>是否启用 ：0 是启用、1 是不启用、空或者不存在为全部</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/department.js",
    "groupTitle": "department",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/department/leader"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/admin/department",
    "title": "修改部门",
    "name": "updateDepartment",
    "group": "department",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>部门id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>部门名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parent_id",
            "description": "<p>父节点的ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent_name",
            "description": "<p>父节点名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort_order",
            "description": "<p>排序</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用  0 是启用  1 是不启用</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "leader",
            "description": "<p>用户领导者的数组</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/department.js",
    "groupTitle": "department",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/department"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/admin/menu",
    "title": "删除菜单",
    "name": "DelMenu",
    "group": "menu",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>以逗号隔开的id字符串</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/menu.js",
    "groupTitle": "menu",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/menu"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/menu",
    "title": "添加菜单",
    "name": "addMenu",
    "group": "menu",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "icon",
            "description": "<p>字体图标</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "last_menu",
            "description": "<p>是否为最后一级  0不是最后一层   1 是最后一层</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>菜单名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parent_id",
            "description": "<p>父节点的ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent_name",
            "description": "<p>父节点名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort_order",
            "description": "<p>排序</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用  0 是启用  1 是不启用</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>节点是按钮还是菜单   1 菜单类型  2 按钮类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "unique_id",
            "description": "<p>节点唯一标识 要唯一</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>页面前端路由</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/menu.js",
    "groupTitle": "menu",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/menu"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/menu",
    "title": "获取菜单",
    "name": "getMenu",
    "group": "menu",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用 ：0 是启用、1 是不启用、空或者不存在为全部</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/menu.js",
    "groupTitle": "menu",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/menu"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/admin/menu",
    "title": "修改菜单",
    "name": "updateMenu",
    "group": "menu",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "icon",
            "description": "<p>字体图标</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "last_menu",
            "description": "<p>是否为最后一级  0不是最后一层   1 是最后一层</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>菜单名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parent_id",
            "description": "<p>父节点的ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent_name",
            "description": "<p>父节点名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort_order",
            "description": "<p>排序</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用  0 是启用  1 是不启用</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>节点是按钮还是菜单   1 菜单类型  2 按钮类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "unique_id",
            "description": "<p>节点唯一标识 要唯一</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>页面前端路由</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/menu.js",
    "groupTitle": "menu",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/menu"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/admin/role",
    "title": "删除角色",
    "name": "DelRole",
    "group": "role",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id组成的字符串以逗号隔开</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/role.js",
    "groupTitle": "role",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/role"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/role",
    "title": "添加角色",
    "name": "addRole",
    "group": "role",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>描述</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/role.js",
    "groupTitle": "role",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/role"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/role/menu",
    "title": "修改角色的菜单权限",
    "name": "addRoleMenu",
    "group": "role",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "permissionIds",
            "description": "<p>菜单id的数组</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "role_id",
            "description": "<p>角色id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/role.js",
    "groupTitle": "role",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/role/menu"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/role",
    "title": "获取角色",
    "name": "getRole",
    "group": "role",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pn",
            "description": "<p>第几页: 不存在获取所有数据</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page_size",
            "description": "<p>每页多少条：不存在获取所有数据</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/role.js",
    "groupTitle": "role",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/role"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/role/menu",
    "title": "获取角色的菜单权限",
    "name": "getRoleMenu",
    "group": "role",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "role_id",
            "description": "<p>角色id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/role.js",
    "groupTitle": "role",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/role/menu"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/admin/role",
    "title": "修改角色",
    "name": "updateRole",
    "group": "role",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>角色名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>描述</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/role.js",
    "groupTitle": "role",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/role"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/admin/user",
    "title": "删除用户",
    "name": "DelUser",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id组成的字符串以逗号隔开</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/user.js",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/user",
    "title": "添加用户",
    "name": "addUser",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_name",
            "description": "<p>用户名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobile",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "sex",
            "description": "<p>性别：0未知、1是男、2是女</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "dept_id",
            "description": "<p>部门id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "dept_path",
            "description": "<p>部门所在层的id的数组字符串，前端回显用</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用 ：0 是启用、1 是不启用</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "avatar",
            "description": "<p>用户头像url</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/user.js",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/user",
    "title": "获取用户",
    "name": "getUser",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pn",
            "description": "<p>第几页: 不存在获取所有符合筛选条件数据</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page_size",
            "description": "<p>每页多少条：不存在获取所有符合筛选条件数据</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_name",
            "description": "<p>用户名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobile",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "sex",
            "description": "<p>性别：0未知、1是男、2是女</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "dept_id",
            "description": "<p>部门id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用 ：0 是启用、1 是不启用</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "start_date",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "end_date",
            "description": "<p>结束时间</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/user.js",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/admin/user",
    "title": "修改用户",
    "name": "updateUser",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_name",
            "description": "<p>用户名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobile",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "sex",
            "description": "<p>性别：0未知、1是男、2是女</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "dept_id",
            "description": "<p>部门id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "dept_path",
            "description": "<p>部门所在层的id的数组字符串，前端回显用</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>是否启用 ：0 是启用、1 是不启用</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "avatar",
            "description": "<p>用户头像url</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/admin/controllers/user.js",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://192.168.199.147:3000/admin/user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Admin-Token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    }
  }
] });
