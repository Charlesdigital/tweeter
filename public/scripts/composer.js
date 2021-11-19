$(function () {
  $(window).scroll(function () {
    $(".scrollUp").css("display", "inline");
  });
  $(".scrollUp").click(function () {
    $(window).scrollTop(0);
    $(window).scroll(function () {
      $(".scrollUp").css("display", "none");
    });
  });
});
