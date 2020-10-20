define({ "api": [
  {
    "type": "get",
    "url": "/files/getFile",
    "title": "获取组件文件",
    "description": "<p>获取组件文件</p>",
    "name": "getFile",
    "group": "User",
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
          "content": "{\n    \"success\" : \"true\",\n    \"result\" : {\n        \"name\" : \"loginName\",\n        \"password\" : \"loginPass\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/user/submit-login"
      }
    ],
    "version": "1.0.0",
    "filename": "routes/files/getFile.js",
    "groupTitle": "User"
  }
] });
