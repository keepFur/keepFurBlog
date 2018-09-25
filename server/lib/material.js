const DB = require('../db/index');
const fs = require('fs');
const path = require('path');
class Material {
    createMaterial(req, res) {
        let file = req.body.file[0];
        let base64 = file.url.replace(/^data:image\/\w+;base64,/, "");
        //把base64码转成buffer对象，
        let dataBuffer = new Buffer(base64, 'base64');
        let filename = file.name;
        let dir = function () {
            const type = req.body.type;
            return 'server/materials' + (type === '1' ? '/image' : type === '2' ? '/audio' : '/video');
        };
        let filePath = path.join(path.resolve(), dir(), filename);
        // 多文件写入解决方案：
        // 方案一，单文件循环写入，并插入到数据库中，统计成功和失败的次数，返回给客户端
        // 方案二，先把文件写入，然后批量插入到数据库中
        fs.writeFile(filePath, dataBuffer, function (err) {
            if (err) {
                res.send({
                    ret: 1,
                    msg: err.message
                });
            }
            DB.material.createMaterial(req.body).then(() => {
                res.send({
                    ret: 0,
                    msg: ''
                });
            }).catch(err => {
                res.send({
                    ret: 1,
                    msg: err.message
                });
            });
        });
    }

    readMaterialList(req, res) {
        DB.material.readMaterialList(req.query).then(resData => {
            DB.material.readMaterialListTotal(req.query).then(total => {
                res.send({
                    ret: 0,
                    msg: '',
                    total: total.total,
                    rows: resData
                });
            });
        }).catch(err => {
            res.send({
                ret: 1,
                msg: err.message
            });
        });
    }

    readMaterialById(req, res) {
        DB.material.readMaterialById(req.query).then(resData => {
            res.send({
                ret: 0,
                msg: '',
                material: resData
            });
        }).catch(err => {
            res.send({
                ret: 1,
                msg: err.message
            });
        });
    }

    updateMaterialById(req, res) {
        DB.material.updateMaterialById(req.body).then(() => {
            res.send({
                ret: 0,
                msg: '',
            });
        }).catch(err => {
            res.send({
                ret: 1,
                msg: err.message
            });
        });
    }

    deleteMaterialById(req, res) {
        DB.material.deleteMaterialById(req.body).then(() => {
            res.send({
                ret: 0,
                msg: '',
            });
        }).catch(err => {
            res.send({
                ret: 1,
                msg: err.message
            });
        });
    }
}

module.exports = new Material();

