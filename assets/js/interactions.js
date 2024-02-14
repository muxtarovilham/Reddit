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
    var commentsTable = document.getElementById("comments");
    
    // Tablonun görünürlüğünü toggle et
    if (likes.style.display === "none" || likes.style.display === "") {
        likes.style.display = "flex"; // "table" olarak ayarlanarak tablo görünür hale getirilir
    } else {
        likes.style.display = "none"; // Görünüyorsa gizle
    }
}

function displayBookmark() {
    var commentsTable = document.getElementById("comments");
    
    // Tablonun görünürlüğünü toggle et
    if (bookmarks.style.display === "none" || bookmarks.style.display === "") {
        bookmarks.style.display = "flex"; // "table" olarak ayarlanarak tablo görünür hale getirilir
    } else {
        bookmarks.style.display = "none"; // Görünüyorsa gizle
    }
}





var commentsTable = document.getElementById("comments");
var usernameeElement = document.getElementById("usernamee");

// Veriyi almak için fetch kullanıyoruz
fetch('http://localhost:3000/comments')
    .then(response => response.json())
    .then(data => {
        // data içinde döngü yaparak username'e sahip olanları bulup ekrana yazdırıyoruz
        data.forEach(comment => {
            if (comment.username) {
                // Kullanıcı adı ile eşleşen yorumları commentsTable içine ekliyoruz
                if (comment.username === usernameeElement.textContent) {
                    var row = commentsTable.insertRow();
                    var cell = row.insertCell(0);
                    cell.textContent = comment.text;

                    // Delete butonunu oluşturuyoruz
                    var deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete";
                    deleteButton.addEventListener("click", function() {
                        // Delete butonuna tıklandığında API'ye DELETE isteği gönderiyoruz
                        fetch(`http://localhost:3000/comments/${comment.id}`, {
                            method: 'DELETE',
                        })
                        .then(response => response.json())
                        .then(data => {
                            // Yorum başarıyla silindiğinde tablodan da kaldırıyoruz
                            commentsTable.deleteRow(row.rowIndex);
                        })
                        .catch(error => console.error('Hata:', error));
                    });

                    // Delete butonunu hücreye ekliyoruz
                    var cellDeleteButton = row.insertCell(1);
                    cellDeleteButton.appendChild(deleteButton);
                }
            }
        });
    })
    .catch(error => console.error('Hata:', error));



    function displayComment() {
        var commentsTable = document.getElementById("comments");
        
        // Tablonun görünürlüğünü toggle et
        if (commentsTable.style.display === "none" || commentsTable.style.display === "") {
            commentsTable.style.display = "table"; // "table" olarak ayarlanarak tablo görünür hale getirilir
        } else {
            commentsTable.style.display = "none"; // Görünüyorsa gizle
        }
    }