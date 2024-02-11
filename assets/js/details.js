const productPost = document.getElementById('posts-container');


// Post

 const urlParams = new URLSearchParams(window.location.search);
 const postId = urlParams.get('id');
 
 // Function to fetch post details based on the post ID
 async function getPostDetails(postId) {
     try {
         const res = await axios.get(`http://localhost:5500/assets/json/db.json`);
         const data = res.data.gaming;
         const post = data.find(item => item.id === postId);
 
         // Display post details on the page
         const postDetailsContainer = document.getElementById('postDetailsContainer');
         postDetailsContainer.innerHTML = `
             <h1>${post.name}</h1>
             <div class="users">
                 <img src="${post.userimage}" alt="${post.username}">
                 <h2>${post.username}</h2>
             </div>
             <img class="postImg" src="${post.media}" alt="${post.name}">
             <!-- Add other details as needed -->
         `;
     } catch (error) {
         console.error('Error fetching post details:', error);
     }
 }
 
 // Call the function to fetch and display post details
 getPostDetails(postId);



function closeModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.style.display = 'none';
}





// Popular


const community = document.getElementById('community');




async function getPopulars() {
    try {
        const res = await axios.get('http://localhost:5500/assets/json/db.json');
        const data = res.data.popular;
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
        window.location.href = "index.html";
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