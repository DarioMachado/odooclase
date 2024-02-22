
//Esto está obviamente mal, luego me encargaré de arreglarlo
function endGame() {
    var playerName = document.getElementById('playerNameInput').value;
    var playerScore = calculateScore(); // Assuming you have a function to calculate the score
    fetch('/exorcismo/insertar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: playerName,
            score: playerScore
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Score successfully recorded!');
        } else {
            alert('Failed to record score.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while recording the score.');
    });
}
