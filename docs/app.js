// Initial array of topics
var topics = ["The Lion King", "Cinderella", "Aladdin", "Beauty and the Beast", "The Little Mermaid", "Finding Nemo", "Toy Story", 
			"Tangled", "Spirited Away", "Monsters Inc", "Big Hero 6", "Inside Out", "Up", "Mulan", "Frozen" ];

// Generic function for displaying topic data 
function renderButtons(){ 

	// Deletes the topics prior to adding new topics (this is necessary otherwise you will have repeat buttons)
	$('#topics-buttons').empty();

	// Loops through the array of topics
	for (var i = 0; i < topics.length; i++){
	    //Dynamically generate buttons for each topic in the array
	    $("#topics-buttons").append("<button class='gifButton' data-button='" + topics[i] +"'>" + topics[i] + "</button>");
	}
}

// This function handles events where one button is clicked
$('#add-topics').on('click', function(){

	// This line of code will grab the input from the textbox
	var newTopic = $('#topics-input').val().trim();

	// The topic from the textbox is then added to our array
	topics.push(newTopic);
	
	// Our array then runs which handles the processing of our topics array
	renderButtons();

	// Clears the topics-input text
	$("#topics-input").val("");

	// We have this line so that users can hit "enter" instead of clicking on the button and it won't move to the next page
	return false;
});

//Event listener for all button elements
$(document).on("click", ".gifButton", function() {
  	// In this case, the "this" keyword refers to the button that was clicked
  	 var buttonClicked = $(this).data("button");

	console.log(buttonClicked);
	
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    buttonClicked + "&api_key=dc6zaTOxFJmzC&limit=10"; //first 10 items
	
	// Creates AJAX call for the specific topic being 
	$.ajax({
		url: queryURL, 
		method: 'GET'}).done(function(response) {

		// Storing an array of results in the results variable
		var results = response.data;

		// Eliminates any images from the previous request
		$("#gifs-appear-here").empty();

		 // Looping over every result item
		for (var i = 0; i < results.length; i++) {

			// Only taking action if the photo has an appropriate rating
			if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
				// Creating a div with the class "item"
				var gifDiv = $("<div class='item'>");

				// Storing the result item's rating
				var rating = results[i].rating;

				// Creating a paragraph tag with the result item's rating
				var p = $("<p>").text("Rating: " + rating);

				// Creating an image tag
				var personImage = $("<img>");

				// Giving the image tag an src attribute of a proprty pulled off the
				// result item
				personImage.attr("src", results[i].images.fixed_height_still.url);
				personImage.attr("data-still", results[i].images.fixed_height_still.url);
				personImage.attr("data-animate", results[i].images.fixed_height.url);
				personImage.attr("data-state", "still");
				personImage.addClass("gif");

				// Appending the paragraph and personImage we created to the "gifDiv" div we created
				gifDiv.append(personImage);
				gifDiv.append(p);
				
				// Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
				$("#gifs-appear-here").prepend(gifDiv);
        	}
    	}
	});
});

$(document).on("click", ".gif", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");
  }
  else {
    // If the clicked image's state is still, update it's src attribute to what it's data-animate value is.
    // Then set the image's data-state to animate
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  }
});

// This calls the renderButtons() function
renderButtons();

//References:
//Were taken mostly from class activites: 
//2-buttontriggered-ajax
//3-dynamic-elements
//4-pausing-gifs

