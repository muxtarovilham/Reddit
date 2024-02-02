const product = document.getElementById('posts-container')


async function getProducts() {
    const res = await axios.get('http://localhost:3000/posts')
    const data = res.data
    db = data
    db.map(item => {
        const box = document.createElement('div')
        box.className = 'box col-12 col-sm-4 col-lg-3'
        box.innerHTML = `
        <div class="boxes">
    <img src="${item.image}" alt="">
    <p>${item.description}</p>
</div>
        `
        product.appendChild(box)
    })
}
getProducts()