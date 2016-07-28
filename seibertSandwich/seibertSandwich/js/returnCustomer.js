
(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/html/returnCustomer.html", {
        ready: function (element, options) {

            enterCustomer.addEventListener("click", submitCustomer, false);
            customer.addEventListener("click", customerRtn, false);
        },

        unload: function () {
            enterCustomer.removeEventListener("click", submitCustomer);
            customer.removeEventListener("click", customerRtn);
        }
    });

    function customerRtn(eventObject) {
        WinJS.Navigation.navigate("/html/home.html", "returnCustomer");
    }

    function submitCustomer(eventObject) {
        if (document.getElementById("userName").value == "")
        {
            var msg = new Windows.UI.Popups.MessageDialog('Please enter a User Name.');
            msg.showAsync();
            return false;
        }
        if (document.getElementById("password").value == "") {
            var msg = new Windows.UI.Popups.MessageDialog('Please enter a password.');
            msg.showAsync();
            return false;
        }
        if (document.getElementById("userName").value == "shawn" && document.getElementById("password").value == "shawn") {
            var msg = new Windows.UI.Popups.MessageDialog('Thank you for logging in!');
            msg.showAsync();
            WinJS.Navigation.navigate("/html/home.html", "returnCustomer");
        }
        else
        {
            var msg = new Windows.UI.Popups.MessageDialog('Incorrect login information!');
            document.getElementById("password").innerHTML = "";
            msg.showAsync();
        }

    }

})();