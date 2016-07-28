(function () {
    "use strict";
    
    var locate = null;
    var startURL = '"http://dev.virtualearth.net/rest/v1/locations/"';
    var proxyService = "ProxyService.ashx?type=POST&url=";
    var bingMapKey = '5VeWWMDs8UktzhbWADXp~8qApzxSkU0_pL2f2_69uUg~AjHdcDXZuyH8QJWLnb4zTDFSNFcwEltDG2_wq3R3Qrf_HAKRrdnTarGBZvtc0Lk6';
   // var request = startURL + bingKey;

    var page = WinJS.UI.Pages.define("/html/order.html", {
        ready: function (element, options) {

            placeOrder.addEventListener("click", placingOrder, false);
            home.addEventListener("click", customerRtn, false);
            getLocation();
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
            locate.getGeopositionAsync().then(GetElevationData, errorHandler)
        }
    }

        function GetElevationData() {
            var request = 'http://dev.virtualearth.net/REST/v1/Elevation/List?&key=' + bingMapKey;

            //Generate mock data
            var coords = [];

            for (var i = 0; i < 100; i++) {
                coords.push(GetRandomCoordinate());
            }

            var postData = 'points=' + coords.join(',');

            //Call service
            CallPostService(request, postData, null, function (r) {
                document.getElementById('outputDiv').innerHTML = r;
            });
        }

         function CallPostService(requestUrl, postData, responseType, callback) {
            responseType = (responseType) ? responseType : '';

            WinJS.xhr({
                type: 'POST',
                url: proxyService + encodeURIComponent(requestUrl) + '&responseType=' + responseType,
                dataType: "text",
                contentType: 'text/plain;charset=utf-8',
                data: postData
                }).then(function (result) {
                var name = JSON.parse(result.responseText)
                console.log("Name: " + name);
            });
        }

        function GetRandomCoordinate() {
            //Limit coordinates to a small region in the US.
            var lat = Math.random() * 10 + 30; //Latitude range 30 - 40 degrees
            var lon = Math.random() * 10 - 100; //Longitude range -90 - -100 degrees
            return lat + ',' + lon;
        }

/*

    function getPositionHandler(pos) {
        var point = pos.coordinate.point.position;
        var lat = point.latitude;
        var long = point.longitude;
        var postData = 'points=' + lat + ',' + long;
        WinJS.xhr({
            type: 'POST',
            url: proxyService + encodeURIComponent(request) + '&responseType=null',
            dataType: "json",
            headers: { "Content-type": "application/json" },
            data: postData,
        }).done(function (result) {
            var name = JSON.parse(result.responseText)
            console.log("Name: " + name);

        });
    }
*/
    function errorHandler(e) {
        var status = locate.locationStatus;
        switch (status)
        {
            case Windows.Devices.Geolocation.PositionStatus.ready:
                console.log("Status: ready");
                break;

            case Windows.Devices.Geolocation.PositionStatus.notInitialized:
                console.log("Status: Not initialized, have not requested location data");
                break;


}

    }

    function customerRtn(eventObject) {
        WinJS.Navigation.navigate("/html/home.html", "order");
    }

    function placingOrder(eventObject) {

        // WinJS.Navigation.navigate("/html/home.html", "order");
    }

})();