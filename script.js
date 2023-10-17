const button = document.querySelector('button');
const audio1 = document.getElementById('audio1');
const audio2 = document.getElementById('audio2');

button.addEventListener('mouseenter', function() {
  // Generate a random position within the screen bounds
  const maxX = window.innerWidth - button.offsetWidth;
  const maxY = window.innerHeight - button.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  // Set the button's new position
  button.style.left = randomX + 'px';
  button.style.top = randomY + 'px';
});

function showAlert() {
  alert('Hey you, No cheating!😂');
}

// Add an event listener for the "Enter" key press
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    // Generate a random number (0 or 1) to choose which audio to play
    const randomAudioIndex = Math.floor(Math.random() * 2);

    if (randomAudioIndex === 0) {
      audio1.currentTime = 0;
      audio1.play();
    } else {
      audio2.currentTime = 0;
      audio2.play();
    }
    
    // Prevent the default form submission
    event.preventDefault();
    
    // Show the alert
    showAlert();
  }
});
