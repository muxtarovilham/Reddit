

var form = document.getElementById("form");

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
        var username = document.getElementById("usernames").value;
        var password = document.getElementById("passwords").value;
    
        if (username === "ilham77" && password === "admin") {
            window.location.href = './admin.html'
        } else {
            alert("Hatalı kullanıcı adı veya şifre!");
        }
})