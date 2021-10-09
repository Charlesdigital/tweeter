/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("#tweetForm").submit(function (event) {
    event.preventDefault();
    const formData = $("#tweetForm").serialize();
    console.log(formData);
    $.post("http://localhost:8080/tweets", formData, () => {});
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
  const tweetData = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  };

  renderTweets(tweetData);
});

// to add it to the page so we can make sure it's got all the right elements, classes, etc.

//$(document).ready(function () { include it, wait for the html to load
//prepend to add at the top

/* <section id = "tweets-container">
<article class ="tweet">
<header>
<div class = "headerLeft">
<img src = ${tweetData.user.avatars}">
<p>${tweetData.user.name}</p>
</div>
<p>${tweetData.user.handle}</p>
</header>
<div>
<p>${tweetData.content.text}</p>
</div>
<footer class = "articleFooter">
<p>${tweetData.content.created_at}</p>
<div class = "icons">
<i class="fas fa-flag"></i>
<i class="fas fa-retweet"></i>
<i class="fas fa-heart"></i>
</div>
</footer>
</article>
</section>`







const $tweet = $(`

`); */

/* const $tweet = $(`<article class="tweet">${tweetData.user.name}</article>`); */
