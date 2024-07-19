$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on("input", function() {
    const charCount = $(this).val().length;
    const value = $("output.counter");
    value.text(140 - charCount);
    let overValue = 140 - charCount;
    if (overValue < 0) {
      value.css('color', 'red');
    } else {
      value.css('color', "");
    }
  });
});