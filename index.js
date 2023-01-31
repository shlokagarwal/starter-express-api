const express = require('express')
const app = express()
app.use(express.json())
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('productionregister.db');
db.serialize(function () {
    // Create a table
    db.run("CREATE TABLE IF NOT EXISTS Register (date TEXT PRIMARY KEY, a INTEGER, b INTEGER, c INTEGER, d INTERGER, e INTEGER, productionStart TEXT, productionEnd TEXT)");
    // Insert data into the table
    // db.run("INSERT INTO Register (date, a, b, c, d, e) VALUES ('2023-01-31T13:09:12.445Z', 2, 0, 5, 2, 2)");
    // Query data from the table
    db.each("SELECT * FROM Register", function (err, row) {
        console.log(row);
    });
});
db.close();

app.post('/production/update', (req, res) => {
    console.log("Just got a update production entry request!");
    let db = new sqlite3.Database('productionregister.db');
  
    let date = req.body.date;
    let a = req.body.a;
    let b = req.body.b;
    let c = req.body.c;
    let d = req.body.d;
    let e = req.body.e;
    let productionStart = req.body.productionStart;
    let productionEnd = req.body.productionEnd;

    let sql = `UPDATE Register SET a = ${a}, b = ${b} , c = ${c}, d = ${d}, e = ${e}, productionStart = '${productionStart}', productionEnd = '${productionEnd}' WHERE date = '${date}'`;
    console.log(sql);
    db.all(sql, [], (err, rows) => {
        if (err) {

            res.send({
                "error": err
            });
            throw err;
        }
        console.log(rows);
        res.send({"error": null});
    });

    // close the database connection
    db.close();

})

app.all('/production/all', (req, res) => {
    console.log("Just got a get all request!");
    let db = new sqlite3.Database('productionregister.db');

    let sql = `SELECT * FROM Register`;

    db.all(sql, [], (err, rows) => {
        if (err) {

            res.send({
                "error": err
            });
            throw err;
        }

        res.send(rows);
    });

    // close the database connection
    db.close();


})

app.post('/production/add', (req, res) => {
    console.log("Just got a add production entry request!");
    let db = new sqlite3.Database('productionregister.db');
  
    let date = req.body.date;
    let a = req.body.a;
    let b = req.body.b;
    let c = req.body.c;
    let d = req.body.d;
    let e = req.body.e;
    let productionStart = req.body.productionStart;
    let productionEnd = req.body.productionEnd;
    let sql = `INSERT INTO Register (date, a, b, c, d, e, productionStart, productionEnd) values ('${date}', ${a}, ${b}, ${c}, ${d}, ${e}, '${productionStart}', '${productionEnd}')`;
    console.log(sql);
    db.all(sql, [], (err, rows) => {
        if (err) {

            res.send({
                "error": err
            });
            throw err;
        }
        console.log(rows);
        res.send({"error": null});
    });

    // close the database connection
    db.close();

})

app.post('/production/delete', (req, res) => {
    console.log("Just got a delete production entry request!");
    let db = new sqlite3.Database('productionregister.db');
  
    let date = req.body.date;

    let sql = `DELETE FROM Register WHERE date = '${date}'`;
    console.log(sql);
    db.all(sql, [], (err, rows) => {
        if (err) {

            res.send({
                "error": err
            });
            throw err;
        }
        console.log(rows);
        res.send({"error": null});
    });

    // close the database connection
    db.close();

})
app.listen(process.env.PORT || 3000)