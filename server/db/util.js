"use strict";
class Util {
    /**
  * 格式化日期,format是格式化的格式，date是要格式化的日期
  * @param {any} format 
  * @param {any} date 
  * @returns 
  */
    formatDate(format, date) {
        if (typeof format !== "string") {
            format = "yyyy-mm-dd hh:MM:ss";
        }
        date = this.getDate(date);
        return format
            .replace(/yyyy/gi, date.year)
            .replace(/mm/, this.fullTime(date.month))
            .replace(/dd/gi, this.fullTime(date.day))
            .replace(/hh/gi, this.fullTime(date.hours))
            .replace(/MM/, this.fullTime(date.minutes))
            .replace(/ss/gi, this.fullTime(date.seconds));
    }

    /**
     * 根据参数返回年月日时分秒对象,为空则返回当前时间
     * @param {any} date 
     * @returns 
     */
    getDate(date) {
        date = this.isString(date) ? new Date(date) : (date || new Date());
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        }
    }

    /**
     * 判断是否是 Array 对象
     * 
     * @param {any} obj 
     */
    isArray(obj) {
        return obj instanceof Array;
    }

    /**
     * 
     * 判断是否是 string 对象
     * @param {any} obj 
     * @returns 
     */
    isString(obj) {
        return typeof obj === "string";
    }

    //得到一个guid值
    getGUID() {
        return this.formatDate("yyyymmddhhMMss") + Math.floor(Math.random() * 10000000);
    }

    /**
     * 
     * 填充时间,判断时间是否是十位数，不是则前位补0
     * @param {any} time 
     * @returns 
     */
    fullTime(time) {
        return time >= 10 ? time : ("0" + time);
    };

    /**
     * 
     * 数据库操作函数
     * @param {any} pool 数据库链接池 
     * @param {any} cmdText sql 
     * @param {any} cmdParams 查询参数
     * @returns 
     */
    return_promise(pool, cmdText, cmdParams) {
        const that = this;
        return new Promise(function (resolve, reject) {
            try {
                pool.getConnection(function (err, connection) {
                    if (err) {
                        reject(err);
                    } else {
                        connection.query(cmdText, cmdParams, function (err, result) {
                            if (err) {
                                that.log(err);
                                reject(err);
                            } else {
                                resolve(result);
                            }

                        });
                    }
                    if (connection) {
                        connection.release();
                    }
                });
            } catch (err) {
                that.log(err);
            }
        });
    }

    // /**
    //  * 
    //  * 数据库操作函数
    //  * @param {any} pool 数据库链接池 
    //  * @param {any} cmdText sql 
    //  * @param {any} cmdParams 查询参数
    //  * @returns 
    //  */
    // return_promise(connection, cmdText, cmdParams) {
    //     const that = this;
    //     return new Promise(function (resolve, reject) {
    //         connection.query(cmdText, cmdParams, function (err, result) {
    //             if (err) {
    //                 that.log(err);
    //                 reject(err);
    //             } else {
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }

    /**
     * 在控制台输入信息，可自定义打印消息类型
     * 
     * @param {any} type 
     * @param {any} msg 
     */
    log(type, msg) {
        if (typeof console) {
            var args = Array.prototype.slice.call(arguments);
            if (args.length === 1) {
                msg = type;
                console.log(this.formatDate(new Date()) + ":" + msg);
            } else if (args.length > 1) {
                console[type](this.formatDate(new Date()) + ":" + msg);
            }
        }
    }

    /**
     * 将对象进行深copy
     */
    deepCopy(source) {
        let result = {};
        for (var key in source) {
            result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
        }
        return result;
    }

    /**
     * 将数组转化为字符串参数，数据库可以识别的
     */
    convertParams(arr) {
        var str = '(';
        if (Array.isArray(arr) && arr.length) {
            arr.forEach(function (ele, index) {
                if (index !== arr.length - 1) {
                    str += '?,';
                } else {
                    str += '?)';
                }
            });
        }
        return str;
    }
}

module.exports = new Util();