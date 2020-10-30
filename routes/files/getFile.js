var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');

/**
 * @api {get} /files/getFile 获取组件文件
 * @apiDescription 获取组件文件
 * @apiName getFile
 * @apiGroup File
 * @apiParam {string} fileName 文件名
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "result" : {
 *          
 *      }
 *  }
 * @apiSampleRequest http://localhost:3000/files/getFile
 * @apiVersion 0.1.0
 */
router.get('/', function(req, res, next) {
    let fileName = req.query.fileName;
    let filePath = path.join(__dirname,`../../public/components/${fileName}.js`);
    if(fs.existsSync(filePath)){
        res.sendFile(filePath, `${fileName}.js`);
    }else{
        res.json({
            code: 405,
            message: '文件存在'
        });
    }
});
module.exports = router;
