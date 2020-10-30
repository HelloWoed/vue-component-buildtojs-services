define({ "api": [
  {
    "type": "get",
    "url": "/files/getFile",
    "title": "获取组件文件",
    "description": "<p>获取组件文件</p>",
    "name": "getFile",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "fileName",
            "description": "<p>文件名</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\" : \"true\",\n    \"result\" : {\n        \n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/files/getFile"
      }
    ],
    "version": "0.1.0",
    "filename": "routes/files/getFile.js",
    "groupTitle": "File"
  },
  {
    "type": "get",
    "url": "/files/getResource",
    "title": "获取资源列表",
    "description": "<p>获取资源列表</p>",
    "name": "getResource",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resType",
            "description": "<p>资源类型：components、assets</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "assetsType",
            "description": "<p>资源类型：当 resType 为 ssets 时</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\" : \"true\",\n    \"result\" : {\n        \"message\" : \"获取资源数据成功\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/files/getResource"
      }
    ],
    "version": "0.1.0",
    "filename": "routes/files/getResource.js",
    "groupTitle": "File"
  },
  {
    "type": "post",
    "url": "/files/uploadCmpt",
    "title": "上传资源文件",
    "description": "<p>上传资源文件</p>",
    "name": "uploadCmpt",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>资源文件</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>资源版本</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileName",
            "description": "<p>资源名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>资源类型</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\" : \"true\",\n    \"result\" : {\n        \"message\" : \"上传成功\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/files/uploadCmpt"
      }
    ],
    "version": "0.1.0",
    "filename": "routes/files/uploadCmpt.js",
    "groupTitle": "File"
  },
  {
    "type": "get",
    "url": "/project/getCatalog",
    "title": "获取项目目录",
    "description": "<p>获取项目目录</p>",
    "name": "getCatalog",
    "group": "project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "projectName",
            "description": "<p>项目名称</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\" : \"true\",\n    \"result\" : {\n        \n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/project/getCatalog"
      }
    ],
    "version": "0.1.0",
    "filename": "routes/project/getCatalog.js",
    "groupTitle": "project"
  }
] });
