var twit = require("twit");
var config = require("./config.js");

var Twitter = new twit(config);

var retweet = function() {
  var params = {
    q: "#nodejs, #css, #frontend", // REQUIRED
    result_type: "recent",
    lang: "en"
  };

  Twitter.get("search/tweets", params, function(err, data) {
    // if there no errors
    if (!err) {
      // grab ID of tweet to retweet
      var retweetId = data.statuses[0].id_str;
      // Tell TWITTER to retweet
      Twitter.post(
        "statuses/retweet/:id",
        {
          id: retweetId
        },
        function(err, response) {
          if (response) {
            console.log("Bingo!!");
          }
          // if there was an error while tweeting
          if (err) {
            console.log(
              "Something went wrong while RETWEETING... Duplication maybe..."
            );
          }
        }
      );
    }
    // if unable to Search a tweet
    else {
      console.log("Something went wrong while SEARCHING...");
    }
  });
};

// grab & retweet as soon as program is running...
retweet();
// retweet in every 50 minutes
setInterval(retweet, 3000000);
