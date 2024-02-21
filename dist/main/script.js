// script.js

const button = document.querySelector('.button_will_react');
const margin = 30; // Define the minimum margin
const segmentSize = 10; // Define the size of segments for collision checking

button.addEventListener('mouseenter', moveButton);
button.addEventListener('click', moveButton); // Also move on click

function moveButton() {
  const buttonRect = button.getBoundingClientRect();
  const buttonWidth = buttonRect.width;
  const buttonHeight = buttonRect.height;
  const buttonPadding = 10; // Adjust this based on your CSS
  const buttonMargin = 10; // Adjust this based on your CSS

  // Calculate the maximum allowed position for X
  let maxX = window.innerWidth - buttonWidth - buttonRect.left - buttonPadding - buttonMargin;
  maxX = Math.max(maxX, 0); // Ensure maxX is non-negative

  // Adjust this calculation for the leftmost position
  let leftmostX = buttonRect.left + buttonPadding + buttonMargin;
  maxX = Math.min(maxX, leftmostX);

  // Calculate the maximum allowed position for Y
  let maxY = window.innerHeight - buttonHeight - buttonRect.top - buttonPadding - buttonMargin;
  maxY = Math.max(maxY, 0); // Ensure maxY is non-negative

  let randomX, randomY;

  // Fade out animation
  button.style.opacity = 0;

  setTimeout(() => {
    do {
      randomX = Math.random() * maxX + margin;
      randomY = Math.random() * maxY + margin;
    } while (isColliding(randomX, randomY, buttonWidth, buttonHeight, buttonPadding, buttonMargin));

    // Set the button's new position using 'style.transform' to translate
    button.style.transform = `translate(${randomX}px, ${randomY}px)`;
    button.style.opacity = 1; // Fade in animation
  }, 200); // Adjust the duration of the fade-out before repositioning (in milliseconds)
}

function isColliding(x, y, width, height, padding, margin) {
  const numSegmentsX = Math.floor((width + 2 * padding) / segmentSize);
  const numSegmentsY = Math.floor((height + 2 * padding + 2 * margin) / segmentSize);

  for (let i = 0; i <= numSegmentsX; i++) {
    for (let j = 0; j <= numSegmentsY; j++) {
      const offsetX = i * segmentSize;
      const offsetY = j * segmentSize;

      const elements = document.elementsFromPoint(x + offsetX, y + offsetY);

      for (const element of elements) {
        if (element !== button && !element.contains(button)) {
          return true;
        }
      }
    }
  }

  return false;
}
