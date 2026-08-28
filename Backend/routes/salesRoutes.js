const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.post("/", (req, res) => {

    const { medicine_id, customer, quantity, price, total } = req.body;

    
    const saleSql = `
        INSERT INTO sales
        (medicine_id, customer, quantity, price, total)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        saleSql,
        [medicine_id, customer, quantity, price, total],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to Add Sale"
                });
            }

           
            const updateSql = `
                UPDATE medicines
                SET quantity = quantity - ?
                WHERE id = ?
            `;

            db.query(
                updateSql,
                [quantity, medicine_id],
                (err2, result2) => {

                    if (err2) {
                        return res.status(500).json({
                            message: "Sale Added But Stock Update Failed"
                        });
                    }

                    res.json({
                        message: "Sale Added & Stock Updated Successfully"
                    });

                }
            );

        }
    );

});


router.get("/", (req, res) => {

    db.query("SELECT * FROM sales", (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

module.exports = router;