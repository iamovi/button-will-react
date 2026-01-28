// Background Emojis
const emojiBg = document.getElementById("emojiBg");
const sadEmojis = ["😢", "😭", "☹️", "🙁", "😞", "😔", "😟", "😩", "😫", "💔"];

function createEmoji() {
  const emoji = document.createElement("div");
  emoji.className = "floating-emoji";
  emoji.textContent = sadEmojis[Math.floor(Math.random() * sadEmojis.length)];

  const left = Math.random() * 100;
  const size = 1.5 + Math.random() * 2.5;
  const duration = 15 + Math.random() * 20;
  const delay = Math.random() * 10;

  emoji.style.left = `${left}%`;
  emoji.style.fontSize = `${size}rem`;
  emoji.style.animationDuration = `${duration}s`;
  emoji.style.animationDelay = `-${delay}s`; // Start at random progress

  emojiBg.appendChild(emoji);

  // Remove after animation finishes to keep DOM clean
  setTimeout(
    () => {
      emoji.remove();
    },
    (duration + delay) * 1000,
  );
}

// Initialize initial set
for (let i = 0; i < 20; i++) {
  createEmoji();
}

// Continuously add new ones
setInterval(createEmoji, 2000);

const btn = document.getElementById("happinessBtn");
const status = document.getElementById("status");

const messages = [
  { text: "Analyzing emotional variance...", delay: 1000 },
  { text: "Detected: Significant hope deficits", delay: 1200 },
  { text: "Calibrating neural pathways...", delay: 1000 },
  { text: "Sourcing joy particles...", delay: 1500 },
  { text: "Happiness found: 0.000% match", delay: 1200 },
  { text: "Executing Plan B...", delay: 1000 },
  { text: "Redirecting to Absolute Truth...", delay: 1500 },
  { text: "LOL GOTCHA! 😈", delay: 1000 },
  { text: "NEVER GONNA GIVE YOU UP", delay: 2000 },
];

btn.addEventListener("click", () => {
  const nameInput = document.getElementById("userName");
  const name = nameInput.value.trim();

  if (!name) {
    const originalPlaceholder = nameInput.placeholder;
    nameInput.placeholder = "FILL THEN CLICK";
    nameInput.classList.add("error-state");

    setTimeout(() => {
      nameInput.placeholder = originalPlaceholder;
      nameInput.classList.remove("error-state");
    }, 2000);
    return;
  }

  btn.disabled = true;
  btn.textContent = "Processing...";

  // Hide inputs smoothly
  const inputGroup = document.querySelector(".input-group");
  if (inputGroup) {
    inputGroup.style.opacity = "0.3";
    inputGroup.style.pointerEvents = "none";
  }

  const personalizedMessages = [
    { text: `Identifying subject: ${name}...`, delay: 1000 },
    { text: `Cross-referencing existential voids...`, delay: 1500 },
    { text: `Wow, you really clicked it, ${name}?`, delay: 1200 },
    { text: "Happiness found: 0.000% match", delay: 1200 },
    { text: `Executing Plan B for ${name}...`, delay: 1000 },
    { text: "Redirecting to Absolute Truth...", delay: 1500 },
    { text: "LOL GOTCHA! 😈", delay: 1000 },
    { text: "NEVER GONNA GIVE YOU UP", delay: 2000 },
  ];

  status.style.opacity = "1";

  let index = 0;

  function showNext() {
    if (index < personalizedMessages.length) {
      status.textContent = personalizedMessages[index].text;

      if (index === personalizedMessages.length - 2) {
        status.classList.add("blink");
      }

      const currentDelay = personalizedMessages[index].delay;
      index++;
      setTimeout(showNext, currentDelay);
    } else {
      status.classList.remove("blink");
      status.textContent = `YOU'VE BEEN RICKROLLED, ${name}! 😂`;

      // Hide UI elements to make room for video
      const questions = document.querySelector(".questions-stack");
      const inputs = document.querySelector(".input-group");
      if (questions) questions.style.display = "none";
      if (inputs) inputs.style.display = "none";
      btn.style.display = "none";

      // Embed video
      const host = document.getElementById("videoHost");
      host.innerHTML = `<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      host.classList.add("active");
    }
  }

  showNext();
});
