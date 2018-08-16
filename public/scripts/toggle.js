//Make the form slide up or down when the (new) "Compose" that you will define in the navigation:
//When the button is clicked slide that whole new-tweet section up or down.
// When the form is appears (slides down), the user has to then click on the text area to begin typing
//Ideally it should enable the textarea automatically so that the user can begin typing right after clicking the button.

$(document).ready(function() { - //as the html is ready do everything inside
  $('.new-tweet').hide();
  $('.composer').on('click', function() {
    $(".new-tweet").slideToggle("slow", function() {
      $("#text-area").select();
    });
  });
});

