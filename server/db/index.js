/*
 * 数据层的工厂
 */
let mysql = require("mysql");
let Config = require('./config');
let Blog = require("./blog");
let Group = require("./group");
// let connection = mysql.createConnection({
//     host: Config.dev.keepfur_blog_db.host,
//     user: Config.dev.keepfur_blog_db.user,
//     password: Config.dev.keepfur_blog_db.password,
//     database: Config.dev.keepfur_blog_db.database,
//     port: Config.dev.keepfur_blog_db.port,
//     multipleStatements: Config.dev.keepfur_blog_db.multipleStatements,
//     insecureAuth: true
// });
let pool = mysql.createPool({
    host: Config.dev.keepfur_blog_db.host,
    user: Config.dev.keepfur_blog_db.user,
    password: Config.dev.keepfur_blog_db.password,
    database: Config.dev.keepfur_blog_db.database,
    port: Config.dev.keepfur_blog_db.port,
    multipleStatements: Config.dev.keepfur_blog_db.multipleStatements,
    insecureAuth: true
});

module.exports = {
    blog: new Blog(pool),
    group: new Group(pool)
};