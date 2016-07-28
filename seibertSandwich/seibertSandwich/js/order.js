
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
            var msg = new Windows.UI.Popups.MessageDialog('Please enter an order name.');
            msg.showAsync();
            return false;
        }

        if (parseInt(document.getElementById("turkeyQuant").innerHTML) == 0 && parseInt(document.getElementById("hamQuant").innerHTML) == 0 &&
         parseInt(document.getElementById("rbQuant").innerHTML) == 0 && parseInt(document.getElementById("mbQuant").innerHTML) == 0) {
            var msg = new Windows.UI.Popups.MessageDialog('Please select at least one sandwich!');
            msg.showAsync();
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

 

        
            if (document.getElementById("shopLoc").value == "") {
                var msg = new Windows.UI.Popups.MessageDialog('Please select a shop location!');
                msg.showAsync();
                return false;
            }

            var msg = new Windows.UI.Popups.MessageDialog('Thank you for your order!');
            msg.showAsync();
            WinJS.Navigation.navigate("/html/home.html", "order");
    }
})();
