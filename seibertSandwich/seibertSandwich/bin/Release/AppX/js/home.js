(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/html/home.html", {
        ready: function (element, options) {
            addCustomer.addEventListener("click", transitionBetweenPages, false);
            customer.addEventListener("click", enterCustomer, false);
            placeOrder.addEventListener("click", placedOrder, false)
        },

        unload: function () {
            addCustomer.removeEventListener("click", transitionBetweenPages, false);
            customer.removeEventListener("click", enterCustomer, false);
            placeOrder.removeEventListener("click", placedOrder, false)
        }
    });

    function transitionBetweenPages(eventObject) {
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

})();