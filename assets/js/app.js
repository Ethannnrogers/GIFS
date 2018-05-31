//make an array of the category

var singers = [
    "Beyonce",
    "Frank Sinatra",
    "Michael Jackson",
    "Adele",
    "Justin Beiber",
    "Taylor Swift",
    "Michael Buble",
    "Brittney Spears",
    "Justin Timberlake",
    "Selena Gomez" 
]
var apiKey = "zAUHoSD9qUo10qPnA3Awe9aAIHZtEJf8";
var buttonHTML = "";
var searchTerm = "";
var buttonLabel= $(".button").val();
var gifs = [];

function generateButtons () {
    for(var i = 0; i < singers.length; i++) {
      buildButton(singers[i]);  
    }
}

function buildButton (singerName) {
    buttonHTML += "<button type='button' class='btn btn-secondary button' data-input='" + singerName + "'>" + singerName + "</button>";
    $("#button-input").html(buttonHTML);

}
generateButtons();


    //Adds a button
    $("#add-button").on("click", function (event) {
        event.preventDefault();
          searchTerm = $("#input").val();
          buildButton(searchTerm);
             
    }); 

    // when you click the button, it shows the gifs for that term
  $(document).on("click", ".button", function () { //event deligation
    $("#gif-input").empty();
    console.log(this);
    dataToSearch = $(this).attr('data-input');
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=QEfEhQBn3OMaYVFOmrXOMn99muKAJqfu&q=" + dataToSearch + "&limit=25&offset=0&rating=G&lang=en";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET'
      }).done(function(response) {
        console.log(response);
        
        console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i]);
            $("#gif-input").append("<img id='gif-img' data-still='" + response.data[i].images.downsized_still.url + "' data-animate='" + response.data[i].images.downsized.url +"' data-state='" + response.data[i].images.downsized_still.url +"' src='" + response.data[i].images.downsized_still.url + "'></img>");
            gifs.push(response.data[i].images.downsized.url);
        }
      });



      //change the state fo the img with a click function

      $('body').on("click", "#gif-img", function () {
          var state = $(this).attr("data-state");
          console.log(state);
          var animate = $(this).attr("data-animate");
          console.log(animate);
          var still = $(this).attr("data-still");
          console.log(still);
          if (state === 'still') {
              $(this).attr('src', animate);
              $(this).attr('data-state', 'animate');
          }
          if (state !== "still") {
              $(this).attr('src', still);
              $(this).attr('data-state', 'still');
          }
      })
      
    

  
    //$("#gif-input").html("<img src='https://media2.giphy.com/media/3og0IR8rZufXOazm0w/giphy.gif'></img")

  })

  


