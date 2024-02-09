document.addEventListener('DOMContentLoaded', () => {
    const productDetailsContainer = document.getElementById('productDetails');
    const productData = window.opener.productData;

    // Detayları göster
    productDetailsContainer.innerHTML = `
        <h2>${productData.name}</h2>
        <p>${productData.description}</p>
        <!-- Diğer detaylar buraya eklenebilir -->
    `;
});
