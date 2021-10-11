/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Prevents page from refreshing on submit, converts form data to a query string and sends a post request to the server
$(document).ready(function () {
  $(".errorBox").hide();
  $("#tweetForm").submit(function (event) {
    event.preventDefault();

    const formData = $("#tweetForm").serialize();
    const textLength = $("#tweet-text").val().length;

    if (textLength === 0) {
      $(".errorBox").text("Character must be greater than 0").slideDown();
    } else if (textLength > 140) {
      $(".errorBox").text("Character limit is 140").slideDown();
    } else {
      $.post("http:/tweets", formData, (response) => {
        //Gets the last tweet and adds it to the page
        $.ajax("/tweets", { method: "GET", dataType: "json" }).then(function (
          results
        ) {
          const lastTweet = createTweetElement(results[results.length - 1]);
          $("#tweets-container").prepend(lastTweet);
        });
        $(".errorBox").slideUp();
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
    <p class="handle">${tweet.user.handle}</p>
    </header>
    <div>
    <p>${tweet.content.text}</p>
    <div class ="line"></div>
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
