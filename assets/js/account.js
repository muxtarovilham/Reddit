const productPost = document.getElementById('posts-container');

async function getPosts() {
    try {
        const res = await axios.get('http://localhost:3000');
        const data = res.data.post;
        db = data;
        db.map(item => {
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


getPosts();



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




const searchForm = document.getElementById('Searchform');
const nameInput = document.getElementById('nameInput');



function formSearch() {
    productPost.innerHTML = ''
    axios.get('http://localhost:3000')
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






function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
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

function postComment(postId) {
    const commentInput = document.getElementById(`commentInput-${postId}`);
    const commentText = commentInput.value.trim();

    if (commentText !== "") {
        if (isLoggedIn()) {
            const comment = {
                postId: postId,
                text: commentText
            };

            db.find(item => item.id === postId).comments.push(comment);

            updateCommentsUI(postId);

            commentInput.value = "";
        } else {
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

// Popular


const community = document.getElementById('community');




async function getPopulars() {
    try {
        const res = await axios.get('http://localhost:3000');
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



document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the user data from localStorage
    let userData = JSON.parse(localStorage.getItem("user"));

    // Check if userData is not null or undefined and if it has at least one user
    if (userData && userData.length > 0) {
        // Assuming that the first item in the array is the user object
        let user = userData[0];

        // Access the "firstname" property from the user object
        let firstname = user.firstname;

        // Display the firstname in the paragraph element
        document.getElementById("usernamee").textContent = firstname;
    } else {
        // If userData is not available or doesn't have any users, handle it accordingly
        document.getElementById("usernamee").textContent = "Guest";
    }
});
