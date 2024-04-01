
let greenBtn = document.getElementById("green");
let fstimg = document.getElementById("fstimg");
let secondImg = document.getElementById("secondimg");

greenBtn.addEventListener("click", function () {
  secondImg.style.visibility = "visible";
  fstimg.style.visibility = "hidden";
  document.querySelector("h1").innerText = "i love you to bby ";
})

// rejection is the piller of success
const red = document.getElementById("red");

red.addEventListener("mouseover", function(){
  // console.log("btn er maire sakinaka");
  document.querySelector("h1").innerText = "you can't reject me lol ";


  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const randomX = Math.floor(Math.random() * (windowWidth - 50));
  const randomY = Math.floor(Math.random() * (windowHeight - 50));

  red.style.left = randomX + "px";
  red.style.top = randomY + "px";
})





