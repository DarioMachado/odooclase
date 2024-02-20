// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Create a text node with the text you want to append
    var newText = document.createTextNode("Y entonces jesucristo dijo, me cago en tu puta madre" );

    // Get a reference to the body element
    var body = document.body;

    // Insert the new text node as the first child of the body element
    body.insertBefore(newText, body.firstChild);
});
