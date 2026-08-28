const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            message: "No image uploaded"
        });
    }

    res.json({
        message: "Image uploaded successfully",
        image: req.file.filename
    });
});

module.exports = router;