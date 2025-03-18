document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".gallery img");
    const mainImage = document.createElement("img");
    mainImage.src = images[0].src;
    mainImage.style.width = "100%";
    document.querySelector(".gallery").prepend(mainImage);

    images.forEach(img => {
        img.addEventListener("click", function () {
            mainImage.src = this.src;
        });
    });

    document.getElementById("addToCart").addEventListener("click", function () {
        alert("Producto agregado al carrito.");
    });
});
