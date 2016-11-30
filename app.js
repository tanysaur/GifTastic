// Instructions

// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.

// We chose animals for our theme, but you can make a list to your own liking.
// Your app should take the topics in this array and create buttons in your HTML.

// Try using a loop that appends a button for each string in the array.
// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// Under every gif, display its rating (PG, G, so on).

// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.
// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.

// Rejoice! You just made something really cool.

	// Initial array of movies
	var topics = ["music", "Pentatonix", "drums", "guitars", "photography", "iot", "cats", "comedy", "family", "science", "technology", "Doctor Who", "sci-fi"];

	// ========================================================
	// Generic function for displaying movie data 
	function renderButtons(){ 

		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
		$('#topics-buttons').empty();

		// Loops through the array of movies
		for (var i = 0; i < topics.length; i++){
		    //Dynamically generate buttons for each topic in the array
		    $("#topics-buttons").append("<button class='gifButton' data-button='" + topics[i] +"'>" + topics[i] + "</button>");
		}
	}

	// This function handles events where one button is clicked
	$('#add-topics').on('click', function(){

		// This line of code will grab the input from the textbox
		var newTopic = $('#topics-input').val().trim();

		// The movie from the textbox is then added to our array
		topics.push(newTopic);
		
		// Our array then runs which handles the processing of our movie array
		renderButtons();

		//clear the topics-input text
		$("#topics-input").val("");

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	});

	//Event listener for all button elements
    $(document).on("click", ".gifButton", function() {
      	// In this case, the "this" keyword refers to the button that was clicked
      	//var person = $(this).data("person");
      	 var buttonClicked = $(this).data("button");

		//var topicButton = $(this).attr('data-button');

		console.log(buttonClicked);
		
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        buttonClicked + "&api_key=dc6zaTOxFJmzC&limit=10";
		
		// Creates AJAX call for the specific movie being 
		$.ajax({
			url: queryURL, 
			method: 'GET'}).done(function(response) {

			// Storing an array of results in the results variable
			var results = response.data;

		
			//console.log(results.source);
			console.log(results);

			$("#gifs-appear-here").empty();
			 // Looping over every result item
			for (var i = 0; i < results.length; i++) {
				console.log(results[i].rating);

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
					personImage.attr("src", results[i].images.fixed_height.url);

					// Appending the paragraph and personImage we created to the "gifDiv" div we created
					gifDiv.append(p);
					gifDiv.append(personImage);

					// Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
					$("#gifs-appear-here").prepend(gifDiv);
            }
        }

		});

	});

	// This calls the renderButtons() function
	renderButtons();

//References:
//Class activites: 
//2-buttontriggered-ajax
//3-dynamic-elements
//4-pausing-gifs
	
