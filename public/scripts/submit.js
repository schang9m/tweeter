$(document).ready(function() {
  $(".tweeting").on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    console.log(data)
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: data
    });
  })
});