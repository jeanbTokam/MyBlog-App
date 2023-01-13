const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;
app.use(express.json());

const posts= require("./routes/postRoutes");


app.use("/api/posts", posts);


const path = require("path");


app.listen(port, () => console.log(`Node server listening on port ${port}🎇🎆🤑`));




