
(function () {
    "use strict";


  
    var locate = null;
    var prox = "ProxyService.ashx?type=POST&url="
    var mapURL = "http://www.mapquestapi.com/directions/v2/route?key=";
    var mapKey = "sTiCX9zuljIW05xi3FyN0qOxFwAoqPU6";
    var completeURL = mapURL + mapKey;

    var page = WinJS.UI.Pages.define("/html/order.html", {
        ready: function (element, options) {

            placeOrder.addEventListener("click", placingOrder, false);
            home.addEventListener("click", customerRtn, false);
        },

        unload: function () {
            placeOrder.removeEventListener("click", placingOrder);
            home.removeEventListener("click", customerRtn);
        }
    });


    function addSandwich(e) {
        if (e == "addHam") {
            var hm = parseInt(document.getElementById("hamQuant").innerHTML) + 1;
            document.getElementById("hamQuant").innerHTML = hm;
        }
        if (e == "addTurkey") {
            var hm = parseInt(document.getElementById("turkeyQuant").innerHTML) + 1;
            document.getElementById("turkeyQuant").innerHTML = hm;
        }
        if (e == "addRB") {
            var hm = parseInt(document.getElementById("rbQuant").innerHTML) + 1;
            document.getElementById("rbQuant").innerHTML = hm;
        }
        if (e == "addMB") {
            var hm = parseInt(document.getElementById("mbQuant").innerHTML) + 1;
            document.getElementById("mbQuant").innerHTML = hm;
        }
        var a = parseInt(document.getElementById("total").innerHTML) + 1;
        var b = parseFloat(document.getElementById("saleTotal").innerHTML) + 7.95;


        document.getElementById("total").innerHTML = a;
        document.getElementById("saleTotal").innerHTML = b.toPrecision(4);
    }

    function subSandwich(e) {
        if (parseInt(document.getElementById("total").innerHTML) === 0) {
            return false;
        }

        if (e == "subHam" && parseInt(document.getElementById("hamQuant").innerHTML) != 0) {
            var hm = parseInt(document.getElementById("hamQuant").innerHTML);
            hm = checkFalse(hm);
            document.getElementById("hamQuant").innerHTML = hm;
            subTotal();
        }
        if (e == "subTurkey" && parseInt(document.getElementById("turkeyQuant").innerHTML) != 0) {
            var hm = parseInt(document.getElementById("turkeyQuant").innerHTML);
            hm = checkFalse(hm);
            document.getElementById("turkeyQuant").innerHTML = hm;
            subTotal();
        }
        if (e == "subRB" && parseInt(document.getElementById("rbQuant").innerHTML) != 0) {
            var hm = parseInt(document.getElementById("rbQuant").innerHTML);
            hm = checkFalse(hm);
            document.getElementById("rbQuant").innerHTML = hm;
            subTotal();
        }
        if (e == "subMB" && parseInt(document.getElementById("mbQuant").innerHTML) != 0) {
            var hm = parseInt(document.getElementById("mbQuant").innerHTML);
            hm = checkFalse(hm);
            document.getElementById("mbQuant").innerHTML = hm;
            subTotal();
        }

    }

    function subTotal() {
        var a = parseInt(document.getElementById("total").innerHTML) - 1;
        var b = parseFloat(document.getElementById("saleTotal").innerHTML) - 7.95;
        document.getElementById("total").innerHTML = a;
        document.getElementById("saleTotal").innerHTML = b.toPrecision(4);
    }

    function checkFalse(sandwichQuantity) {
        if (sandwichQuantity != 0) {
            return sandwichQuantity - 1;

        }

    }




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
        WinJS.Navigation.navigate("/html/home.html", "order");
    }

    function placingOrder(eventObject) {
        var cc = parseInt(document.getElementById("credit").value, 10);
        var sc = parseInt(document.getElementById("secCode").value, 10);
        if (document.getElementById("orderName").value == "")
        {
            Windows.UI.Popups.MessageDialog("Content", "Title").showAsync();
            
            return false;
        }
        if (document.getElementById("credit").value == "" || cc < 1000000000000000 || cc > 9999999999999999 || isNaN(cc))
        {
            var msg = new Windows.UI.Popups.MessageDialog('Please enter a valid credit card number.');
            msg.showAsync();
            return false;
        }
        if (document.getElementById("secCode").value == "" || sc < 100 || sc > 999 || isNaN(sc)) {
            var msg = new Windows.UI.Popups.MessageDialog('Please enter a valid security code.');
            msg.showAsync();
            return false;
        }


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
                        postDirections.innerHTML = "\n" + direct.narrative + "\n";
                        getDirections.appendChild(postDirections);
                    });
                })
            }
            else
            {
                var msg = new Windows.UI.Popups.MessageDialog('Please select a shop location!');
                msg.showAsync();
            }
        }
    }
})();
