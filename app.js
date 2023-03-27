const express =require("express");
const app = express();
const { getCategories } = require("./controllers/getCategories.controller");
const {invalidPath} = require("./errors.js")


app.get("/api", (req, res) => {
    res.status(200).send({ message: "all okay" })
});
app.get("/api/categories", getCategories);

app.all('/*', invalidPath)




module.exports = app;