const button = document.querySelector('button');

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
    alert('Hey you, No cheating!');
  }
  