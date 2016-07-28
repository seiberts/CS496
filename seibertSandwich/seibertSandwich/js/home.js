(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/html/home.html", {
        ready: function (element, options) {
            addCustomer.addEventListener("click", addCust, false);
            customer.addEventListener("click", enterCustomer, false);
            placeOrder.addEventListener("click", placedOrder, false);
            findLoc.addEventListener("click", getLoc, false);
            menu.addEventListener("click", getMenu, false);
        },

        unload: function () {
            addCustomer.removeEventListener("click", addCust, false);
            customer.removeEventListener("click", enterCustomer, false);
            placeOrder.removeEventListener("click", placedOrder, false);
            findLoc.removeEventListener("click", getLoc, false);
            menu.removeEventListener("click", getMenu, false);
           
        }
    });

    function addCust(eventObject) {
        var id = eventObject.currentTarget.id;
        WinJS.UI.Animation.exitPage(home, null).done(function ()
        {
            WinJS.Navigation.navigate("/html/newCustomer.html", "home");
        })
       
    }

    function enterCustomer(eventObject) {
        var id = eventObject.currentTarget.id;
        WinJS.Navigation.navigate("/html/returnCustomer.html", "home");
    }

    function placedOrder(eventObject) {
        var id = eventObject.currentTarget.id;
        WinJS.Navigation.navigate("/html/order.html", "home");
    }

    function getMenu(eventObject) {
        var id = eventObject.currentTarget.id;
        WinJS.Navigation.navigate("/html/menu.html", "home");
    }

    function getLoc(eventObject) {
        var id = eventObject.currentTarget.id;
        WinJS.Navigation.navigate("/html/location.html", "home");
    }

})();