const productPopular = document.getElementById('popular-container')
const productPost = document.getElementById('posts-container')

// Popular Posts

async function getProducts() {
    const res = await axios.get('http://localhost:5500/assets/json/db.json')
    const data = res.data.posts
    db = data
    db.map(item => {
        const box = document.createElement('div')
        box.className = 'box col-12 col-sm-4 col-lg-3'
        box.innerHTML = `
        <a href="" class="boxes">
    <img src="${item.image}" alt="">
    <p>${item.description}</p>
    <div class="users">
    <img src="${item.userimage}" alt="">
    <h1>${item.username}</h1>
</div>
</a>
        `
        productPopular.appendChild(box)
    })
}
getProducts()


// Posts 


async function getPosts() {
    const res = await axios.get('http://localhost:5500/assets/json/db.json')
    const data = res.data.post
    db = data
    db.map(item => {
        const box = document.createElement('div')
        box.className = 'box col-12'
        box.innerHTML = `
        <div href="" class="boxes">
        <div class="users">
        <img src="${item.userimage}" alt="">
        <h1>${item.username}</h1>
        </div>
        <p>${item.description}</p>
    <img class="postImg" src="${item.image}" alt="">
</div>
        `
        productPost.appendChild(box)
    })
}
getPosts()