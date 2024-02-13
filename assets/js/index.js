const productPost = document.getElementById('posts-container');


async function getPosts() {
    try {
        const res = await axios.get('http://localhost:3000/post');
        const data = res.data;
        db = data
        db.map(item => {
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
                            <button onclick="like(${item.id})"><i class="fa-solid fa-heart"></i></button>     
                            <button onclick="toggleCommentSection(${item.id})"><i class="fa-regular fa-comment"></i></button>     
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
    // Navigate to the post details page with the post ID
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
            <a>${item.name}</a>
            <img class="postImg" src="${item.media}" alt="${item.name}">
            <div class="interaction-icons">
                <div class="sends">
                    <button onclick="like(${item.id})"><i class="fa-solid fa-heart"></i></button>     
                    <button onclick="toggleCommentSection(${item.id})"><i class="fa-regular fa-comment"></i></button>     
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




function toggleCommentSection(postId) {
    const commentSection = document.getElementById(`commentSection-${postId}`);
    const isCommentSectionVisible = commentSection.style.display === "block";

    commentSection.style.display = isCommentSectionVisible ? "none" : "block";
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
    // Retrieve the user data from localStorage
    let userData = JSON.parse(localStorage.getItem("user"));

    // Check if userData is not null or undefined and if it has at least one user
    if (userData && userData.length > 0) {
        // Assuming that the first item in the array is the user object
        let user = userData[0];

        // Access the "firstname" property from the user object
        let firstname = user.username;

        // Display the firstname in the paragraph element
        document.getElementById("usernamee").textContent = firstname;
    } else {
        // If userData is not available or doesn't have any users, handle it accordingly
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
        // Username is empty, show loginFirst, hide loginSecond
        loginFirst.style.display = "block";
        loginSecond.style.display = "none";
    } else {
        // Username is not empty, show loginSecond, hide loginFirst
        loginFirst.style.display = "none";
        loginSecond.style.display = "block";
    }
}

// Call the function on page load (assuming you have a body element)
document.body.onload = toggleLoginSections;





    // Darkmod

 function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
    



function endAccount() {
    // localStorage'dan "user" adlı öğeyi sil
    localStorage.removeItem("user");

    // İsteğe bağlı olarak kullanıcıyı başka bir sayfaya yönlendirebilirsiniz
    // window.location.href = "sign-out-page.html";

    // İsteğe bağlı olarak kullanıcıya bir mesaj gösterebilirsiniz
    console.log("User signed out. LocalStorage key 'user' removed.");
}