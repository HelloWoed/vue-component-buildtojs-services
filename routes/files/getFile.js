var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    let fileName = req.query.name;
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
