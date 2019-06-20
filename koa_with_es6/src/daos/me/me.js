import {pool} from '../../stores/mysql'
import {MYSQL} from "../../config";

export const userExist = async ({name, phone}) => {
    let connection = await pool(MYSQL.IOU)
    const sql = `select user_id from user where user_name = ? or user_phone = ?`
    const params = [name, phone]
    const ret = await connection.query(sql, params)
    return ret
}