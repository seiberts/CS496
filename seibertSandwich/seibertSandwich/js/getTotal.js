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