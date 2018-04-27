$(document).ready(function() {
  $('.new-tweet').hide();
  $('.composer').on('click', function() {
    $(".new-tweet").slideToggle("slow", function() {
      $("#text-area").select();
    });
  });
});