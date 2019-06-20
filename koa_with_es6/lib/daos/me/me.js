'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userExist = undefined;

var _mysql = require('../../stores/mysql');

const userExist = exports.userExist = async ({name, phone}, connection = _mysql.poolOfIou) => {
    const sql = `select user_id from user where user_name = ? or user_phone = ?`;
    console.log(typeof connection);
    const params = [name, phone];
    const ret = await connection.query(sql, params);
    return ret;
};