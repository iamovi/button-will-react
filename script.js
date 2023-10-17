const button = document.querySelector('button');
const audio = document.getElementById('audio');

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
    // Reset audio playback to the beginning and play it
    audio.currentTime = 0;
    audio.play();
    
    // Prevent the default form submission
    event.preventDefault();
    
    // Show the alert
    showAlert();
  }
});