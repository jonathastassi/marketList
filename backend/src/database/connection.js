const mysql = require('mysql');

module.exports = () => {
    return () => {
        return mysql.createConnection({
            'host': process.env.HOST,
            'user': process.env.USER_DB,
            'password': process.env.PASSWORD_DB,
            'database': process.env.DATABASE_DB
        })
    }
}