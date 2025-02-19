const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const path = require("path");
const port = 5500; // กำหนดตัวแปรพอร์ตที่ใช้
const base_url = "http://localhost:5000";

app.set("views",path.join(__dirname,"/public/views"))
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/books");
        res.render("books", { books: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.get("/book/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/books/" + req.params.id);
        res.render("book", { book: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", async (req, res) => {
    try {
        const data = { title: req.body.title, author: req.body.author };
        await axios.post(base_url + "/books", data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.get("/update/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/books/" + req.params.id);
        res.render("update", { book: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.post("/update/:id", async (req, res) => {
    try {
        const data = { title: req.body.title, author: req.body.author };
        await axios.put(base_url + "/books/" + req.params.id, data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.get("/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + "/books/" + req.params.id);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
