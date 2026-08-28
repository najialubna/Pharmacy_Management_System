const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.post("/", (req, res) => {

    console.log("========== POST /api/medicines ==========");
    console.log("Body:", req.body);

    const {
        name,
        category,
        company,
        price,
        quantity,
        expiry_date,
        image
    } = req.body;

    const sql = `
        INSERT INTO medicines
        (name, category, company, price, quantity, expiry_date, image)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            category,
            company,
            price,
            quantity,
            expiry_date,
            image
        ],
        (err, result) => {

            if (err) {

                console.log("Database Error:", err);

                return res.status(500).json({
                    message: "Failed to Add Medicine"
                });
            }

            res.status(201).json({
                message: "Medicine Added Successfully",
                id: result.insertId
            });

        }
    );

});



router.get("/", (req, res) => {

    db.query(
        "SELECT * FROM medicines",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

});



router.put("/:id", (req, res) => {

    const id = req.params.id;

    const {
        name,
        category,
        company,
        price,
        quantity,
        expiry_date,
        image
    } = req.body;

    const sql = `
        UPDATE medicines
        SET
            name = ?,
            category = ?,
            company = ?,
            price = ?,
            quantity = ?,
            expiry_date = ?,
            image = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            name,
            category,
            company,
            price,
            quantity,
            expiry_date,
            image,
            id
        ],
        (err, result) => {

            if (err) {

                console.log("Update Error:", err);

                return res.status(500).json({
                    message: "Update Failed"
                });
            }

            res.json({
                message: "Medicine Updated Successfully"
            });

        }
    );

});



router.delete("/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM medicines WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {

                console.log("Delete Error:", err);

                return res.status(500).json({
                    message: "Delete Failed"
                });
            }

            res.json({
                message: "Medicine Deleted Successfully"
            });

        }
    );

});


module.exports = router;
