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
app.get("/api/user", (req, res) => {
    pool.query("SELECT r.recipe_name,r.ingredients,r.method,r.image,u.name FROM recipe as r join user as u;",(error ,rows) => {
        if (error){
            return res.status(500).json({ error });

        }

        res.json(rows);

    });
});


app.get("/api/recipe", (req, res) => {
    pool.query("SELECT * FROM recipe",(error ,rows) => {
        if (error){
            return res.status(500).json({ error });

        }

        res.json(rows);

    });
});

app.get("/api/recipe/home",(reg, res) => {
    pool.query(
        "SELECT r.recipe_id,r.recipe_name,r.image,u.name FROM recipe as r join user as u ",
        [reg.params.id],
        

        (error,rows) => {
            if (error){
                return res.status(500).json({error});
            }

            res.json(rows);
            

        }
    );
});
app.get("/api/recipe/home:id", (req, res) => {
    pool.query(
        "SELECT recipe_id,recipe_name,ingredients,method, image FROM recipe WHERE recipe_id = 1",
        [req.params.id],
        (error, rows) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(rows);
        }
    );
});

app.get("/api/recipe/home:id/name", (req, res) => {
    pool.query(
        `SELECT r.recipe_name, r.recipe_image,u.name
        FROM recipe r
        JOIN user u ON u.recipe_id = r.id 
        WHERE r.id = ?
        ORDER BY r.recipe_name`,
        [req.params.id],
        (error, rows) => {
            if (error) {
                return res.status(500).json({ error });
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

app.get("/api/recipe/add:id", (req, res) => {
    pool.query(
        "SELECT id, name, ingredients,method WHERE recipe_id = ?",
        [req.params.id],
        (error, rows) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(rows);
        }
    );
});

app.get("/api/recipe/add:id/name", (req, res) => {
    pool.query(
        `SELECT r.recipe_name,r.ingredients,r.method,r.image,u.name
        FROM recipe r
        JOIN user u ON u recipe_id = r.id
        WHERE r.recipe_id = ?
        GROUP BY r.recipe_id 
        ORDER BY r.recipe_name,u.name `,
        [req.params.id],
        (error, rows) => {
            if (error) {
                return res.status(500).json({ error });
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
app.get("/api/recipe/show:id", (req, res) => {
    pool.query(
        "SELECT image,ingredients,method FROM recipe WHERE recipe_id = ?",
        [req.params.id],
        (error, rows) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(rows);
        }
    );
});
app.post("api/user", (req, res) => {
    const user = req.body;

    if (!user.name) {
        return res.status(400).json({ error: "Invalid payload" });
    }

    pool.query(
        "INSERT INTO user (name) VALUES (?)",
        [user.name],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.insertId);
        }
    );
});

app.put("api/user/:id", (req, res) => {
    const user = req.body;

    if (!user.name) {
        return res.status(400).json({ error: "Invalid payload" });
    }

    pool.query(
        "UPDATE user SET name = ? WHERE user_id  = ?",
        [user.name, req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.changedRows);
        }
    );
});
app.delete("api/user/:id", (req, res) => {
    pool.query(
        "DELETE FROM user WHERE user_id = ?",
        [req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.affectedRows);
        }
    );
});


app.post("/api/recipe", (req, res) => {
    const recipe = req.body;

    if (!recipe.name || !recipe.ingredients || !recipe.method || !recipe.image) {
        return res.status(400).json({ error: "Invalid payload" });
    }

    pool.query(
        "INSERT INTO recipe (name, ingredients, method,  image) VALUES (?, ?, ?, ?)",
        [recipe.name, recipe.ingredients, recipe.method, recipe.image ],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.insertId);
        }
    );
});

app.put("/api/recipe/:id", (req, res) => {
    const recipe = req.body;

    if (!recipe.name || !recipe.ingredients ||!recipe.method || !recipe.image) {
        return res.status(400).json({ error: "Invalid payload" });
    }
                   pool.query(
        "UPDATE recipe SET name = ?, ingredients = ?, method = ?, image = ? WHERE id = ?",
        [recipe.name, recipe.ingredients, recipe.method, recipe.image, req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.changedRows);
        }
   );
});

app.delete("/api/recipe/:id", (req, res) => {
    pool.query(
        "DELETE FROM recipe WHERE recipe_id = ?",
        [req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.affectedRows);
        }
    );
});

app.listen(9000, () => console.log("App listening on port 9000"));

