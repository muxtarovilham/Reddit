const productPopular = document.getElementById('popular-container');
const productPost = document.getElementById('posts-container');


// Popular Posts
async function getProducts() {
    try {
        const res = await axios.get('http://localhost:3000/posts');
        const data = res.data;
        db = data;
        db.map(item => {
            const box = document.createElement('div');
            box.className = 'box col-12 col-sm-4 col-lg-3';
            box.innerHTML = `
                <a class="boxes">
                    <img src="${item.image}" alt="${item.name}"> 
                    <p>${item.name}</p>
                    <div class="users">
                        <img src="${item.userimage}" alt="${item.username}">
                        <h1>${item.username}</h1>
                    </div>
                </a>
            `;
            productPopular.appendChild(box);
        });
    } catch (error) {
        console.error('Error fetching popular posts:', error);
    }
}
getProducts();

// Post

async function getPostz() {
    try {
        const res = await axios.get('http://localhost:3000/post');
        const data = res.data;
        db = data;
        db.map(item => {np
            const box = document.createElement('div');
            box.className = 'box col-12';
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
                    <div class="comment-section" id="commentSection-${item.id}" style="display:none;">
                        <input type="text" placeholder="Add a comment" id="commentInput-${item.id}">
                        <button onclick="postComment(${item.id})">Post</button>
                        <div id="comments-${item.id}"></div>
                    </div>
                </div>
            `;
            productPost.appendChild(box);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}



const searchForm = document.getElementById('Searchform');
const nameInput = document.getElementById('nameInput');



function formSearch() {
    productPost.innerHTML = ''
    axios.get('http://localhost:5500/assets/json/db.json')
    .then(res => {
        db = res.data.post
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
            <button><i class="fa-solid fa-share"></i></button>  
            </div>
            <button onclick="bookmark(${item.id})"><i class="fa-solid fa-bookmark"></i></button>     
            </div>
            <div class="comment-section" id="commentSection-${item.id}" style="display:none;">
            <input type="text" placeholder="Add a comment" id="commentInput-${item.id}">
            <button onclick="postComment(${item.id})">Post</button>
            <div id="comments-${item.id}"></div>
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




getPostz()


function toggleCommentSection(postId) {
    const commentSection = document.getElementById(`commentSection-${postId}`);
    const isCommentSectionVisible = commentSection.style.display === "block";

    commentSection.style.display = isCommentSectionVisible ? "none" : "block";
}

function closeModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.style.display = 'none';
}

function postComment(postId) {
    const commentInput = document.getElementById(`commentInput-${postId}`);
    const commentText = commentInput.value.trim();

    if (commentText !== "") {
        // Check if user is logged in
        if (isLoggedIn()) {
            const comment = {
                postId: postId,
                text: commentText
            };

            db.find(item => item.id === postId).comments.push(comment);

            updateCommentsUI(postId);

            commentInput.value = "";
        } else {
            // Display the login modal
            const loginModal = document.getElementById('loginModal');
            loginModal.style.display = 'block';
        }
    }
}

function isLoggedIn() {
    return false; 
}


function updateCommentsUI(postId) {
    const commentsContainer = document.getElementById(`comments-${postId}`);
    const postComments = db.find(item => item.id === postId).comments;

    commentsContainer.innerHTML = "";

    postComments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `<strong>User:</strong> ${comment.text}`;
        commentsContainer.appendChild(commentElement);
    });
}







function like(id) {
    const like = JSON.parse(localStorage.getItem('like')) || [];
    const index = like.findIndex(item => item.id === id);

    if (index !== -1) {
        like.splice(index, 1);
        localStorage.setItem('like', JSON.stringify(like));
    } else {
        like.push(db.find(item => item.id === id));
        localStorage.setItem('like', JSON.stringify(like));
    }
}

function bookmark(id) {
    const bookmark = JSON.parse(localStorage.getItem('bookmark')) || [];
    const index = bookmark.findIndex(item => item.id === id);

    if (index !== -1) {
        bookmark.splice(index, 1);
        localStorage.setItem('bookmark', JSON.stringify(bookmark));
    } else {
        bookmark.push(db.find(item => item.id === id));
        localStorage.setItem('bookmark', JSON.stringify(bookmark));
    }
}


var emailArray=[];
var passwordArray=[];

var loginBox = document.getElementById("login");
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


function register(){
    event.preventDefault();

    var email = document.getElementById("re").value;
    var password = document.getElementById("rp").value;
    var passwordRetype = document.getElementById("rrp").value;

    if (email == ""){
        alert("Email required.");
        return ;
    }
    else if (password == ""){
        alert("Password required.");
        return ;
    }
    else if (passwordRetype == ""){
        alert("Password required.");
        return ;
    }
    else if ( password != passwordRetype ){
        alert("Password don't match retype your Password.");
        return;
    }
    else if(emailArray.indexOf(email) == -1){
        emailArray.push(email);
        passwordArray.push(password);

        alert(email + "  Thanks for registration. \nTry to login Now");

        document.getElementById("re").value ="";
        document.getElementById("rp").value="";
        document.getElementById("rrp").value="";
    }
    else{
        alert(email + " is already register.");
        return ;
    }
}
function login(){
    event.preventDefault();

    var email = document.getElementById("se").value;
    var password = document.getElementById("sp").value;

    var i = emailArray.indexOf(email);

    if(emailArray.indexOf(email) == -1){
        if (email == ""){
            alert("Email required.");
            return ;
        }
        alert("Email does not exist.");
        return ;
    }
    else if(passwordArray[i] != password){
        if (password == ""){
            alert("Password required.");
            return ;
        }
        alert("Password does not match.");
        return ;
    }
    else {
        alert(email + "You are login now, welcome to our website.");
        window.location.href = "account.html";
        document.getElementById("se").value ="";
        document.getElementById("sp").value="";
        return ;
    }

}
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



const loginbuton = document.getElementById('loginbuton')

loginbuton.addEventListener('click', (e) => {
    e.preventDefault()
    loginModal.style.display = 'block';
})

const loginbutonn = document.getElementById('loginbutonn')

loginbutonn.addEventListener('click', (e) => {
    e.preventDefault()
    loginModal.style.display = 'block';
})