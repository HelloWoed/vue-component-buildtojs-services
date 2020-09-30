const path = require('path');
const fs = require('fs');
const basePath = '../routes';
const baseRoutePath = '';

var routeObj = [];
const getRoutes = (routePath,baseRoutePath) => {
    let pathStr = path.join(__dirname,routePath);
    if(fs.existsSync(pathStr)){// 判断路径是否存在
        let routes = fs.readdirSync(pathStr);
        routes.forEach(item => {
            let itemRoutePath = `${routePath}/${item}`;
            let itemPath = `${baseRoutePath}/${item}`;
            const stat = fs.lstatSync(path.join(__dirname,`${routePath}/${item}`));
            if(stat.isDirectory()){//判断是否是文件夹
                getRoutes(itemRoutePath,itemPath);
            }else if(stat.isFile()){//判断是否是文件
                if(itemPath.slice(-2) === 'js'){// 只有js文件才会做路由相关处理
                    if(item === 'index.js'){
                        if(baseRoutePath){
                            itemPath = `${baseRoutePath}.js`;
                        }else{
                            itemPath = `${baseRoutePath}/.js`;
                        }
                    }
                    routeObj.push({
                        path: itemPath.slice(0, -3),
                        route: require(itemRoutePath)
                    })
                }
            }
        })
    }
}
getRoutes(basePath,baseRoutePath);
const resolveRoute = (app) => {
    routeObj.forEach(item => {
        app.use(item.path,item.route)
    })
}
module.exports = resolveRoute;