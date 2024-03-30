function byTahsin(){
    let fstBox = document.getElementById("box1");
    let secondBox = document.getElementById("box2");

    fstBox.addEventListener("mouseover", function(){
        document.getElementById("green").innerText = "you're so lucky"
    })

    fstBox.addEventListener("mouseout", function(){
        document.getElementById("green").innerText = "Propose tahsin"
    })

    fstBox.addEventListener("click", function(){
        window.location.href = "ILoveU.html";
    })

    // rejection is the piller of success

    secondBox.addEventListener("mouseover", function(){
        secondBox.style.float = "right";
    })

    secondBox.addEventListener("mouseout", function(){
        secondBox.style.float = "left";


    })
}
byTahsin();
