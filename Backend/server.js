const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());




const uploadsPath = path.join(__dirname, "uploads");

console.log("Uploads folder:", uploadsPath);

app.use("/uploads", express.static(uploadsPath));



const db = require("./config/db");



const medicineRoutes = require("./routes/medicineRoutes");
const salesRoutes = require("./routes/salesRoutes");

app.use("/api/medicines", medicineRoutes);
app.use("/api/sales", salesRoutes);


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, uploadsPath);
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }

});

const upload = multer({
    storage: storage
});


app.post("/api/upload", upload.single("image"), (req, res) => {

    if (!req.file) {

        return res.status(400).json({
            message: "No image uploaded"
        });

    }

    console.log("Uploaded image:", req.file.filename);

    res.json({

        message: "Image uploaded successfully",

        image: req.file.filename

    });

});


const frontendPath = path.join(__dirname, "..");

app.use(express.static(frontendPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});