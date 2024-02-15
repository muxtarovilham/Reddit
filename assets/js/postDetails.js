async function getPostDetails(postId) {
    try {
        const res = await axios.get(`http://localhost:3000/otherPosts/${postId}`);
        const post = res.data;

        const postDetails = document.getElementById('postsDetails');
        postDetails.innerHTML = `
            <div class="boxes">
                <div class="users">
                <img src="${post.userimage}" alt="${post.username}">
                <h1>${post.username}</h1>
                </div>
                <a>${post.name}</a>
                <p style="color: gray; font-weight: 600; font-size: 18px">${post.description}</p>
                <img class="gonderiResmi" src="${post.media}" alt="${post.name}">
                <div class="comment-section">
    <input type="text" id="commentInput" placeholder="Add a comment...">
    <button onclick="addComment(${post.id})"><i class="fa-regular fa-paper-plane"></i></button>
</div>
                <div class="interaction-icons">
                    <div class="send">
                        <button onclick="yorumAlaniniGoster(${post.id})"><i class="fa-regular fa-comment"></i>Comments</button>     
                    </div>
                </div>
            </div>
        `;
        


postDetails.appendChild(commentsSection);

    } catch (hata) {
        console.error('Gönderi detayları getirme hatası:', hata);
    }
}

function yorumAlaniniGoster(postId) {
    
}

const postId = window.location.search.split('=')[1];
getPostDetails(postId);
var usernameeElement = document.getElementById("usernamee");

async function addComment(postId) {
    try {
        const commentInput = document.getElementById('commentInput');
        const commentText = commentInput.value;

        if (!commentText) {
            alert('Please enter a comment before sending.');
            return;
        }
        const generateRandomId = () => {
            return Math.floor(Math.random() * 1000000).toString();
          };

        await axios.post('http://localhost:3000/comments', {
            postId: postId,
            username: usernameeElement.textContent,
            text: commentText,
            id: generateRandomId()
            
        });

        getPostDetails(postId);

        commentInput.value = '';

    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

let isCommentsVisible = false; 

async function yorumAlaniniGoster(postId) {
    try {
        // Toggle the visibility state
        isCommentsVisible = !isCommentsVisible;

        if (isCommentsVisible) {
            const commentResponse = await axios.get(`http://localhost:3000/comments?postId=${postId}`);
            const comments = commentResponse.data;

            const commentsContainer = document.createElement('div');
            commentsContainer.className = 'comments-container';

            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                commentElement.innerHTML = `
                    <a><i class="fab fa-reddit-alien"></i>@${comment.username}</a>
                    <p>${comment.text}</p>
                `;
                commentsContainer.appendChild(commentElement);
            });

            const postDetails = document.getElementById('postsDetails');
            postDetails.appendChild(commentsContainer);
        } else {
            const existingCommentsContainer = document.querySelector('.comments-container');
            if (existingCommentsContainer) {
                existingCommentsContainer.remove();
            }
        }

    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}














const loginbuton = document.getElementById('loginbuton')

loginbuton.addEventListener('click', (e) => {
    e.preventDefault()
    loginModal.style.display = 'block';
})











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
        db = data
        db.map(item => {
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