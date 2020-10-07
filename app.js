const express = require("express");
const mysql = require("mysql");
const app = express();
const path = require ("path");
const PORT = 3000;

app.get("/index", (req,res) => {
    res.sendFile(path.join(__dirname + "/pages/index.html"));
});

app.get("/", (req, res) => {
    res.write("<h1> HOME </h1>");
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "newdb",
});

db.connect((err) => {
    if(!err){
        console.log("Connected to mysql");
    }else{
        console.log("error mysql");
    }
});
//create DB
app.get("/createDB", (req,res) => {
    let sql = "CREATE DATABASE newdb";
    db.query(sql,(err, result) => {
        if(!err){
            res.send("Created newdb");
        }else{
            res.send("db fail");
        }
    });
});

//table
app.get("/createTable", (req,res) => {
    let sql = 
    "CREATE TABLE student (id int AUTO_INCREMENT, fname VARCHAR(255), lname VARCHAR(255), PRIMARY KEY(id))";
    db.query(sql,(err, result) => {
        if(!err){
            res.send("Created Table");
        }else{
            res.send("Sad");
        }
    });
});

//drop
app.get("/drop", (req,res) => {
    let sql = "DROP TABLE student";
    db.query(sql,(err, result) => {
        if(!err){
            res.send("Dropped");
        }else{
            res.send("Sad");
        }
    });
});
//create(insert)
app.get("/insert", (req,res) => {
    let newRow = {fname: "Jomai", lname: "Mendoza"}
    let sql = "INSERT INTO student SET ?";
    db.query(sql, newRow, (err, result) => {
        if(!err){
            res.send("Insert");
        }else{
            res.send("Sad");
        }
    });
});
//read
app.get("/read", (req,res) => {
    let sql = "SELECT * FROM student";
    db.query(sql, (err, result) => {
        if(!err){
            res.send("result");
        }else{
            res.send("Sad");
        }
    });
});
//update
app.get("/update", (req,res) => {
    let sql = "UPDATE student SET fname = '8man' , lname = 'Hikigaya' WHERE id = 1";
    db.query(sql, (err, result) => {
        if(!err){
            res.send("result");
        }else{
            res.send("Sad");
        }
    });
});
//delete
app.get("/delete", (req,res) => {
    let sql = "DELETE FROM student WHERE id = 1";
    db.query(sql, (err, result) => {
        if(!err){
            res.send("result");
        }else{
            res.send("Sad");
        }
    });
});
app.listen(PORT,() => {
    console.log(`Connected to port ${PORT}`);
});

//express
//mysql
//http
//templating (ejs, hbs)