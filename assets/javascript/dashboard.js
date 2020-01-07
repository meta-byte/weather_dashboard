$(document).ready(function () {

    // fetch JSON from forecast API and Current Weather API
    function searchCity(cityName) {
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&&APPID=af92d2b885e98b3813daca127757b875"
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&&APPID=af92d2b885e98b3813daca127757b875"

        $.ajax({
            url: forecastURL,
            method: "GET",
        }).then(function (response) {
            for (i = 0; i < response.list.length; i += 1) {
                if (response.list[i].dt_txt.substring(11, 20) === "12:00:00") {
                    console.log(response.list[i].dt_txt.substring(0, 11))
                    console.log(response.list[i].main)

                    updateForecast(response.list[i])

                }

            }

            // updateForecast(response)

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

    // create ancd update 5 day forecast cards
    function updateForecast(forecast) {

        var fiveDayForecast = $(".fivedayforecast")
        var newColumn = $("<div>")
        var card = $("<div>")
        var icon = forecast.weather[0].icon
        var description = $("<h6>")
        var forecastIcon = $('<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png" class="card-img-top" alt="">')
        var cardbody = $("<div>")
        var cardtitle = $("<h6>")
        var date = forecast.dt_txt.substring(0, 11)
        var forecastTemp = $("<p>")
        var forecastHumid = $("<p>")



        newColumn.attr("class", "col-2 justify-content-center text-center forecast")
        card.attr("class", "card")
        cardbody.attr("class", "card-body")
        cardtitle.attr("class", "card-title")
        forecastTemp.text(parseInt(forecast.main.temp) + "°F")
        forecastHumid.text(parseInt(forecast.main.temp) + "% Humidity")


        cardtitle.text(date)
        description.text(forecast.weather[0].description)

        fiveDayForecast.append(newColumn)
        newColumn.append(card)
        card.append(forecastIcon)
        card.append(cardbody)
        cardbody.append(cardtitle)
        cardbody.append(description)
        cardbody.append(forecastTemp)
        cardbody.append(forecastHumid)


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

// update cards with forecast JSON data
// add icons to cards and jumbotron
// save past search data in local storage
// clicking a past search button should not add a new button
// navbar with light and dark mode (save preferences)
// refactor code where possible
// Update CSS 