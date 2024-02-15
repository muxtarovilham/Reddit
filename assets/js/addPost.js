const loginbuton = document.getElementById('loginbuton')

loginbuton.addEventListener('click', (e) => {
    e.preventDefault()
    loginModal.style.display = 'block';
})




function closeModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.style.display = 'none';
}



function isLoggedIn() {

    return false; 
}










// Login Forum





var lgin = document.getElementById("login");
var regBox = document.getElementById("register");
var forgetBox = document.getElementById("forgot");

var loginTab = document.getElementById("lt");
var regTab = document.getElementById("rt");

function regTabFun(){
    event.preventDefault();

    regBox.style.visibility="visible";
    loginBox.style.visibility="hidden";
    forgetBox.style.visibility="hidden";

    regTab.style.backgroundColor="green";
    loginTab.style.backgroundColor="orangered";
}
function loginTabFun(){
    event.preventDefault();

    regBox.style.visibility="hidden";
    loginBox.style.visibility="visible";
    forgetBox.style.visibility="hidden";

    loginTab.style.backgroundColor="green";
    regTab.style.backgroundColor="orangered";
}
function forTabFun(){
    event.preventDefault();

    regBox.style.visibility="hidden";
    loginBox.style.visibility="hidden";
    forgetBox.style.visibility="visible";

    regTab.style.backgroundColor="orangered";
    loginTab.style.backgroundColor="orangered";

}


function regTabFun() {
    window.location.href = './signup.html'
}



async function getData() {
    await axios.get('https://655e356a9f1e1093c59ab81c.mockapi.io/Api3/Api3')
    .then(res => {
        findData = res.data
    })
}

async function checkUser(e) {
    e.preventDefault()

    var email = document.getElementById("se");
    var password = document.getElementById("sp");

    await getData()

    let checkEmail = findData.find(item => item.email == email.value)
    let checkPassword = findData.find(item => item.password == password.value)

    if (checkEmail && checkPassword) {
        let user = JSON.parse(localStorage.getItem("user")) || []
        user.push(checkEmail)
        localStorage.setItem("user", JSON.stringify(user))
        console.log("Hos geldiniz")
        window.location.href = "./index.html"
    } else {
        alert("wrong password or email");
        
    }
}

lgin.addEventListener('submit', checkUser)


function forgot(){
    event.preventDefault();

    var email = document.getElementById("fe").value;

    if(emailArray.indexOf(email) == -1){
        if (email == ""){
            alert("Email required.");
            return ;
        }
        alert("Email does not exist.");
        return ;
    }

    alert("Email is send to your email check it in 24hr.");
    document.getElementById("fe").value ="";
}



// ---


document.addEventListener("DOMContentLoaded", function() {
    let userData = JSON.parse(localStorage.getItem("user"));

    if (userData && userData.length > 0) {
        let user = userData[0];

        let firstname = user.username;

        document.getElementById("usernamee").textContent = firstname;
    } else {
        document.getElementById("usernamee").textContent = "";
    }
});




document.addEventListener("DOMContentLoaded", function () {
    var usernameeElement = document.getElementById("usernamee");
    var loginModalElement = document.getElementById("loginModal");

    if (usernameeElement.innerHTML.trim() !== "") {
        loginModalElement.style.display = "none";
    } else {
        loginModalElement.style.display = "block";
    }
});


function toggleLoginSections() {
    var usernameElement = document.getElementById("usernamee");
    var loginFirst = document.getElementById("loginFirst");
    var loginSecond = document.getElementById("loginSecond");

    if (usernameElement.innerHTML.trim() === "") {
        loginFirst.style.display = "block";
        loginSecond.style.display = "none";
    } else {
        loginFirst.style.display = "none";
        loginSecond.style.display = "block";
    }
}

document.body.onload = toggleLoginSections;





    // Darkmod

 function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");

  
}
    



function endAccount() {
    localStorage.removeItem("user");

    window.location.href = './index.html'
    console.log("User signed out. LocalStorage key 'user' removed.");
}



// Add Post



var usernameeElement = document.getElementById("usernamee");

const userimg = document.createElement('img')
userimg.src = 'https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_reddit-512.png'

function submitForm() {
    const generateRandomId = () => {
      return Math.floor(Math.random() * 1000000).toString();
    };
  
    const mediaInput = document.getElementById('media');
    const file = mediaInput.files[0];
  
    const reader = new FileReader();
  
    reader.onloadend = function () {
      const postData = {
        userimage: userimg.src,
        media: reader.result,
        username: usernameeElement.textContent,
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        category: document.getElementById('categories').value,
        id: generateRandomId(),
        comments: [],
      };
  
      console.log('Gönderilecek veri:', postData);
  
      axios
        .post('http://localhost:3000/otherPosts', postData)
        .then((response) => {
          console.log('İstek başarılı:', response.data);
        })
        .catch((error) => {
          console.error('İstek hatası:', error);
        });
    };
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      console.error('No file selected');
    }
  }




  function addPost() {
    window.location.href = './addPost.html'
  }