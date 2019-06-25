require("dotenv").config();
const express = require("express");
const mysql = require ("mysql");
const app = express();


const pool = mysql.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME
});


app.get("/api/recipe", (req, res) => {
    pool.query("SELECT recipe_id recipe_name FROM recipe",(error ,rows) => {
        if (error){
            return res.status(500).json({ error });

        }

        res.json(rows);

    });
});

app.get("/api/recipe/home",(reg, res) => {
    pool.query(
        "SELECT r.recipe_id,r.recipe_name,r.image,u.name FROM recipe as r join user as u WHERE user_id = ?",
        [reg.params.id],
        

        (error,rows) => {
            if (error){
                return res.status(500).json({error});
            }

            res.json(rows);
            

        }
    );
});

app.get("/api/recipe/add",(reg, res) => {
    pool.query(
        "SELECT r.recipe_name,r.ingredients,r.method,r.image,u.name FROM recipe as r join user as u;",
        (error,rows) => {
            if (error){
                return res.status(500).json({error});

            }

            res.json(rows);
        }
    );
});

app.get("/api/recipe/show",(reg,res) => {
    pool.query(
        "SELECT r.recipe_name,image,r.ingredients,r.method FROM recipe as r;",
        (error,rows) => {
            if (error){
                return res.status(500).json({error});

            }

            res.json(rows);
        }
    );
});
app.post("/reecipe_box", (req, res) => {
    const recipe = req.body;

    if (!recipe.name) {
        return res.status(400).json({ error: "Invalid payload" });
    }

    pool.query(
        "INSERT INTO recipe (name) VALUES (?)",
        [recipe.name],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.insertId);
        }
    );
});

   
app.listen(9000, () => console.log("App listening on port 9000"));

