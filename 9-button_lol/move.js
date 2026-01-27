    const button = document.getElementById('loginBtn');
    const loginContainer = document.querySelector('.login-container');
    
    let buttonX, buttonY;
    let targetX, targetY;
    let isMoving = false;
    let isInCooldown = false;
    
    function initButtonPosition() {
      const containerRect = loginContainer.getBoundingClientRect();
      buttonX = containerRect.left + containerRect.width / 2 - 70;
      buttonY = containerRect.bottom - 65;
      targetX = buttonX;
      targetY = buttonY;
      button.style.left = buttonX + 'px';
      button.style.top = buttonY + 'px';
    }
    
    initButtonPosition();
    window.addEventListener('resize', initButtonPosition);
    
    function animate() {
      if (isMoving) {
        const speed = 0.25;
        buttonX += (targetX - buttonX) * speed;
        buttonY += (targetY - buttonY) * speed;
        
        button.style.left = buttonX + 'px';
        button.style.top = buttonY + 'px';
        
        if (Math.abs(targetX - buttonX) < 0.3 && Math.abs(targetY - buttonY) < 0.3) {
          buttonX = targetX;
          buttonY = targetY;
          isMoving = false;
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
    
    let lastMoveTime = 0;
    
    document.addEventListener('mousemove', function(e) {
      const now = Date.now();
      
      if (now - lastMoveTime < 50) return;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const currentBtnCenterX = buttonX + 70;
      const currentBtnCenterY = buttonY + 18;
      const targetBtnCenterX = targetX + 70;
      const targetBtnCenterY = targetY + 18;
      
      const distFromCurrent = Math.sqrt(
        Math.pow(currentBtnCenterX - mouseX, 2) + 
        Math.pow(currentBtnCenterY - mouseY, 2)
      );
      
      const distFromTarget = Math.sqrt(
        Math.pow(targetBtnCenterX - mouseX, 2) + 
        Math.pow(targetBtnCenterY - mouseY, 2)
      );
      
      const distance = Math.min(distFromCurrent, distFromTarget);
      
      if (distance < 300 && !isInCooldown) {
        lastMoveTime = now;
        isInCooldown = true;
        
        const dx = currentBtnCenterX - mouseX;
        const dy = currentBtnCenterY - mouseY;
        const angle = Math.atan2(dy, dx);
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const distFromCenterX = currentBtnCenterX - centerX;
        const distFromCenterY = currentBtnCenterY - centerY;
        const distFromCenter = Math.sqrt(distFromCenterX * distFromCenterX + distFromCenterY * distFromCenterY);
        
        const maxRadius = Math.min(window.innerWidth, window.innerHeight) * 0.4;
        
        let finalAngle = angle;
        
        if (distFromCenter > maxRadius) {
          const angleToCenter = Math.atan2(-distFromCenterY, -distFromCenterX);
          finalAngle = angleToCenter;
        }
        
        const jumpDist = Math.max(200, 350 - distance);
        
        targetX = buttonX + Math.cos(finalAngle) * jumpDist;
        targetY = buttonY + Math.sin(finalAngle) * jumpDist;
        
        const margin = 40;
        targetX = Math.max(margin, Math.min(targetX, window.innerWidth - 140 - margin));
        targetY = Math.max(margin, Math.min(targetY, window.innerHeight - 60 - margin));
        
        isMoving = true;
        
        setTimeout(() => {
          isInCooldown = false;
        }, 300);
      }
    });
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        showNotification();
      }
    });
    
    function showNotification() {
      const notification = document.getElementById('notification');
      notification.classList.add('show');
      
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000);
    }
    
    function login() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorMsg = document.getElementById('errorMsg');
      
      if(email === "" || password === "") {
        errorMsg.textContent = "Please enter both email and password.";
        return;
      }
      
      const validEmail = "example@gmail.com";
      const validPassword = "123456";
      
      if(email === validEmail && password === validPassword) {
        alert("Login successful! You somehow caught me!");
        errorMsg.textContent = "";
      } else {
        errorMsg.textContent = "Invalid email or password.";
      }
    }