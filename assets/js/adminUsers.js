let menuicn = document.querySelector(".menuicn"); 
let nav = document.querySelector(".navcontainer"); 

menuicn.addEventListener("click", () => { 
	nav.classList.toggle("navclose"); 
})


const items = document.getElementById('items')

async function getPosts() {
    try {
        const res = await axios.get('https://655e356a9f1e1093c59ab81c.mockapi.io/Api3/Api3');
        console.log('Response:', res.data);
        const data = res.data;
        db = data;
        db.map(item => {
            const box = document.createElement('div');
            box.className = 'item1';
            box.innerHTML = `
                <h3 class="t-op-nextlvl">${item.username}</h3> 
                <h3 class="t-op-nextlvl">${item.firstname}</h3> 
                <h3 class="t-op-nextlvl">${item.email}</h3> 
                <button class="t-op-nextlvl label-tag" onclick="deletePost(${item.id})">Delete</button> 
            `;
            items.appendChild(box);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

getPosts();



// Comment length

async function getCommentCount() {
    try {
        const response = await axios.get('http://localhost:3000/comments');
        const commentCount = response.data.length;

        const commentsElement = document.getElementById('comments');
        commentsElement.textContent = `${commentCount}`;
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

getCommentCount();



// Post length

async function getPostCount() {
    try {
        const response = await axios.get('http://localhost:3000/otherPosts');
        const postCount = response.data.length;

        const postsElement = document.getElementById('posts');
        postsElement.textContent = `${postCount}`;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

getPostCount();



// Delete Post  

async function deletePost(postId) {
    try {
        const response = await axios.delete(`https://655e356a9f1e1093c59ab81c.mockapi.io/Api3/Api3/${postId}`);
        console.log('Response:', response.data);
        location.reload()
        
        alert(`Post with ID ${postId} succesfull deleted.`);
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}



// Users lenght 



async function getUserCount() {
    try {
        const response = await axios.get('https://655e356a9f1e1093c59ab81c.mockapi.io/Api3/Api3');
        const userCount = response.data.length;

        const usersElement = document.getElementById('users');
        usersElement.textContent = `${userCount}`;
    } catch (error) {
        console.error('Error fetching user count:', error);
    }
}

getUserCount();