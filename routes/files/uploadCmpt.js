var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');
var multiparty = require('multiparty');

const isRepeatVersion = (itemPath, name, version) => {
    let isPrpeat = false;
    let files = fs.readdirSync(itemPath);
    files.forEach(item => {
        let itemNameArr = item.split('_')
        if(itemNameArr.slice(0,2).join('_') == `${name}_${version}`){
            isPrpeat = true;
        }
    })
    return isPrpeat;
}
/**
 * @api {post} /files/uploadCmpt 上传资源文件
 * @apiDescription 上传资源文件
 * @apiName uploadCmpt
 * @apiGroup File
 * @apiParam {File} file 资源文件
 * @apiParam {String} version 资源版本
 * @apiParam {String} fileName 资源名称
 * @apiParam {String} type 资源类型
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "result" : {
 *          "message" : "上传成功"
 *      }
 *  }
 * @apiSampleRequest http://localhost:3000/files/uploadCmpt
 * @apiVersion 0.1.0
 */
router.post('/', function(req, res, next) {
    let acceptType = ['components','assets'];
    let uploadPath = '../../public';
    if(!fs.existsSync(path.join(__dirname, `${uploadPath}/cache`))){
        fs.mkdirSync(path.join(__dirname, `${uploadPath}/cache`))
    }
    // 生成multiparty对象，并配置上传目标路径
    let form = new multiparty.Form({
        encoding: 'utf-8', // 设置编码
        maxFieldsSize: 20 * 1024 * 1024, //设置文件大小限制
        maxFields: 10, // 设置最大上传文件数
        autoFiles: true,
        uploadDir: path.join(__dirname, `${uploadPath}/cache`), //设置文件存储路劲
    });
    form.parse(req, (err, fields, files) => {
        let filesTemp = JSON.stringify(files, null, 2);
        if(err) {
            res.json({
                code: 203,
                message: '文件上传失败！'
            })
            return false;
        }else {
            let inputFileDatas = files.file;
            let fileNames = [];
            for(let i = 0; i < inputFileDatas.length; i++){
                let inputFile = inputFileDatas[i];
                let originalFilename = inputFile.originalFilename;
                let uploadedPath = inputFile.path;
                let fileName = fields.fileName[i];
                let fileVersion = fields.version[i];
                let fileType = fields.type[i];
                let itemType = originalFilename.slice(originalFilename.lastIndexOf('.') + 1)
                if(!acceptType.includes(fileType)){
                    fs.unlinkSync(uploadedPath);
                    res.json({
                        code: 204,
                        message: `文件类型有误，支持 ${acceptType.join('、')}`
                    })
                    return false;
                }
                // 文件名称为:  文件名_版本号_时间戳_后缀名
                let itemName = `${fileName}_${fileVersion}_${new Date().getTime()}_${inputFile.originalFilename.slice(inputFile.originalFilename.lastIndexOf('.'))}`;
                fileNames.push(itemName);
                if(!fs.existsSync(path.join(__dirname, `${uploadPath}/${fileType}`))){
                    fs.mkdirSync(path.join(__dirname, `${uploadPath}/${fileType}`))
                }
                let dstPath = path.join(__dirname, `${uploadPath}/${fileType}/${itemType}`);
                if(!fs.existsSync(dstPath)){
                    fs.mkdirSync(dstPath);
                }
                // 判断是否重复（’文件名_版本号‘ 是唯一的）
                if(isRepeatVersion(dstPath, fileName, fileVersion)){
                    fs.unlinkSync(uploadedPath);
                    res.json({
                        code: 205,
                        fileNames,
                        message: '已存在相同版本号的文件！'
                    })
                    return false;
                }
                //重命名
                fs.renameSync(uploadedPath, path.join(dstPath, `/${itemName}`));
                console.log(`<<<<<<<<<<<<<<<<<<<<<<<  ${itemName}  >>>>>>>>>>>>>>>>>>>>>>`)
                console.log(fs.readFileSync(path.join(dstPath, `/${itemName}`)))
            }
            res.json({
                code: 200,
                fileNames,
                message: '上传成功'
            })
        }
    })
});
module.exports = router;
