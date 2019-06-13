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
    pool.query("SELECT recipe_id name FROM recipe",(error ,rows) => {
        if (error){
            return res.status(500).json({ error });

        }

        res.json(rows);

    });
});

app.get("/api/recipe/home",(reg, res) => {
    pool.query(
        "SELECT r.recipe_id,r.name,r.image,u.name FROM recipe as r join user as u;",
        (error,rows) => {
            if (error){
                return res.status(500).json({error});
            }

            res.json(rows);
            

        }
    );
});


        
   
app.listen(9000, () => console.log("App listening on port 9000"));

