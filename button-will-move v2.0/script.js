const button = document.querySelector('#btn');
const yesButton = document.querySelector('#yesBtn'); // Reference the "Yes" button
const margin = 30; // Define the minimum margin

button.addEventListener('mouseenter', function () {
  moveButton(); // Move the button to a random position
  changeBackgroundColor(); // Change the button's background color
});

button.addEventListener('mouseleave', function () {
  changeBackgroundColor(); // Change the button's background color when the cursor leaves
});

yesButton.addEventListener('click', function () {
  showAlertAndRedirect(); // Show the alert and redirect when "Yes" is clicked
  yesButton.disabled = true; // Disable the "Yes" button
});

yesButton.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent "Enter" key from activating the button
  }
});

function moveButton() {
  const buttonRect = button.getBoundingClientRect();
  const buttonWidth = buttonRect.width;
  const buttonHeight = buttonRect.height;

  // Calculate the maximum allowed position
  const maxX = window.innerWidth - buttonWidth;
  const maxY = window.innerHeight - buttonHeight;

  let randomX, randomY;

  do {
    randomX = Math.random() * (maxX - 2 * margin) + margin;
    randomY = Math.random() * (maxY - 2 * margin) + margin;
  } while (isColliding(randomX, randomY, buttonWidth, buttonHeight));

  // Set the button's new position
  button.style.left = randomX + 'px';
  button.style.top = randomY + 'px';
}

function isColliding(x, y, width, height) {
  const elements = document.elementsFromPoint(x + width / 2, y + height / 2);

  for (const element of elements) {
    if (element !== button && !element.contains(button)) {
      return true;
    }
  }

  return false;
}

function changeBackgroundColor() {
  const randomColor = getRandomColor();
  button.style.backgroundColor = randomColor;

  const brightness = getBrightness(randomColor);
  button.style.color = brightness > 128 ? 'black' : 'white';
}

function getBrightness(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  return (r * 299 + g * 587 + b * 114) / 1000;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function showAlertAndRedirect() {
  alert('I LOVE YOU BABE!💖');
  window.location.href = './love-page/love.html'; 
}
