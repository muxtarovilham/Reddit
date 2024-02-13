document.addEventListener("DOMContentLoaded", function () {
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


fetch('db.json') // Eğer HTML ve JSON aynı dizinde ise
    .then(response => response.json())
    .then(data => {
        const gamingData = data.gaming;
        console.log(gamingData);
    })
    .catch(error => console.error('Veri getirme hatası:', error));




// Darkmod

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}




function endAccount() {
    // localStorage'dan "user" adlı öğeyi sil
    localStorage.removeItem("user");

    console.log("User signed out. LocalStorage key 'user' removed.");
}



const likes = document.getElementById('likes')
const bookmarks = document.getElementById('bookmarks')




function getPosts() {

    const like = JSON.parse(localStorage.getItem('like')) || [];
    likes.innerHTML = ''
    like.map((item, index) => {
        const box = document.createElement('div');
        box.className = 'box col-12';
        box.innerHTML = `
                <div class="boxes">
                <div class="users">
                <div class="user">
                <img src="${item.userimage}" alt="${item.username}">
                <h1>${item.username}</h1>
                </div>
                <div class="interaction-icons">
                <button onclick="deleteLike(${index})">Delete</i></button>     
                    </div>
                </div>
                <a style="cursor: pointer" onclick="showPostDetails(${item.id})">${item.name}</a>
                <img class="postImg" src="${item.media}" alt="${item.name}">
                </div>
            `
        likes.appendChild(box);
    })
}


getPosts()



function getPost() {

    const bookmark = JSON.parse(localStorage.getItem('bookmark')) || [];
    bookmarks.innerHTML = ''
    bookmark.map((item, index) => {
        const box = document.createElement('div');
        box.className = 'box col-12';
        box.innerHTML = `
                <div class="boxes">
                <div class="users">
                <div class="user">
                <img src="${item.userimage}" alt="${item.username}">
                <h1>${item.username}</h1>
                </div>
                <div class="interaction-icons">
                <button onclick="deleteBookmark(${index})">Delete</i></button>     
                    </div>
                </div>
                <a style="cursor: pointer" onclick="showPostDetails(${item.id})">${item.name}</a>
                <img class="postImg" src="${item.media}" alt="${item.name}">
                </div>
            `
        bookmarks.appendChild(box);
    })
}


getPost()

function deleteLike(index) {
    const like = JSON.parse(localStorage.getItem('like')) || [];
    like.splice(index, 1);
    localStorage.setItem('like', JSON.stringify(like));
    getPosts()
}

function deleteBookmark(index) {
    const bookmark = JSON.parse(localStorage.getItem('bookmark')) || [];
    bookmark.splice(index, 1);
    localStorage.setItem('bookmark', JSON.stringify(bookmark));
    getPost()
}




function displayLike() {
    likes.style.display = 'block';
    bookmarks.style.display = 'none';
}

function displayBookmark() {
    likes.style.display = 'none';
    bookmarks.style.display = 'block';
}