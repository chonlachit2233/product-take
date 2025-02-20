var express = require("express");
var cors = require("cors");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "myproduct-take" 
});

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.listen(5000, function () {
    console.log("🚀 Server running on port 5000");
});


app.get("/products", function (req, res) {
    connection.query("SELECT * FROM product_take", function (err, results) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});


app.get("/products/:id", function (req, res) {
    const id = req.params.id;
    connection.query("SELECT * FROM product_take WHERE id = ?", [id], function (err, results) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});


app.post("/products/create", function (req, res) {
    const { product_name, product_price, product_cost, product_image } = req.body;
    connection.query(
        "INSERT INTO product_take (product_name, product_price, product_cost, product_image) VALUES (?, ?, ?, ?)",
        [product_name, product_price, product_cost, product_image],
        function (err, results) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: "✅ Product created successfully", results });
        }
    );
});


app.put("/products/update", function (req, res) {
    const { id, product_name, product_price, product_cost, product_image } = req.body;
    connection.query(
        "UPDATE product_take SET product_name=?, product_price=?, product_cost=?, product_image=? WHERE id=?",
        [product_name, product_price, product_cost, product_image, id],
        function (err, results) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({
                status: 200,
                message: "✅ Product updated successfully",
                affectedRows: results.affectedRows,
            });
        }
    );
});

app.delete("/products/delete", function (req, res) {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
    }
    connection.query("DELETE FROM product_take WHERE id=?", [id], function (err, results) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({
            status: 200,
            message: "✅ Product deleted successfully",
            affectedRows: results.affectedRows,
        });
    });

});

