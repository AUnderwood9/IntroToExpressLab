let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
let fs = require("fs");

let jsonPath = path.join(__dirname, "assets/stuff.json");
let ws = fs.createWriteStream(jsonPath);

app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
    console.log(req.body.email);
    console.log(req.body.name);
    next();
});

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res ) => {
    res.send("Hello World");
});

app.post("/contact-form", (req, res) => {
    let tempObj = { name: req.body.name , email: req.body.email };
    let tempJson = JSON.stringify(tempObj);
    ws.write(tempJson);

    res.send(tempJson);
});

app.listen(3000);