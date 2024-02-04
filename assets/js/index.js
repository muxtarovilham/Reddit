const productPopular = document.getElementById('popular-container');
const productPost = document.getElementById('posts-container');


// Popular Posts
async function getProducts() {
    try {
        const res = await axios.get('http://localhost:5500/assets/json/db.json');
        const data = res.data.posts; // "data" ekledim
        db = data;
        db.map(item => {
            const box = document.createElement('div');
            box.className = 'box col-12 col-sm-4 col-lg-3';
            box.innerHTML = `
                <a href="" class="boxes">
                    <img src="${item.image}" alt="${item.description}"> <!-- "alt" ekledim -->
                    <p>${item.description}</p>
                    <div class="users">
                        <img src="${item.userimage}" alt="${item.username}"> <!-- "alt" ekledim -->
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

async function getPosts() {
    try {
        const res = await axios.get('http://localhost:5500/assets/json/db.json');
        const data = res.data.post;
        db = data;

        db.map(item => {
            const box = document.createElement('div');
            box.className = 'box col-12';
            box.innerHTML = `
                <div href="" class="boxes">
                    <div class="users">
                        <img src="${item.userimage}" alt="${item.username}">
                        <h1>${item.username}</h1>
                    </div>
                    <p>${item.description}</p>
                    <img class="postImg" src="${item.media}" alt="${item.description}">
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

// Function to check if the user is logged in (dummy implementation)
function isLoggedIn() {
    // Replace this with your actual authentication logic
    // For example, you might check if there's a user session or a token
    // If the user is logged in, return true; otherwise, return false
    return false; // Placeholder, replace with actual authentication check
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



getPosts();




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
