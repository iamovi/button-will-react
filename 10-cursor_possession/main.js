const button = document.getElementById('target-button');
const customCursor = document.querySelector('.custom-cursor');
const realCursor = document.querySelector('.real-cursor');
const distanceSpan = document.getElementById('distance');
const offsetSpan = document.getElementById('offset');
const possessionBar = document.getElementById('possession-bar');
const attemptCount = document.getElementById('attempt-count');
const tooltip = document.getElementById('tooltip');

let realX = 0;
let realY = 0;
let displayX = 0;
let displayY = 0;
let attempts = 0;
let buttonRect = button.getBoundingClientRect();

const messages = [
    "INTERFERENCE DETECTED",
    "CURSOR INTEGRITY COMPROMISED",
    "SYSTEM OVERRIDE IN PROGRESS",
    "OBJECTIVE UNREACHABLE",
    "POSSESSION LEVEL INCREASING",
    "PROTOCOL FAILURE",
    "MAPPING ERROR",
    "INPUT REDIRECTED",
    "COORDINATE MISMATCH",
    "ATTEMPT DENIED"
];

// Update button position on resize
window.addEventListener('resize', () => {
    buttonRect = button.getBoundingClientRect();
});

document.addEventListener('mousemove', (e) => {
    realX = e.clientX;
    realY = e.clientY;

    // Show real cursor position (small red dot)
    realCursor.style.left = realX + 'px';
    realCursor.style.top = realY + 'px';

    // Calculate distance to button center
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    const distance = Math.sqrt(
        Math.pow(realX - buttonCenterX, 2) +
        Math.pow(realY - buttonCenterY, 2)
    );

    // Calculate possession strength (stronger when closer to button)
    const maxDistance = 400;
    const possessionStrength = Math.max(0, 1 - (distance / maxDistance));

    // Maximum offset increases with proximity
    const maxOffset = possessionStrength * 200;

    // Calculate offset direction (away from button)
    const angle = Math.atan2(realY - buttonCenterY, realX - buttonCenterX);
    const offsetX = Math.cos(angle) * maxOffset;
    const offsetY = Math.sin(angle) * maxOffset;

    // Add some randomness for chaos
    const chaos = possessionStrength * 40;
    const randomX = (Math.random() - 0.5) * chaos;
    const randomY = (Math.random() - 0.5) * chaos;

    displayX = realX + offsetX + randomX;
    displayY = realY + offsetY + randomY;

    // Keep cursor within screen bounds
    const margin = 24;
    displayX = Math.max(0, Math.min(window.innerWidth - margin, displayX));
    displayY = Math.max(0, Math.min(window.innerHeight - margin, displayY));

    // Update custom cursor position
    customCursor.style.left = displayX + 'px';
    customCursor.style.top = displayY + 'px';

    // Check if DISPLAY cursor is hovering over button
    const isHovering = isPointInButton(displayX, displayY);
    if (isHovering) {
        button.classList.add('hovering');
    } else {
        button.classList.remove('hovering');
    }

    // Update UI
    distanceSpan.textContent = Math.round(distance);
    offsetSpan.textContent = Math.round(Math.sqrt(offsetX * offsetX + offsetY * offsetY));
    possessionBar.style.width = (possessionStrength * 100) + '%';

    // Change cursor appearance based on possession
    if (possessionStrength > 0.7) {
        customCursor.style.borderColor = 'var(--text)';
        customCursor.style.boxShadow = '0 0 20px rgba(255,255,255,0.4)';
    } else if (possessionStrength > 0.4) {
        customCursor.style.borderColor = 'var(--text)';
        customCursor.style.boxShadow = '0 0 10px rgba(255,255,255,0.2)';
    } else {
        customCursor.style.borderColor = 'var(--text)';
        customCursor.style.boxShadow = 'none';
    }
});

// Handle clicks - use DISPLAY cursor position, not real position
document.addEventListener('click', (e) => {
    // Add click animation
    customCursor.classList.add('clicking');
    setTimeout(() => customCursor.classList.remove('clicking'), 500);

    // Check if the DISPLAY cursor (white circle) is over the button
    const clickedButton = isPointInButton(displayX, displayY);

    if (clickedButton) {
        // Success!
        button.classList.add('active');

        setTimeout(() => {
            button.classList.remove('active');
            button.classList.add('success');
            button.textContent = "LOGIN SUCCESSFUL";
            showTooltip("ACCESS GRANTED", displayX, displayY);
        }, 150);

        setTimeout(() => {
            button.classList.remove('success');
            button.textContent = "LOGIN";
            attempts = 0;
            attemptCount.textContent = attempts;
        }, 3000);
    } else {
        // Failed attempt
        attempts++;
        attemptCount.textContent = attempts;

        // Show sarcastic message
        const msg = messages[Math.floor(Math.random() * messages.length)];
        showTooltip(msg, displayX, displayY);
    }
});

// Prevent Enter key submission and show message
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        showTooltip("YOU MUST CLICK THE BUTTON", displayX, displayY);

        const eventMsg = document.getElementById('possession-event-msg');
        eventMsg.textContent = "ENTER KEY IS PRESSED LOL";
        setTimeout(() => {
            eventMsg.textContent = "";
        }, 2000);
    }
});

function isPointInButton(x, y) {
    return x >= buttonRect.left &&
        x <= buttonRect.right &&
        y >= buttonRect.top &&
        y <= buttonRect.bottom;
}

function showTooltip(message, x, y) {
    tooltip.textContent = message;
    tooltip.style.left = x + 'px';
    tooltip.style.top = (y - 40) + 'px';
    tooltip.classList.add('show');

    setTimeout(() => {
        tooltip.classList.remove('show');
    }, 2000);
}

// Initial button position
setTimeout(() => {
    buttonRect = button.getBoundingClientRect();
}, 100);

// Update button rect periodically in case of any layout changes
setInterval(() => {
    buttonRect = button.getBoundingClientRect();
}, 1000);