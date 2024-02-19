const button = document.querySelector('#btn');
const yesButton = document.querySelector('#yesBtn'); // Reference the "Yes" button
const noButton = document.querySelector('#noBtn'); // Reference the "No" button
const margin = 30; // Define the minimum margin

function moveButton(buttonElement) {
  const buttonRect = buttonElement.getBoundingClientRect();
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
  buttonElement.style.left = randomX + 'px';
  buttonElement.style.top = randomY + 'px';

  changeBackgroundColor(buttonElement); // Change the button's background color
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

function changeBackgroundColor(buttonElement) {
  const randomColor = getRandomColor();
  buttonElement.style.backgroundColor = randomColor;

  const brightness = getBrightness(randomColor);
  buttonElement.style.color = brightness > 128 ? 'black' : 'white';
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
  window.location.href = './love-page/hehe.html';
} 
/************************ 👀hey, if you really want to propose Her... 
then just change -
         
                  ./love-page/hehe.html to ./love-page/love.html                  

and you are ready to propose Her!😁

- see README.txt file on love-page folder for more information!!!
************************/

// Event listeners
button.addEventListener('mouseenter', () => moveButton(button)); // For desktop
button.addEventListener('click', () => moveButton(button)); // For mobile

yesButton.addEventListener('click', function () {
  showAlertAndRedirect();
  yesButton.disabled = true;
});

yesButton.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});

noButton.addEventListener('click', () => moveButton(noButton)); // Move "No" button
noButton.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});

// Wassup ?