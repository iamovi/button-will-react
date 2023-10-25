const button = document.querySelector('button');
const audio1 = document.getElementById('audio1');

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
  alert('You must click the button!😂');
}

// Add an event listener for the "Enter" key press
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    audio1.currentTime = 0;
    audio1.play();

    // Prevent the default form submission
    event.preventDefault();

    // Show the alert
    showAlert();
  }
});
