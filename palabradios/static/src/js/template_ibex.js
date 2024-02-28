

var pointer = -1;
document.addEventListener("DOMContentLoaded", function() {
    var divElement = document.createElement("div");
    var body = document.body;
    body.insertBefore(divElement, body.firstChild);

    divElement.style.backgroundColor = "black";
    divElement.style.color = "white";
    divElement.style.fontSize = "14px";
    divElement.style.paddingLeft = "50px";


    function cambiarFrase() {
        pointer = (pointer + 1) % companies.length;
		
		var companyName = companies[pointer];
        var price = prices[pointer];
        var variation = variacion[pointer];
        
        var arrow = '';
        var color = '';
        if (variation > 0) {
            arrow = '?';
            color = 'green';
        } else if (variation <= 0) {
            arrow = '?';
            color = 'red';
        }
        var variationText = arrow + ' <span style="color:' + color + '">' + Math.abs(variation) + '%</span>';


        divElement.textContent = companyName + ': ' + price + ' (' + variationText + ')';
    }

    cambiarFrase();

    setInterval(cambiarFrase, 5000);
});
