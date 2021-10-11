$(document).ready(function () {
  const counter = $("#tweet-text").on("input", function () {
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
});
