// 获取资源列表

var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');

const parseList = (tarPath, fileType) => {
    let data = [];
    if(fs.existsSync(tarPath)){
        let fileList = fs.readdirSync(tarPath);
        fileList.forEach(item => {
            let iteArr = item.split('_')
            data.push({
                name: iteArr[0],
                fileType,
                version: iteArr[1],
                updateTime: iteArr[2]
            })
        })
    }
    return data;
}
const parseAssetsList = (tarPath) => {
    let data = [];
    if(fs.existsSync(tarPath)){
        let fileParents = fs.readdirSync(tarPath);
        fileParents.forEach(item => {
            data.push({
                assetsType: item,
                children: parseList(path.join(tarPath, `/${item}`), item)
            })
        })
    }
    return data;
}
/**
 * @api {get} /files/getResource 获取资源列表
 * @apiDescription 获取资源列表
 * @apiName getResource
 * @apiGroup File
 * @apiParam {String} resType 资源类型：components、assets
 * @apiParam {String} assetsType 资源类型：当 resType 为 ssets 时
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "result" : {
 *          "message" : "获取资源数据成功"
 *      }
 *  }
 * @apiSampleRequest http://localhost:3000/files/getResource
 * @apiVersion 0.1.0
 */
router.get('/', function(req, res, next) {
    let resType = req.query.resType;
    let assetsType = req.query.assetsType;
    let rootPath = '../../public';
    let resultData = [];
    if(!fs.existsSync(path.join(__dirname, `${rootPath}/${resType}`))){
        res.json({
            code: 204,
            message: '资源类型必须是：components、assets'
        })
        return false;
    }
    if(resType == 'components'){
        let tarPath = path.join(__dirname, `${rootPath}/${resType}`);
        resultData = parseList(tarPath, resType);
        res.json({
            code: 200,
            resultData
        })
        return false;
    }else if(resType == 'assets'){
        if(assetsType){
            let tarPath = path.join(__dirname, `${rootPath}/${resType}/${assetsType}`);
            resultData = parseList(tarPath, assetsType);
        }else{
            let tarPath = path.join(__dirname, `${rootPath}/${resType}`);
            resultData = parseAssetsList(tarPath);
        }
        res.json({
            code: 200,
            resultData
        })
        return false;
    }else{
        let cmptPath = path.join(__dirname, `${rootPath}/components`);
        let components = parseList(cmptPath, 'components');
        let tarPath = path.join(__dirname, `${rootPath}/assets`);
        let assets = parseAssetsList(tarPath);
        res.json({
            code: 200,
            resultData: {
                components,
                assets
            }
        })
        return false;
    }
});
module.exports = router;
