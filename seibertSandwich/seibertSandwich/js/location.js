(function () {
    "use strict";

    var locate = null;
    var prox = "ProxyService.ashx?type=POST&url="
    var mapURL = "http://www.mapquestapi.com/directions/v2/route?key=";
    var mapKey = "sTiCX9zuljIW05xi3FyN0qOxFwAoqPU6";
    var completeURL = mapURL + mapKey;

    var page = WinJS.UI.Pages.define("/html/location.html", {
        ready: function (element, options) {

            placeOrder.addEventListener("click", placingOrder, false);
            home.addEventListener("click", customerRtn, false);
        },

        unload: function () {
            placeOrder.removeEventListener("click", placingOrder);
            home.removeEventListener("click", customerRtn);
        }
    });

    function getLocation() {
        if (locate == null) {
            locate = new Windows.Devices.Geolocation.Geolocator();
        }
        if (locate != null) {
            locate.getGeopositionAsync().then(getCustomerLocation, errorHandler)
        }
    }

    function errorHandler(e) {
        var status = locate.locationStatus;
        switch (status) {
            case Windows.Devices.Geolocation.PositionStatus.ready:
                console.log("Status: ready");
                break;

            case Windows.Devices.Geolocation.PositionStatus.notInitialized:
                console.log("Status: Not initialized, have not requested location data");
                break;


        }

    }

    function customerRtn(eventObject) {
        WinJS.Navigation.navigate("/html/home.html", "location");
    }

    function placingOrder(eventObject) {
        

        getLocation();

        function getLocation() {
            if (locate == null) {
                locate = new Windows.Devices.Geolocation.Geolocator();
            }
            if (locate != null) {
                locate.getGeopositionAsync().then(getCustomerLocation, errorHandler)
            }
        }

        function getCustomerLocation(pos) {
            document.getElementById("directions").innerHTML = "";
            if (document.getElementById("shopLoc").value != "") {
                var point = pos.coordinate.point.position;
                var lat = point.latitude;
                var long = point.longitude;
                var latLong = lat + "," + long;
                var locData = "from=" + lat + "," + long + "&to=" + document.getElementById("shopLoc").value;
                WinJS.xhr({
                    type: 'post',
                    url: 'http://www.mapquestapi.com/directions/v2/route?key=sTiCX9zuljIW05xi3FyN0qOxFwAoqPU6',
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                    data: locData,
                    responseType: 'json'
                }).done(function (result) {
                    var maneuverSize = result.response.route.legs[0].maneuvers;
                    var getDirections = document.getElementById("directions");
                    maneuverSize.forEach(function (direct) {
                        var postDirections = document.createElement("div");
                        postDirections.innerHTML = direct.narrative;
                        getDirections.appendChild(postDirections);
                    });
                })
            }
            else {
                var msg = new Windows.UI.Popups.MessageDialog('Please select a shop location!');
                msg.showAsync();
            }
        }
    }
})();
