
(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/html/newCustomer.html", {
        ready: function (element, options) {
           
            saveCustomer.addEventListener("click", submitCustomer, false);
            customer.addEventListener("click", customerRtn, false);
        },

        unload: function () {
            saveCustomer.removeEventListener("click", submitCustomer);
            customer.removeEventListener("click", customerRtn);
        }
    });

    function submitCustomer(eventObject) {
        if (document.getElementById("userName").value == "" || document.getElementById("onePass").value == "" ||
            document.getElementById("twoPass").value == "")
        {
            var msg = new Windows.UI.Popups.MessageDialog('Please fill in all information boxes.');
            msg.showAsync();
            return false;
        }
        if (document.getElementById("onePass").value != document.getElementById("twoPass").value) {
            var msg = new Windows.UI.Popups.MessageDialog('Passwords do not match.');
            msg.showAsync();
            document.getElementById("onePass").innerHTML == "";
            document.getElementById("onePass").innerHTML == "";
            return false;
        }
        WinJS.Navigation.navigate("/html/home.html", "newCustomer");
    }

    function customerRtn(eventObject) {
        WinJS.Navigation.navigate("/html/home.html", "newCustomer");
    }

})();