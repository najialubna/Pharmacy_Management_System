const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST || "pharmacy-db-pharmacy-db-najia.d.aivencloud.com",
    port: process.env.DB_PORT || 13288,
    user: process.env.DB_USER || "avnadmin",
    password:  process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "defaultdb",
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