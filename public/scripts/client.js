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

  $(".tweeting").on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const count =$("#tweet-text").val().trim().length;
    
    if(count > 140){
      return alert("Too many words!")
    } else if (count === 0) {
      return alert("no input!")
    }
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: data
    })
    .then(loadTweets);
    $(".tweeting")[0].reset();
  })
})
