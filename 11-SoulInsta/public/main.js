let form = document.getElementById('myform');
let error = document.getElementById('error');
let memeseme = document.getElementById('memeseme');
let loading = document.getElementById('loading');
memeseme.style.display = 'none';  
loading.style.display = 'none';   

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    let instaUsername = document.getElementById('name').value.trim(); 
    
    if (!instaUsername) {
        error.innerHTML = 'Please type your Insta username';
        memeseme.style.display = 'none'; 
        loading.style.display = 'none';  
    } else {
        error.innerHTML = ''; 
        loading.style.display = 'flex'; 
        memeseme.style.display = 'none'; 

        
        setTimeout(() => {
            loading.style.display = 'none'; 
            memeseme.style.display = 'block'; 
            form.style.display = 'none'; 
        }, 3000); 
    }
});
