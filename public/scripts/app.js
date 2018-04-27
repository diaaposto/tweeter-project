/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement (tweet) {
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
            <h1 class="tweeter-name">${tweet.user.name}</h1>
            <h2 class="tweeter-handle">${tweet.user.handle}</h2>
          </header>
          <div class="tweet-body">
            <p class="tweet-content">${escape(tweet.content.text)}</p>
          </div>
          <footer>

            <div class="tweet-time">
              10 days ago
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

// }

function renderTweets(data) {
  for (var tweet of data) {

    var tweetElement = createTweetElement(tweet);

    $('#tweet-container').prepend(tweetElement);

  }
  // for (let index = 0; index < data.length; index++) {
  //   let tweet = data[index];
    // $("#tweet-prototype").clone().attr('id', "tweet-" + index).appendTo("#tweet-container");
    // $('#tweet-' + index).find('.tweeter-name').html(data[index].user.name);
    // $('#tweet-' + index).find('.tweeter-handle').html(data[index].user.handle);
    // $('#tweet-' + index).find('.tweet-content').html(data[index].content.text);
    // $('#tweet-' + index).find('img').attr('src', data[index].user.avatars.small);
    // $('#tweet-' + index).show();

// console.log(tweet);


}


$(document).ready(function(){


  $("#compose").submit(function(e) {

    e.preventDefault();
    var dataString = $("#compose").serialize();
    var textContent = $('#text-area').val();

    var url = "/tweets";

    if (textContent === '') {
      alert("Enter your tweet in this area")
      return false;

    } else if (textContent.length > 140) {
      alert("You have surpassed the limit of characters")
      return false;

    } else {
      console.log("Success");
      console.log(dataString);
      $.ajax({
             method: "POST",
             url: url,
             data: dataString,
             success: function(data)
             {
                loadTweets()
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
      renderTweets(data);
    }
  });
}

  $('.tweet').hide()
  loadTweets()
})

//ajax -- callbacks that handle success or failure
//frontend js we do things at different lifecycles of the dom






//"[{"user":{"name":"Johann von Goethe","avatars":{"small":"https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png","regular":"https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png","large":"https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"},"handle":"@johann49"},"content":{"text":"Es ist nichts schrecklicher als eine tätige Unwissenheit."},"created_at":1461113796368},{"user":{"name":"Descartes","avatars":{"small":"https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png","regular":"https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png","large":"https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"},"handle":"@rd"},"content":{"text":"Je pense , donc je suis"},"created_at":1461113959088},{"user":{"name":"Newton","avatars":{"small":"https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png","regular":"https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png","large":"https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"},"handle":"@SirIsaac"},"content":{"text":"If I have seen further it is by standing on the shoulders of giants"},"created_at":1461116232227}]"




