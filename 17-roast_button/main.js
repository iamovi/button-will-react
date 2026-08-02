const button = document.getElementById("catch-btn")
const header = document.getElementById("header")

const modal = document.getElementById("victory")
const restartButton = document.getElementById("restart")



let escapes = 0
let attempts = 0
let seconds =0 
let minutes =0
let gameOver = false
let gameStart = false

let timer = null



button.addEventListener("mouseenter", () => {

    if(!gameStart){
        gameStart = true
        timer = setInterval(updateTimer,1000)
    }
    //button movement will be delayed when escapes increasing
    let escapeChance = 1;
    let delay = 0;

    if (escapes <= 20) {
        escapeChance = 10;
        delay = 0;
    }

    else if (escapes <= 40) {
        escapeChance = 5;
        delay = 25;
    }

    else if (escapes <= 60) {
        escapeChance = 4;
        delay = 45;
    }

    else if (escapes <= 80) {
        escapeChance = 3;
        delay = 130;
    }

    else {
        escapeChance = 1;
        delay = 150;
    } 

    if (Math.random() < escapeChance) {

        setTimeout(() => {
            if(!gameOver){
                 moveButton();
            }
        }, delay);

    }

   

});

button.addEventListener("click",()=>{
    if(gameOver){
        return
    }

    gameOver = true
    attempts++
    document.getElementById("attempts").textContent = attempts
    clearInterval(timer)
    //displaying the final stats
    document.getElementById("final-attempts").textContent = "Attempts: " + attempts
    document.getElementById("final-escapes").textContent = "Escapes: " + escapes
    document.getElementById("final-time").textContent = "Time: " + 
        String(minutes).padStart(2,"0")+":"+String(seconds).padStart(2,"0");

    document.getElementById("final-message").textContent = randomItem(finalRoasts)
    modal.classList.remove("hidden")

})

function moveButton() {
    const headerHeight = header.offsetHeight
    const buttonWidth = button.offsetWidth
    const buttonHeight = button.offsetHeight
    //keeps the button inside screen
    const maxx = window.innerWidth-buttonWidth
    const maxy = window.innerHeight-buttonHeight
    //creates random positions
    const random = Math.random() * maxx
    //prevent overlapping
    const randomy = headerHeight+Math.random() * (maxy - headerHeight)
    //random angle(optional)
    //const angle = Math.floor(Math.random()*61)-30

    //Random Size
    const width = Math.floor(Math.random()*80)+140


    button.style.left = random + "px"
    button.style.top = randomy + "px"
    button.style.transform = "none"
    button.style.backgroundColor = randomItem(colors)
    //button.style.rotate = angle + "deg"
    button.style.width = width + "px"
    button.textContent = randomItem(buttonTexts)
     document.getElementById("roast").textContent = randomItem(roasts)

    escapes++

    document.getElementById("escapes").textContent = escapes
   

}


//helper function (picks random element from array)

function randomItem(array) {
    return array[Math.floor(Math.random()* array.length)]
}

//function to update attempts,minutes,seconds
function updateTimer(){
    seconds++
    if(seconds == 60){
        minutes++
        seconds=0
    }

    const displayMinutes = String(minutes).padStart(2,"0")
    const displaySeconds = String(seconds).padStart(2,"0")
    document.getElementById("timer").textContent = `${displayMinutes}:${displaySeconds}`
}


restartButton.addEventListener("click", ()=>{
    location.reload()
})