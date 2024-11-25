var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("dist"));

console.log(__dirname);

// Variables for url and api key
const mainUrl = "https://api.meaningcloud.com/sentiment-2.1?key=";
const apiKey = process.env.API_KEY;

app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

// POST Route
app.post("/userPost", async (req, res) => {
  const userUrl = req.body.url;

  const fullApi = `${mainUrl}${apiKey}&url=${userUrl}&lang=en`;
  const response = await fetch(fullApi);
  const json = await response.json();
  res.send(json);
});

// Designates what port the app will listen to for incoming requests
app.listen(3000, function () {
  console.log("App listening on port 3000!");
});
