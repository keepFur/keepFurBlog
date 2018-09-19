const util = require('./util');
module.exports = class Blog {
    constructor(pool) {
        this.pool = pool;
    }
    createBlog(body) {
        let cmdText = `INSERT INTO keepfur_blog_blog (title,group_id,author_id,content,media,created_date) VALUES (?,?,?,?,?,?)`,
            cmdParams = [];
        cmdParams.push(body.title);
        cmdParams.push(body.groupId);
        cmdParams.push(body.authorId);
        cmdParams.push(body.content);
        cmdParams.push(body.media);
        cmdParams.push(util.formatDate('yyyy-mm-dd hh:MM:ss'));
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readBlogList(query) {
        let limit = Number(query.limit || 20),
            offset = Number(query.offset - 1) * limit,
            cmdText = `SELECT id,title,group_id AS groupId,content,media,created_date AS createdDate,update_date AS updateDate FROM keepfur_blog_blog WHERE status = 1`,
            cmdParams = [];
        if (query.keyword) {
            cmdText += ` AND (title LIKE '%${query.keyword}%' OR content LIKE '%${query.keyword}%')`;
        }
        // 普通用户只能看自己的任务
        if (!query.isSuper) {
            cmdText += ` AND author_id = ?`;
            cmdParams.push(query.author_id);
        }
        cmdText += ` ORDER BY created_date DESC LIMIT ?,?`;
        cmdParams.push(offset, limit);
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readBlogListTotal(query) {
        let cmdText = `SELECT COUNT(id) as total FROM keepfur_blog_blog WHERE status = 1 `,
            cmdParams = [];
        if (query.keyword) {
            cmdText += ` AND (title LIKE '%${query.keyword}%' OR content LIKE '%${query.keyword}%')`;
        }
        // 普通用户只能看自己的任务
        if (!query.isSuper) {
            cmdText += ` AND author_id = ?`;
            cmdParams.push(query.author_id);
        }
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    readBlogById(query) {
        let cmdText = `SELECT id,title,group_id AS groupId,content,media,created_date AS createdDate,update_date AS updateDate FROM keepfur_blog_blog WHERE status = 1 AND id = ? `,
            cmdParams = [Number(query.id)];
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    updateBlogById(body) {
        let cmdText = `UPDATE  keepfur_blog_blog SET `,
            cmdParams = [];
        if (body.title) {
            cmdText += `, title = ?`;
            cmdParams.push(query.title);
        }
        if (body.content) {
            cmdText += `, content = ?`;
            cmdParams.push(query.content);
        }
        if (body.media) {
            cmdText += `, media = ?`;
            cmdParams.push(query.media);
        }
        if (body.groupId) {
            cmdText += `, group_id = ?`;
            cmdParams.push(query.groupId);
        }
        cmdText += `,update_date = ?`;
        cmdParams.push(new Date());
        cmdText += ` WHERE id = ?`;
        cmdParams.push(query.id);
        cmdText = cmdText.replace(/SET ,/ig, 'SET ');
        return util.return_promise(this.pool, cmdText, cmdParams);
    }

    deleteBlogById(body) {
        let cmdText = `UPDATE  keepfur_blog_blog SET status = ? WHERE id = ? `,
            cmdParams = [body.status, body.id];
        return util.return_promise(this.pool, cmdText, cmdParams);
    }
};