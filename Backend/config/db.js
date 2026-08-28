const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pharmacy_db"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed:", err);
    } else {
        console.log("MySQL Connected Successfully");
    }
});

module.exports = db;