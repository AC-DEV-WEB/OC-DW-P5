// on vérifie la compatibilité du navigateur avec le localStorage
if(typeof sessionStorage!='undefined') {
  // on vérifie si le localStorage n'est pas vide
  if (window.localStorage.getItem("products") !== null) {
    // on récupère les données des produits sélectionnés par l'utilisateur depuis le localStorage
    let storageProducts = JSON.parse(localStorage.getItem("products"));
    console.log("storageProducts", storageProducts);
    
    // on défini sur quel élément HTML on va opérer
    let show = document.getElementById("product-cart");

    const resume = document.createElement("p");
    resume.textContent = ("Résumé de votre commande :");
    show.appendChild(resume);

    // on crée de façon dynamique les élements HTML en fonction du nombre de produits
    for (let i = 0; i < storageProducts.length; i++) {
      // image
      const image = document.createElement("img");
      image.src = storageProducts[i].image;
      image.alt = storageProducts[i].description;
      image.classList.add("product-cart-img");
      show.appendChild(image);

      // nom
      const name = document.createElement("p");
      name.textContent = "Article : " + storageProducts[i].name;
      name.classList.add("product-cart-name");
      show.appendChild(name);

      // vernis
      const varnish = document.createElement("p");
      varnish.textContent = "Vernis : " + storageProducts[i].varnish;
      varnish.classList.add("product-cart-varnish");
      show.appendChild(varnish);

      // quantité
      const quantity = document.createElement("p");
      quantity.textContent = "Quantité : " + storageProducts[i].quantity;
      quantity.classList.add("product-cart-quantity")
      show.appendChild(quantity);

      getTotal = storageProducts[i].price*storageProducts[i].quantity;
    }

    // prix total
    const total = document.createElement("p");
    total.textContent = "Total : " + getTotal + " €";
    total.classList.add("product-cart-total");
    show.appendChild(total);

    const resetButton = document.createElement("button");
    resetButton.textContent = "Vider le panier";
    resetButton.id = "resetCart";
    show.appendChild(resetButton);

    // on vide le panier
    document.getElementById("resetCart").onclick = function() {
      window.localStorage.clear()
      location.reload()
    };
  } else {
    alert("⚠️ Votre panier est vide !");
  }
} else {
  alert("⚠️ Navigateur non supporté !");
}