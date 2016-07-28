(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/html/menu.html", {
        ready: function (element, options) {
            rtnHome.addEventListener("click", returnHome, false);
        },

        unload: function () {
           rtnHome.removeEventListener("click", returnHome, false);
     }
    });

    function returnHome(eventObject) {
            WinJS.Navigation.navigate("/html/home.html", "menu");
    }

})();