"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const path          = require("path");
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";
const sassMiddleware = require('node-sass-middleware');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  "/scripts",
  express.static(
    path.join(path.normalize(__dirname + "/.."), "/node_modules/moment/min")
  )
);

app.use(sassMiddleware({
    /* Options */
    src: 'public/scss',
    dest: 'public/styles', //where sass will be compiled to
    force: true,
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/styles'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

// The in-memory database of tweets. It's a basic object with an array in it.
// const db = require("./lib/in-memory-db");

MongoClient.connect(MONGODB_URI, (err, db) => {

  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  } 
  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
const DataHelpers = require("./lib/data-helpers.js")(db);
const tweetsRoutes = require("./routes/tweets")(DataHelpers);
app.use("/tweets", tweetsRoutes);
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:


// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.

// Mount the tweets routes at the "/tweets" path prefix:

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
