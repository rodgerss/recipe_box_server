const express = require("express");
const mysql = require ("mysql");
const app = express();


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "PASSWORD",
    database: "reecipe_box"
});

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/api/recipe", (req, res) => {
    pool.query("SELECT recipe_id method FROM recipe",(error ,rows) => {
        if (error){
            return res.status(500).json({ error });

        }

        res.json(rows);

    });
});

app.listen(9000, () => console.log("App listening on port 9000"));

