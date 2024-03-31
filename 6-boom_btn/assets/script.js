const funnyButton = document.getElementById('funnyButton');
const funnyEvents = document.getElementById('funnyEvents');
const funnyMusic = document.getElementById('funnyMusic');

funnyButton.addEventListener('click', () => {
  funnyEvents.innerHTML = ""; // Clear previous events

  // Play funny music
  funnyMusic.play();

  // Add background-change class to body
  document.body.classList.add('background-change');

  setTimeout(() => {
    funnyEvents.innerHTML += "Oops! The button exploded! 💥<br>";
  }, 1000);

  setTimeout(() => {
    funnyEvents.innerHTML += "A duck just walked across the screen! 🦆<br>";
  }, 2000);

  setTimeout(() => {
    funnyEvents.innerHTML += "And now, a cat is playing the piano! 🎹🐱<br>";
  }, 3000);

  setTimeout(() => {
    funnyEvents.innerHTML += "A monkey is swinging from the ceiling fan! 🐒<br>";
  }, 4000);

  setTimeout(() => {
    funnyEvents.innerHTML += "A penguin is sliding across the floor! 🐧<br>";
  }, 5000);

  setTimeout(() => {
    funnyEvents.innerHTML += "The ghost of a forgotten CSS bug just haunted the webpage! 👻<br>";
  }, 6000);

  setTimeout(() => {
    funnyEvents.innerHTML += "You're now the proud owner of a virtual rubber duck! 🛁<br>";
  }, 7000);

  setTimeout(() => {
    funnyEvents.innerHTML += "Congratulations, you've won the 'Most Random Button Click' award! 🏆";
  }, 8000);
});
