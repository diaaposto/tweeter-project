$(document).ready(function(){

  $("textarea").on("keyup", function() {
    const charactersLeft = 140 - $(this).val().length;
    const counter = $(this).siblings('.counter');
    counter.html(charactersLeft); // use .text instead of html here and do not escape - change escape character function
    if (charactersLeft < 0) {
      counter.addClass("redText");
    } else {
      counter.removeClass("redText");
    }
  });



});