//how js date to string to get dd/mm/yyyy
function describeTime(t) {
  const now = new Date();
  const timeDiff = now - t;
  // console.log("timediff is", timeDiff);
  // console.log("now is", now);
  // console.log("t is", t);
  // console.log("is this t or f", timeDiff <= 1000);

  if (timeDiff <= 1000) {
    return "less than 1 second ago";
  } else if (timeDiff <= 1000 * 60) {
    return "less than 1 min ago";
  } else if (timeDiff <= 1000 * 60 * 60) {
    return "less than 1 hour ago";
  } else if (timeDiff <= (1000 * 60 * 60 * 24)) {
    return "less than 1 day ago";
  } else if (timeDiff <= (1000 * 60 * 60 * 24 * 7)) {
    return "less than 1 week ago";
  } else {
    return "ages ago";
  }
}

function heartLikes () {

}

function createTweetElement(tweet) {
  // console.log(tweet.user.avatars.small);
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  let tweetElement = `
        <div class="tweet" id="${tweet._id}">
          <header>
            <img src=${tweet.user.avatars.small}>
            <h1 class="tweeter-name">${escape(tweet.user.name)}</h1>
            <h2 class="tweeter-handle">${escape(tweet.user.handle)}</h2>
          </header>
          <div class="tweet-body">
            <p class="tweet-content">${escape(tweet.content.text)}</p>
          </div>

          <footer>
            <div class="tweet-time">
            ${describeTime(tweet.created_at)}
              </div>
              
              <div class="icons">
                <i class="fa fa-flag" aria-hidden="true"></i>
                <i class="fa fa-retweet" aria-hidden="true"></i>
                <i class="fa fa-heart" aria-hidden="true"></i>
                <span="likeNumbers">${tweet.total_likes}</span> 
              </div>
          </footer>
        </div>`;

        console.log(tweet);

  return $(tweetElement);
}

function renderTweets(data) {
  for (const tweet of data) {
    const tweetElement = createTweetElement(tweet);
    $('#tweet-container').prepend(tweetElement);
  }
  $('.fa-heart').on("click", function(event) {
    const tweetId = event.target.closest('.tweet').id;
    console.log('likes');

    $.ajax({
      url: "/tweets/likes",
      method: "POST",
      dataType: 'json',
      data: {tweetId: tweetId} //want to send the id of the thing -- when you click on a heart, get the closest tweet and then get its id
    })
  })
}
//reset your form so form content should be clear and reset your counter to 140
//if you clear content of your form counter should reset automatically
//find counterclass in form and change its value to 140

$(document).ready(function() {
  $('.error-message').hide();

  $("#compose").submit(function(e) {
    e.preventDefault();

    const dataString = $("#compose").serialize();
    const textContent = $('#text-area').val();
    const url = "/tweets";

    if (textContent === '' || textContent.length > 140) {
      // alert("Enter your tweet in this area")
      $('.error-message').slideDown(1000)
                         .delay(2000)
                         .slideUp(1000);
    } else {
      // console.log("Success");
      // console.log(dataString);
      $.ajax({
        method: "POST",
        url: url,
        data: dataString,
        success: (data) => {
          $(this)[0].reset(); 
          $(this).find('.counter').text(140); //when you have a parent you use find 
          // console.log($(this));
          loadTweets();
        }
      });
    }
  });

  function loadTweets() {
    $.ajax({
      method: 'get',
      url: '/tweets',
      dataType: 'json',
      success: function(data) {
        console.log(data);
        renderTweets(data); //here is where I pass in the array of objects - from the server in the database
      }
    });
  }

  $('.tweet').hide();
  loadTweets();
})



/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// function createElementTwo(tweet) {
//   let $tweetDiv = $('<div>').addClass('tweet')
//   let $header = $('<header>')
//   $('<img>')
//     .attr('src', tweet.user.avatars.small)
//     .appendTo($header)

//   $('<h1>')
//     .addClass('tweeter-name')
//     .text(tweet.user.name)
//     .appendTo($header)  

//     $('<h2>')
//     .addClass('tweeter-handle')
//     .text(tweet.user.handle)
//     .appendTo($header)

//     $tweetDiv.append($header) //can't use appendTo on a parent - only used on the child

//   let $tweetBodyDiv = $('<div>').addClass('tweet-body')
//   $('<p>')
//     .addClass('tweet-content')
//     .appendTo($tweetBodyDiv)

//     $tweetBodyDiv.appendTo($tweetDiv)

//   let $footer = $('<footer>')  
//   $('<div>')
//     .text('10 days ago') //because it's a child it doesn't need to be declared with a variable
//     .addClass('tweet-time')
//     .appendTo($footer) 

//   let $footerIcons = $('<div>').addClass('icons')
//   $('<i>')
//     .addClass('fa')
//     .addClass('fa-flag')
//     .attr('aria-hidden', 'true')
//     .appendTo($footerIcons)

//   $('<i>')
//     .addClass('fa')
//     .addClass('fa-retweet')
//     .attr('aria-hidden', 'true')
//     .appendTo($footerIcons)

//   $('<i>')
//     .addClass('fa')
//     .addClass('fa-heart')
//     .attr('aria-hidden', 'true')
//     .appendTo($footerIcons) 

//     $footerIcons.appendTo($footer)
//     $footer.appendTo($tweetDiv)

// } 