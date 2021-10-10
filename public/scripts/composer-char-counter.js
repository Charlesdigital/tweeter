$(document).ready(function () {
  // --- our code goes here ---
  const counter = $("#tweet-text").on("input", function () {
    // console.log(this.value); //The this keyword is a reference to the button
    $(this)
      .parent()
      .parent()
      .find(".counter")
      .val(140 - this.value.length);

    if (this.value.length > 140) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });

  // const tweetCheck = $("#tweet-button").on("submit", function () {
  //   const textLength = $("#tweet-text").val().length;
  //   console.log(textLength);
  // });
  // if (this.value.length > 140) {
  //   $(".counter").css("color", "red");
  // }
});
//$("") document.querySelector - targets classes and ids - return a jquery dom node

//jquery have helper functions
//this is what you input on

//<div class="textArea"> is the parent of the input, not the parent of the counter .parent()

//using .parent().parent() gets you the   <section class="new-tweet">, which gets you access to the 140 since its in section
