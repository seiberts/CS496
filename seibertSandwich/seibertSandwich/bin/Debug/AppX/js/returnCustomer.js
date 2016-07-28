
(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/html/returnCustomer.html", {
        ready: function (element, options) {

            enterCustomer.addEventListener("click", transitionBetweenPages, false);
            customer.addEventListener("click", customerRtn, false);
        },

        unload: function () {
            enterCustomer.removeEventListener("click", transitionBetweenPages);
            customer.removeEventListener("click", transitionBetweenPages);
        }
    });

    function customerRtn(eventObject) {
        WinJS.Navigation.navigate("/html/home.html", "returnCustomer");
    }

    function transitionBetweenPages(eventObject) {
        WinJS.Navigation.navigate("/html/home.html", "returnCustomer");
    }

})();