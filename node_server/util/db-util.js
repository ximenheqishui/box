/**
 * @description  最后在抽象整理这个公共方法
* */

const allConfig = require("../config.js")
const config = allConfig.database
const mysql = require("mysql")

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    dateStrings: true
})

let query = function (sql, values) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}

/**
 * @description  创建表
 * */
let createTable = function (sql) {
    return query(sql, [])
}

/**
 * @description  查询表根据id
 * */
let findDataById = function (table, id) {
    let _sql = "SELECT * FROM ?? WHERE id = ? "
    return query(_sql, [table, id])
}


let findDataByPage = function (table, start, end) {
    let _sql = "SELECT * FROM ??  LIMIT ? , ?"
    return query(_sql, [table, start, end])
}

/**
 * @description  插入数据
 * */
let insertData = function (table, values) {
    let _sql = "INSERT INTO ?? SET ?"
    return query(_sql, [table, values])
}


/**
 * @description  更新数据
 * */
let updateData = function (table, values, id) {
    let _sql = "UPDATE ?? SET ? WHERE id = ?"
    return query(_sql, [table, values, id])
}

/**
 * @description  删除数据根据id
 * */
let deleteDataById = function (table, id) {
    let _sql = "DELETE FROM ?? WHERE id = ?"
    return query(_sql, [table, id])
}

/**
 * @description  批量删除数据根据id
 * */
let deleteDataByIds = function (table, id) {
    let _sql = "DELETE FROM ?? WHERE id IN (?)"
    return query(_sql, [table, id])
}

/**
 * @description  查询数据
 * */
let select = function (table, keys) {
    let _sql = "SELECT ?? FROM ??"
    return query(_sql, [keys, table])
}
/**
 * @description  统计数据总数
 * */
let count = function (table) {
    let _sql = "SELECT COUNT(*) AS total_count FROM ?? "
    return query(_sql, [table])
}

module.exports = {
    query,
    createTable,
    findDataById,
    findDataByPage,
    deleteDataById,
    deleteDataByIds,
    insertData,
    updateData,
    select,
    count,
}
