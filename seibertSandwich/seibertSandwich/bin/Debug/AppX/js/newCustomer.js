
(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/html/newCustomer.html", {
        ready: function (element, options) {
           
            saveCustomer.addEventListener("click", transitionBetweenPages, false);
            customer.addEventListener("click", customerRtn, false);
        },

        unload: function () {
            saveCustomer.removeEventListener("click", transitionBetweenPages);
            customer.removeEventListener("click", transitionBetweenPages);
        }
    });

    function customerRtn(eventObject) {
        WinJS.Navigation.navigate("/html/home.html", "newCustomer");
    }

    function transitionBetweenPages(eventObject) {
        WinJS.Navigation.navigate("/html/home.html", "newCustomer");
    }

})();