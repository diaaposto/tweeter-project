
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

function describeTime(t) {
  const now = new Date();
  const timeDiff = now - t;
  if (timeDiff <= 1000) {
    return "less than 1 second ago";
  } else if (timeDiff <= 1000 * 60) {
    return "less than 1 min ago";
  } else if (1000 * 60 * 60) {
    return "less than 1 hour ago";
  }   
}

function createTweetElement(tweet) {
  // console.log(tweet.user.avatars.small);
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  let tweetElement = `
        <div class="tweet">
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
              </div>
          </footer>
        </div>`;

  return $(tweetElement);
}


function renderTweets(data) {
  for (const tweet of data) {
    const tweetElement = createTweetElement(tweet);
    $('#tweet-container').prepend(tweetElement);
  }
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

      //slideup after timeout and then hide it again //fade in fade out
      // $('.error-message').slideUp();
    } else {
      // console.log("Success");
      // console.log(dataString);
      $.ajax({
        method: "POST",
        url: url,
        data: dataString,
        success: (data) => {
          $(this)[0].reset(); 
          $(this).find('.counter').text(140); 
          // console.log($(this));//when you have a parent you use find 
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
        // console.log(data);
        renderTweets(data); //here is where I pass in the array of obbjects - from the server in the database
      }
    });
  }

  $('.tweet').hide();
  loadTweets();
})


//"[{"user":{"name":"Johann von Goethe","avatars":{"small":"https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png","
// regular":"https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png","large":"https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"},
// "handle":"@johann49"},"content":{"text":"Es ist nichts schrecklicher als eine tätige Unwissenheit."},"created_at":1461113796368},{"user":{"name":"Descartes","avatars":{"small":"https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png","regular":"https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png","large":"https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"},"handle":"@rd"},"content":{"text":"Je pense , donc je suis"},"created_at":1461113959088},{"user":{"name":"Newton","avatars":{"small":"https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png","regular":"https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png","large":"https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"},"handle":"@SirIsaac"},"content":
// {"text":"If I have seen further it is by standing on the shoulders of giants"},"created_at":1461116232227}]"