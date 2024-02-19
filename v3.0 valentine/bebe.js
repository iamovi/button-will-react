let buttonSize = 100;

function onYesClick() {
  const gifImage = document.getElementById("gif");
  gifImage.src = "./assets/mine.jpg";

  const loveMessage = document.getElementById("loveMessage");
  loveMessage.style.display = "block";

  resetButtonSize();
}

function onNoClick() {
  buttonSize += 10;

  const yesButton = document.getElementById("yesButton");

  yesButton.style.width = buttonSize + "px";
  yesButton.style.height = buttonSize + "px";
}

function resetButtonSize() {
  buttonSize = 100;

  const yesButton = document.getElementById("yesButton");

  yesButton.style.width = buttonSize + "px";
  yesButton.style.height = buttonSize + "px";
}
