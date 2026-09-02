document.getElementById("getLocation").onclick = function() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            function(position) {

                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;

                document.getElementById("location").innerHTML =
                    "Latitude: " + latitude + "<br>" +
                    "Longitude: " + longitude;
            },

            function(error) {
                document.getElementById("location").innerHTML =
                    "Unable to get your location.";
            }
        );

    } else {
        document.getElementById("location").innerHTML =
            "Geolocation is not supported by your browser.";
    }
};