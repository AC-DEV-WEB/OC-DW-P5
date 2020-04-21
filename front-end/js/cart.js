// on vérifie la compatibilité du navigateur avec le localStorage
if(typeof sessionStorage!='undefined') {
  // on vérifie que le localStorage est bien vide
  if (window.localStorage.getItem('itemsArray') !== null) {
    // on récupère les données des produits sélectionnés par l'utilisateur depuis le stockage de son navigateur
    let items = JSON.parse(localStorage.getItem("itemsArray"));
    
    // on défini sur quel élément HTML on va opérer
    let show = document.getElementById("product-cart");

    const resume = document.createElement("p");
    resume.textContent = ("Résumé de votre commande :");
    show.appendChild(resume);

    // on crée de façon dynamique les élements HTML en fonction du nombre de produits
    for (i = 0; i < items.length; i++) {
      console.log(items[i].name);

      // image
      const image = document.createElement("img");
      image.src = items[i].image;
      image.alt = items[i].description;
      image.classList.add("product-cart-img");
      show.appendChild(image);

      // nom
      const name = document.createElement("p");
      name.textContent = "Article : " + items[i].name;
      name.classList.add("product-cart-name");
      show.appendChild(name);

      // vernis
      const varnish = document.createElement("p");
      varnish.textContent = "Vernis : " + items[i].varnish;
      varnish.classList.add("product-cart-varnish");
      show.appendChild(varnish);

      // quantité
      const quantity = document.createElement("p");
      quantity.textContent = "Quantité : " + items[i].quantity;
      quantity.classList.add("product-cart-quantity")
      show.appendChild(quantity);

      getTotal = items[i].price*items[i].quantity;
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