// Random savage quotes
let quotes = [
    "Wow… your soulmate must be lost. Probably in a parallel universe.",
    "Compatibility too high. System suspects self-love. Please touch grass.",
    "You checking for a partner like it's a Pokémon hunt. Sad.",
    "Cupid called. He said he's out of arrows for you.",
    "Your ideal match is currently buffering… forever.",
    "Love isn't coming. Maybe try WiFi next time?",
    "Your crush is probably ignoring you… and you deserved it.",
    "System alert: High delusion detected. Please recalibrate.",
    "Your Valentine's plans? Oh right… they don't exist.",
    "Someone loves you… oh wait, it's just your reflection."
];

// Form submission handler
let form = document.getElementById('myform');
let nameInput = document.getElementById('name');
let errorElement = document.getElementById('error');
let loadingElement = document.getElementById('loading');
let memesemeDiv = document.getElementById('memeseme');

// Initial state
loadingElement.style.display = 'none';
memesemeDiv.style.display = 'none';

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let instaUsername = nameInput.value.trim();

    if (!instaUsername) {
        errorElement.innerHTML = '⚠️ Please enter your Instagram username';
        memesemeDiv.style.display = 'none';
        loadingElement.style.display = 'none';
        return;
    }

    // Clear error and reset displays
    errorElement.innerHTML = '';
    loadingElement.style.display = 'flex';
    memesemeDiv.style.display = 'none';
    // hide form during loading
    form.style.display = 'none'; 

    // starting percentage
    let percentage = 12; 
    let progressText = document.createElement('p');
    progressText.id = 'progressText';
    progressText.className = 'progress-percentage';
    progressText.innerHTML = `Compatibility: ${percentage}%`;
    loadingElement.appendChild(progressText);

    // Increment percentage
    let interval = setInterval(() => {
        if (percentage < 97) {
             // increase by 1-3%
            percentage += Math.floor(Math.random() * 3) + 1;
            if (percentage > 97) percentage = 97;
            progressText.innerHTML = `Compatibility: ${percentage}%`;
        } else {
            clearInterval(interval);
            // Pause 1 second for dramatic effect
            setTimeout(() => {
                // Pick random quote
                let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                
                // Update the meme message with random quote
                let memeMessageP = memesemeDiv.querySelector('.meme-message p');
                if (memeMessageP) {
                    memeMessageP.textContent = randomQuote;
                }
                
                // Hide loading and show meme
                loadingElement.style.display = 'none';
                memesemeDiv.style.display = 'block';
                progressText.remove();
            }, 1000);
        }
    }, 100); // updates every 100ms
});

// Add subtle parallax effect to gradient orbs
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;
        orb.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});