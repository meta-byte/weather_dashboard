$(document).ready(function () {

    var cityName = ""

    // fetch JSON from API
    function searchCity() {
        cityName = $("#searchText").val().trim()
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=af92d2b885e98b3813daca127757b875"

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            for (i = 0; i < response.list.length; i++) {
                console.log(response.list[i].dt_txt)
            }


        })
    }

    // dynamically update page elements
    function updatepage() {

        console.log(cityName)
        var pastSearches = $("#pastsearches")
        var button = $("<button>")
        button.attr("class", "btn btn-secondary pastSearchButton")
        button.text(cityName)
        pastSearches.append("<br>")
        pastSearches.append(button)
        $("#cityname").text(cityName)

    }

    // search button on click
    $("#searchBtn").click(function () {
        searchCity()
        updatepage()

    })
})