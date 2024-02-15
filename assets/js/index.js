const productPost = document.getElementById('posts-container');


async function getPosts() {
    try {
        const res = await axios.get('http://localhost:3000/otherPosts');
        const data = res.data;
        db = data

        const gamingPosts = db.filter(item => item.category === 'post');

        gamingPosts.forEach(item => {
            const box = document.createElement('div');
            box.className = 'box col-12';
            box.innerHTML = `
                <div class="boxes">
                    <div class="users">
                        <img src="${item.userimage}" alt="${item.username}">
                        <h1>${item.username}</h1>
                    </div>
                    <a style="cursor: pointer" onclick="showPostDetails(${item.id})">${item.name}</a>
                    <img class="postImg" src="${item.media}" alt="${item.name}">
                    <div class="interaction-icons">
                        <div class="sends">
                        <div class="likess">
                            <button onclick="like(${item.id})"><i class="fa-solid fa-heart"></i></button>  
                            </div>   
                            <button onclick="showPostDetails(${item.id})"><i class="fa-regular fa-comment"></i></button>     
                            <i class="fa-solid fa-share"></i>
                        </div>
                        <button onclick="bookmark(${item.id})"><i class="fa-solid fa-bookmark"></i></button>     
                    </div>
                </div>
            `;
            productPost.appendChild(box);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}








function showPostDetails(postId) {
    window.location.href = `postDetails.html?id=${postId}`;
}



getPosts();








const loginbuton = document.getElementById('loginbuton')

loginbuton.addEventListener('click', (e) => {
    e.preventDefault()
    loginModal.style.display = 'block';
})












const searchForm = document.getElementById('Searchform');
const nameInput = document.getElementById('nameInput');



function formSearch() {
    productPost.innerHTML = ''
    axios.get('http://localhost:3000/post')
    .then(res => {
        db = res.data
        const filteredData = db.filter(item => item.name.toLowerCase().includes(nameInput.value.toLowerCase()))
        filteredData.map(item => {
            const box = document.createElement('div')
            box.className = 'box'
            box.innerHTML = `
            <div class="boxes">
            <div class="users">
                <img src="${item.userimage}" alt="${item.username}">
                <h1>${item.username}</h1>
            </div>
            <a style="cursor: pointer" onclick="showPostDetails(${item.id})">${item.name}</a>
            <img class="postImg" src="${item.media}" alt="${item.name}">
            <div class="interaction-icons">
                <div class="sends">
                    <button onclick="like(${item.id})"><i class="fa-solid fa-heart"></i></button>     
                    <button onclick="showPostDetails(${item.id})"><i class="fa-regular fa-comment"></i></button>     
                    <i class="fa-solid fa-share"></i>
                </div>
                <button onclick="bookmark(${item.id})"><i class="fa-solid fa-bookmark"></i></button>     
            </div>
        </div>
    `;
    productPost.appendChild(box)
        })
    })
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    formSearch()
})


function like(id) {
    const like = JSON.parse(localStorage.getItem('like')) || [];
    const index = like.findIndex(item => item.id == id);

    if (index !== -1) {
        like.splice(index, 1);
        localStorage.setItem('like', JSON.stringify(like));
    } else {
        like.push(db.find(item => item.id == id));
        localStorage.setItem('like', JSON.stringify(like));
    }
 
}

function bookmark(id) {
    const bookmark = JSON.parse(localStorage.getItem('bookmark')) || [];
    const index = bookmark.findIndex(item => item.id == id);

    if (index !== -1) {
        bookmark.splice(index, 1);
        localStorage.setItem('bookmark', JSON.stringify(bookmark));
    } else {
        bookmark.push(db.find(item => item.id == id));
        localStorage.setItem('bookmark', JSON.stringify(bookmark));
    }
}






function closeModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.style.display = 'none';
}



function isLoggedIn() {

    return false; 
}




// Popular


const community = document.getElementById('community');




async function getPopulars() {
    try {
        const res = await axios.get('http://localhost:3000/popular');
        const data = res.data;
        popularDb = data
        popularDb.map(item => {
            const box = document.createElement('div');
            box.className = 'box col-12';
            box.innerHTML = `
            <div class="communiti">
            <img src="${item.userimage}" alt="">
            <div class="about">
              <h3>${item.username}</h3>
              <p>${item.members} members</p>
            </div>
          </div>
            `
            community.appendChild(box);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

getPopulars();













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


    console.log("User signed out. LocalStorage key 'user' removed.");
}




function addPost() {
    window.location.href = './addPost.html'
}

document.addEventListener("DOMContentLoaded", function() {
    var usernameElement = document.getElementById("usernamee");
    var addButton = document.getElementById("addButton");

    if (usernameElement.innerHTML.trim() === "") {
      addButton.style.display = "none";
    } else {
      addButton.style.display = "block";
    }
  });



