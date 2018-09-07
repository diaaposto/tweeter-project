"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();
const ObjectId      = require('mongodb').ObjectID;

module.exports = function(DataHelpers) {
//tweetRoutes is an object and get is its property
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      total_likes: 0
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.post("/likes", function(req, res) {
    //getting id from request
    const tweetId = req.body.tweetId;
    DataHelpers.saveLike(tweetId, (err, documents) => {
      if (err) {
        console.log("this is the error", err)
      }
      res.status(201).send(documents)
    });
    // res.send();
  })

  return tweetsRoutes;

}

