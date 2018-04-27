//make sure the code runs after the page has finished loading

$(document).ready(function(){

//create an event handler for each of these events in the file
//how do we create an event handler/listener?


//you have to tell on which element
 // $("textarea").on('change', function(event){ //first parameter tells on which event this will happen
 //  console.log("on change");
 // })

  $("textarea").on("keyup", function() {
    const charactersLeft = 140 - $(this).val().length;
    const counter = $(this).siblings('.counter');
    counter.html(charactersLeft);
    if (charactersLeft < 0) {
      counter.addClass("redText");
    } else {
      counter.removeClass("redText");
    }
    // console.log("here is a trial");
  });

//you know the max characters -- try to figure out with using keyup how many you have left
// how do i store those two numbers to make the subtraction?

//start at 140 and then find out how many values will be left in the box when you start typing in it


// $("textarea").on('keyup', function(event){
// console.log('keyup', this.value.length);


// $("textarea").on('keydown', function(event){
// console.log('keydown', this.value.length);

// });

});