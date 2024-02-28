var companies = ['ACCIONA', 'ACCIONA ENER', 'ACERINOX', 'ACS', 'AENA', 'AMADEUS IT GROUP', 'ARCELORMITTAL', 'BANCO SABADELL', 'BANKINTER', 'BBVA', 'CAIXABANK', 'CELLNEX TELECOM', 'COLONIAL', 'ENAGAS', 'ENDESA', 'FERROVIAL', 'FLUIDRA', 'GRIFOLS', 'IAG', 'IBERDROLA', 'INDITEX', 'INDRA', 'LOGISTA', 'MAPFRE', 'MELIÁ HOTELS', 'MERLIN PROP.', 'NATURGY', 'REDEIA', 'REPSOL', 'ROVI', 'SACYR', 'SANTANDER', 'SOLARIA', 'TELEFÓNICA', 'UNICAJA BANCO'];
var prices = ['100,450', '19,440', '10,225', '37,650', '176,100', '58,960', '24,110', '1,231', '5,950', '9,344', '4,196', '33,120', '5,035', '13,210', '16,160', '34,550', '19,730', '11,695', '1,788', '10,465', '41,030', '17,220', '25,200', '1,972', '6,705', '8,790', '22,060', '14,565', '14,715', '70,850', '3,020', '3,869', '11,080', '3,827', '0,972'];
var variacion = ['-3.65', '-2.65', '-1.68', '0.32', '1.32', '-1.04', '-1.07', '0.49', '1.05', '-0.28', '0.65', '-3.66', '-2.99', '-1.12', '-2.44', '-0.58', '0.05', '-0.81', '-2.03', '-0.66', '-0.02', '7.42', '-0.71', '0.36', '-1.69', '-3.72', '-1.16', '-1.69', '-0.27', '4.96', '-2.08', '1.26', '-3.69', '0.45', '-0.31'];


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
            arrow = '&uarr;';
            color = 'green';
        } else if (variation <= 0) {
            arrow = '&darr;';
            color = 'red';
        }
        var variationText = ' <span style="color:' + color + '">' + arrow + " "+ Math.abs(variation) + '%</span>';


        divElement.innerHTML = companyName + ': ' + price + ' (' + variationText + ')';
    }

    cambiarFrase();

    setInterval(cambiarFrase, 5000);
});
