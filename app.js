$(document).ready(function () {
    console.log("ready!");

    $('#pageSizeSelect').formSelect();

    const initialTags = ['festival art', 'burning man', 'desert', 'black rock city',
        'playa', 'moop map', 'pyramid lake', 'dust', 'dust storm', 'burning man embrace',
        'burning man mad max', 'wigglegram'
    ];

    const initialTagsObjects = initialTags.map((item, index) => {
        return {
            'tag': item
        }
    });

    
    $('.chips-tags').chips({
        data: initialTagsObjects,
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Tag',
        onChipSelect: (sender, chip) => {

            $("#giphy-images").empty();
            let chipText = $(chip).text();
            let selectedTag = chipText.substring(0, chipText.length - 5);

            let queryURL = "https://api.giphy.com/v1/gifs/search?q='" + selectedTag + "'&api_key=dc6zaTOxFJmzC&limit=" + $('#pageSizeSelect').val();

            $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                .then(function (response) {
                    var results = response.data;

                    $.each(results, function (index, item) {
                        var animalDiv = $("<div class=\"animal-item\">");

                        var rating = item.rating;

                        var metaData = $("<p>").text("Rating: " + rating);

                        var animated = item.images.fixed_height.url;
                        var still = item.images.fixed_height_still.url;

                        var giphyImage = $("<img class='giphy-image materialboxed responsive-img z-depth-1 giphy-image'>");
                        giphyImage.attr("src", still);
                        giphyImage.attr("data-still", still);
                        giphyImage.attr("data-animate", animated);
                        giphyImage.attr("data-state", "still");

                        var imageDiv = $('<div class="col s6 m6 l2">');
                        imageDiv.append(giphyImage);
                        imageDiv.append(metaData);

                        $("#giphy-images").append(imageDiv);
                    });
                    applyStateClickEvents();
                    $('.materialboxed').materialbox();
                });

  

        }
    });

    var applyStateClickEvents = () => {
        $('.giphy-image').off('click');
        $('.giphy-image').on("click", function () {

            var currentState = $(this).attr("data-state");

            if (currentState === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    }

});