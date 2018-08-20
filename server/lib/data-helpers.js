"use strict";
const {ObjectID} = require('mongodb');

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets")
      .insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets")
      .find()
      .toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    },
    saveLike: function(tweetId, callback) {
      //update the totalLikes for that tweet
      db.collection("tweets")
      .update(
        { _id: ObjectID(tweetId) }, 
        { $inc: { total_likes: 1 } },
        callback
      )
    }
  };
}
