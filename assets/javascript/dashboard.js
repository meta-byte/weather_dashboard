$(document).ready(function () {

    var weatherSearches = []

    // fetch JSON from forecast API and Current Weather API
    function searchCity(loadhistory) {

        var cityName = loadhistory[0].city
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

        })

        $.ajax({
            url: weatherURL,
            method: "GET",
        }).then(function (response) {

            updateJumbo(response)

        })
    }

    // create past search buttons update jumbotron title
    function updatePage(loadhistory) {

        loadhistory = JSON.parse(localStorage.getItem('history'))
        console.log(loadhistory[0].city)

        var date = new Date();
        isoDate = moment(date).format();
        console.log(date)

        var pastSearches = $("#pastsearches")

        pastSearches.empty()

        for (index = 0; index < loadhistory.length; index++) {
            var button = $("<button>")
            button.attr("class", "btn btn-light pastSearchButton")
            button.text(loadhistory[index].city)
            pastSearches.append("<br>")
            pastSearches.append(button)

        }

        $("#cityname").text(loadhistory[0].city)
        $("#currentdate").text(isoDate.substring(6, 10))




    }

    function loadSearch() {
        loadhistory = JSON.parse(localStorage.getItem('history'))

        updatePage(loadhistory)
        searchCity(loadhistory)

    }

    function saveSearch(city) {
        weatherSearches.unshift({
            city: city,
        })

        var sethistory = localStorage.setItem('history', JSON.stringify(weatherSearches))
        loadSearch()
    }

    //function to update current weather jumbotron
    function updateJumbo(response) {
        var currentIcon = response.weather[0].icon
        var longitude = response.coord.lon
        var latitude = response.coord.lat
        var indexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=af92d2b885e98b3813daca127757b875&lat=" + latitude + "&lon=" + longitude
        console.log(response.weather.description)
        console.log(response.main.temp)
        console.log(response.main.humidity)
        console.log(response.wind.speed)

        $("#currentdescription").text(response.weather[0].description)
        $("#currentTemp").text(parseInt(response.main.temp))
        $("#currentHumidity").text(response.main.humidity)
        $("#currentWind").text(parseInt(response.wind.speed))
        $("#currentUV").text()
        $("#jumboimg").attr("src", "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png")

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
        var description = $("<p>")
        var forecastIcon = $('<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png" class="card-img-top" alt="">')
        var cardbody = $("<div>")
        var cardtitle = $("<h4>")
        var date = forecast.dt_txt.substring(6, 11)
        var forecastTemp = $("<p>")
        var forecastHumid = $("<p>")


        newColumn.attr("class", "col-md-2 justify-content-center text-center forecast")
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
        cardbody.append("<hr>")
        cardbody.append(description)
        cardbody.append(forecastTemp)
        cardbody.append(forecastHumid)

    }


    // search button on click
    $("#searchBtn").click(function () {
        var city = $("#searchText").val().trim()

        $(".fivedayforecast").empty()
        saveSearch(city)

        $("#searchText").val("")

    })

    $(document).on("click", ".pastSearchButton", function () {
        console.log("click")
        var buttontext = $(this).text()
        $(".fivedayforecast").empty()
        saveSearch(buttontext)

    })

    loadSearch()

})

// save past search data in local storage
// clicking a past search button should not add a new button
