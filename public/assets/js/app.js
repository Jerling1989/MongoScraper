// Scrape articles
$("#scrapeArticles").on("click", function(event) {
	window.location = "/scrape";
});

// Click on save article button
$(document).on("click", ".saveArticle", function() {
  // Save the id from the article
  var thisId = $(this).attr("data-id");

// Run a POST to save the article
  $.ajax({
    method: "POST",
    url: "/save",
    data: {
      id:  thisId
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
    });

  });