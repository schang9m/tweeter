/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const createTweetElement = function(tweetData) {
    const {name, avatars, handle} = tweetData.user;
    const body = tweetData.content.text;
    const date = timeago.format(tweetData.created_at);

    const $article = $("<article class='tweet'>");
    const $header = $("<header>");
    const $div = $("<div class='avatar'>");
    const $avatar = $('<img />').attr('src', avatars);
    const $name = $('<p>').text(name);
    $div.append($avatar);
    $div.append($name);
    const $handle = $('<p>').text(handle);
    const $divBody = $('<div><p>').text(body);
    const $footer = $('<footer>');
    const $date = $('<time>').text(`${date}`)
    const $icon = $('<div>')
    $($icon).attr('id', 'interact')
    $icon.append('<i class="fa-solid fa-flag">')
    $icon.append('<i class="fa-solid fa-retweet">')
    $icon.append('<i class="fa-solid fa-heart">')
    $article.append($header);
    $header.append($div);
    $header.append($handle);
    $article.append($divBody);
    $article.append($footer);
    $footer.append($date);
    $footer.append($icon);
    return $article;

    // const $tweet = $(`<article class="tweet">
    //       <header>
    //         <div class="avatar">
    //           <img src="${avatars}">
    //           <h2>${name}</h2>
    //         </div>
    //         <h3>${handle}</h3>
    //       </header>
    //       <div>
    //         <p>${body}</p>
    //       </div>
    //       <footer>
    //         <p>${date} days ago</p>
    //         <div id="interact">
    //           <i class="fa-solid fa-flag"></i>
    //           <i class="fa-solid fa-retweet"></i>
    //           <i class="fa-solid fa-heart"></i>
    //         </div>
    //       </footer>
    //     </article>`);
    // return $tweet;
  }

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweetData of tweets) {
      const $tweet = createTweetElement(tweetData);
      $('#tweets-container').prepend($tweet);
    }
  }
  const loadTweets = function() {
    $.get('http://localhost:8080/tweets')
      .done((data) => {
        renderTweets(data);
      })
      .fail((error) => {
        console.error(error);
      });
  }
  loadTweets();
  const reset = function() {
    $(".tweeting")[0].reset();
    $("output.counter").text(140);
    $("output.counter").css('color', "");
  }
  $(".tweeting").on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const count =$("#tweet-text").val().trim().length;
    
    if (count > 140) {
      $("#error-messages").text("Too Many Words Yo, 140 Limit Pls").slideDown(1400);
      reset();
      return $("#error-messages").slideUp(1500, function() {$(this).empty()}); 
    } else if (count === 0) {
      $("#error-messages").text("You Need To Enter Something?!").slideDown(1400);
      reset(); 
      return $("#error-messages").slideUp(1500, function() {$(this).empty()}); 
    } else {
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: data
      })
      .then(function(){
        $("#tweets-container").empty();
        $(".tweeting")[0].reset();
        loadTweets();
      });
    }
  })
})
