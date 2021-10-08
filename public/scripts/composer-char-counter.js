$(document).ready(function () {
  // --- our code goes here ---
  const counter = $("#tweet-text").on("input", function () {
    // console.log(this.value); //The this keyword is a reference to the button
    $(".counter").val(140 - this.value.length);

    if (this.value.length > 140) {
      $(".counter").css("color", "red");
    }
  });
});
