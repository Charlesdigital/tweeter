/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Prevents page from refreshing on submit, converts form data to a query string and sends a post request to the server
$(document).ready(function () {
  $("#tweetForm").submit(function (event) {
    event.preventDefault();
    const formData = $("#tweetForm").serialize();
    console.log(formData);
    const textLength = $("#tweet-text").val().length;
    console.log(textLength);
    if (textLength === 0) {
      alert("Character must be greater than 0");
    } else if (textLength > 140) {
      alert("Character limit is 140");
    } else {
      $.post("http:/tweets", formData, (response) => {
        //Get the last tweet
        $.ajax("/tweets", { method: "GET", dataType: "json" }).then(function (
          results
        ) {
          console.log("tweet: ", results[results.length - 1]);
          const lastTweet = createTweetElement(results[results.length - 1]);
          $("#tweets-container").append(lastTweet);
        });
      });
    }
  });

  function createTweetElement(tweet) {
    const $tweet = $(`
    <article class ="tweet">
    <header>
    <div class = "headerLeft">
    <img src = "${tweet.user.avatars}">
    <p>${tweet.user.name}</p>
    </div>
    <p>${tweet.user.handle}</p>
    </header>
    <div>
    <p>${tweet.content.text}</p>
    </div>
    <footer class = "articleFooter">
    <p>${timeago.format(tweet.created_at)}</p>
    <div class = "icons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </div>
    </footer>
    </article>
    `);

    return $tweet;
  }
  // const tweetData = [
  //   {
  //     user: {
  //       name: "Newton",
  //       avatars: "https://i.imgur.com/73hZDYK.png",
  //       handle: "@SirIsaac",
  //     },
  //     content: {
  //       text: "If I have seen further it is by standing on the shoulders of giants",
  //     },
  //     created_at: 1461116232227,
  //   },
  //   {
  //     user: {
  //       name: "Descartes",
  //       avatars: "https://i.imgur.com/nlhLi3I.png",
  //       handle: "@rd",
  //     },
  //     content: {
  //       text: "Je pense , donc je suis",
  //     },
  //     created_at: 1461113959088,
  //   },
  // ];
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  };

  function loadTweets() {
    $.ajax("/tweets", { method: "GET", dataType: "json" }).then(function (
      results
    ) {
      console.log("Success: ", results);
      renderTweets(results);
    });
  }

  loadTweets();

  //Loop through the array of data objects and display a new tweet article
});

// to add it to the page so we can make sure it's got all the right elements, classes, etc.

//$(document).ready(function () { include it, wait for the html to load
//prepend to add at the top

/* const $tweet = $(`<article class="tweet">${tweetData.user.name}</article>`); */
