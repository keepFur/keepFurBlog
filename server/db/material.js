const util = require('./util');
module.exports = class Material {
    constructor(pool) {
        this.pool = pool;
    }
    createMaterial(body) {
        let cmdText = `INSERT INTO keepfur_blog_material (name,group_id,author_id,type,path,created_date) VALUES (?,?,?,?,?,?)`,
            cmdParams = [];
        cmdParams.push(body.name);
        cmdParams.push(body.groupId);
        cmdParams.push(body.userId);
        cmdParams.push(body.type);
        cmdParams.push(body.path);
        cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'));
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readMaterialList(query) {
        let limit = Number(query.limit || 20),
            offset = Number(query.offset - 1) * limit,
            cmdText = `SELECT m.id,m.status,m.name,m.path,group_id AS groupId, u.username AS author, g.name AS groupName,m.created_date AS createdDate,m.update_date AS updateDate 
                       FROM keepfur_blog_material m 
                       INNER JOIN keepfur_blog_group g ON m.group_id=g.id 
                       INNER JOIN keepfur_blog_user u ON u.id = m.author_id WHERE m.type=?`,
            cmdParams = [query.type];
        // 普通用户只能看自己的任务
        if (!query.isSuper) {
            cmdText += ` AND m.author_id = ?`;
            cmdParams.push(query.author_id);
        }
        cmdText += ` ORDER BY m.created_date DESC LIMIT ?,?`;
        cmdParams.push(offset, limit);
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readMaterialListTotal(query) {
        let cmdText = `SELECT COUNT(id) as total FROM keepfur_blog_material WHERE 1=1 `,
            cmdParams = [];
        // 普通用户只能看自己的任务
        if (!query.isSuper) {
            cmdText += ` AND author_id = ?`;
            cmdParams.push(query.author_id);
        }
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readMaterialById(query) {
        let cmdText = `SELECT m.id,m.status,m.name,m.path,group_id AS groupId, u.username AS author, g.name AS groupName,m.created_date AS createdDate,m.update_date AS updateDate 
                        FROM keepfur_blog_material m 
                        INNER JOIN keepfur_blog_group g ON m.group_id=g.id 
                        INNER JOIN keepfur_blog_user u ON u.id = m.author_id WHERE m.id=?`,
            cmdParams = [Number(query.id)];
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    updateMaterialById(body) {
        let cmdText = `UPDATE  keepfur_blog_material SET `,
            cmdParams = [];
        if (body.groupId) {
            cmdText += `, group_id = ?`;
            cmdParams.push(body.groupId);
        }
        cmdText += `,update_date = ?`;
        cmdParams.push(new Date());
        cmdText += ` WHERE id = ?`;
        cmdParams.push(body.id);
        cmdText = cmdText.replace(/SET ,/ig, 'SET ');
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    deleteMaterialById(body) {
        let cmdText = `DELETE FROM  keepfur_blog_material WHERE id = ? `,
            cmdParams = [body.id];
        return util.return_promise(this.pool, cmdText, cmdParams);
    }
};