const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "pharmacy-mysql-pharmacy-db-najia.a.aivencloud.com",
    port: 13288,
    user: "avnadmin",
    password: "process.env.DB_PASSWORD",
    database: "faultdb",
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed:", err);
    } else {
        console.log("MySQL Connected Successfully");
    }
});

module.exports = db;