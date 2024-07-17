$(document).ready(function() {
  $(".tweeting").on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const count =$("#tweet-text").val().length;
    console.log(count)
    if(count > 140){
      return alert("Too many words!")
    } else if (count === 0) {
      return alert("no input!")
    }
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: data
    });
  })
});