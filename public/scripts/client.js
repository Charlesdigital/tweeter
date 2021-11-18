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
          $("textArea").val("");
          $(".counter").val(140);
          const lastTweet = createTweetElement(results[results.length - 1]);
          $("#tweets-container").prepend(lastTweet);
        });
        $(".errorBox").slideUp();
      });
    }
  });

  //creates new tweet box
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
    <p class = "tweet-content">${tweet.content.text}</p>
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
    </article>`);
    return $tweet;
  }

  //Loops through tweets, creates new element article and appends it
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };
  //Get array of tweets to render them
  function loadTweets() {
    $.ajax("/tweets", { method: "GET", dataType: "json" }).then(function (
      results
    ) {
      console.log("Success: ", results);
      renderTweets(results);
    });
  }

  loadTweets();

  const tweetBox = $(`
  <div class="errorBox"></div>
  <section class="new-tweet">
    <form id="tweetForm" method="POST" action="/tweets">
      <div class="textArea">
        <label for="tweet-text">What are you humming about?</label>
        <textarea rows="1" name="text" id="tweet-text"></textarea>
      </div>
      <!-- User insert tweets here-->
      <div class="tweetCount">
        <button id="tweet-button" type="submit">Tweet</button>
        <output name="counter" class="counter" for="tweet-text"
          >140</output
        >
      </div>
    </form>
  </section>
  <!-- Tweet articles get displayed here-->
  <section id="tweets-container"></section>
`);

  $(".toggle").on("click", function () {
    const $section = $(".new-tweet");

    if ($section.is(":visible")) {
      $section.slideUp("fast");
    } else {
      $section.slideDown("fast");
    }
  });
});
