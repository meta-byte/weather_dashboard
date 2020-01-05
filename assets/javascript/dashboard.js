$(document).ready(function () {

    // var cityName = ""

    // fetch JSON from forecast API and Current Weather API
    function searchCity(cityName) {
        // cityName = $("#searchText").val().trim()
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&&APPID=af92d2b885e98b3813daca127757b875"
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&&APPID=af92d2b885e98b3813daca127757b875"

        $.ajax({
            url: forecastURL,
            method: "GET",
        }).then(function (response) {
            // for (i = 0; i < response.list.length; i++) {
            //     console.log(response.list[i].dt_txt)
            // }

            updateForecast(response)

        })

        $.ajax({
            url: weatherURL,
            method: "GET",
        }).then(function (response) {

            updateJumbo(response)

        })
    }

    // create past search buttons update jumbotron title
    function updatePage(cityName) {
        var pastSearches = $("#pastsearches")
        var button = $("<button>")

        console.log(cityName)

        button.attr("class", "btn btn-secondary pastSearchButton")
        button.text(cityName)
        pastSearches.append("<br>")
        pastSearches.append(button)

        $("#cityname").text(cityName)


    }

    //function to update current weather jumbotron
    function updateJumbo(response) {
        var longitude = response.coord.lon
        var latitude = response.coord.lat
        var indexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=af92d2b885e98b3813daca127757b875&lat=" + latitude + "&lon=" + longitude

        console.log(response.main.temp)
        console.log(response.main.humidity)
        console.log(response.wind.speed)
        $("#currentTemp").text(parseInt(response.main.temp))
        $("#currentHumidity").text(response.main.humidity)
        $("#currentWind").text(parseInt(response.wind.speed))
        $("#currentUV").text()

        $.ajax({
            url: indexURL,
            method: "GET",
        }).then(function (response) {

            console.log(response.value)
            $("#currentUV").text(response.value)

        })

    }

    // update 5 day forecast cards
    function updateForecast(response) {

    }

    // search button on click
    $("#searchBtn").click(function () {
        var city = $("#searchText").val().trim()

        searchCity(city)
        updatePage(city)
        $("#searchText").val("")

    })

    $(document).on("click", ".pastSearchButton", function () {
        console.log("click")
        var buttontext = $(this).text()
        searchCity(buttontext)
        updatePage(buttontext)

    })
})