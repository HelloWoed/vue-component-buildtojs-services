var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');

const IgnoreFolder = ['node_modules'];
const parseCatalog = (cataData, cataPath, acceptData) => {
    cataData.forEach(item => {
        if(!IgnoreFolder.includes(item)){
            let itemPath = `${cataPath}/${item}`;
            let stat = fs.lstatSync(path.join(__dirname, itemPath));
            let itemData = {
                catalogName: item,
                catalogPath: itemPath.slice('../../public/projects'.length)
            }
            if(stat.isDirectory()){
                itemData.isFolder = true;
                itemData.isFile = false;
                itemData.children = [];
                let itemCataData = fs.readdirSync(path.join(__dirname, itemPath))
                parseCatalog(itemCataData, itemPath, itemData.children)
            }else if(stat.isFile()){
                itemData.isFolder = false;
                itemData.isFile = true;
                itemData.catalogShortName =  item.slice(0, item.lastIndexOf('.'))
                itemData.fileType = item.slice(item.lastIndexOf('.') + 1)
            }
            acceptData.push(itemData)
        }
    })
}
/**
 * @api {get} /project/getCatalog 获取项目目录
 * @apiDescription 获取项目目录
 * @apiName getCatalog
 * @apiGroup project
 * @apiParam {string} projectName 项目名称
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "result" : {
 *          
 *      }
 *  }
 * @apiSampleRequest http://localhost:3000/project/getCatalog
 * @apiVersion 0.1.0
 */
router.get('/', function(req, res, next) {
    let catalog = [];
    let projectName = req.query.projectName;
    let rootPath = `../../public/projects/${projectName}`;
    let projPath = path.join(__dirname, rootPath);
    if(fs.existsSync(projPath)){
       let rootCata = fs.readdirSync(projPath)
       parseCatalog(rootCata, rootPath, catalog);
       res.json({
            code: 200,
            catalog
        });
    }else{
        res.json({
            code: 405,
            message: '项目名称有误'
        });
    }
});
module.exports = router;