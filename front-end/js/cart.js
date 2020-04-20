// variable pour affecter l'objet XMLHttpRequest
let request = new XMLHttpRequest()

// ouvre une nouvelle connexion en utilisant la méthode GET
request.open('GET', api + $_GET('id'))

if ($_GET('id') == null) {
  alert("Votre panier est vide !");
  window.location = "index.html";
} else {
  // on récupère le vernis contenue dans l'URL et on décrypte la valeur du vernis envoyé
  const decryptedVarnish = decipher('hash@key!varnish$');
  let productVarnish = decryptedVarnish($_GET('varnish'));

  // charge les données de notre JSON récupéré
  request.onload = function () {
    // on transfome les données en objets JavaScript
    let furniture = JSON.parse(this.response);

    // on défini sur quel élément HTML on va opérer
    let show = document.getElementById("product-cart");

    const resume = document.createElement("p");
    resume.textContent = ("Résumé de votre commande :");
    show.appendChild(resume);

    // image du produit
    const image = document.createElement("img");
    image.src = furniture.imageUrl;
    image.alt = furniture.description;
    image.classList.add("product-cart-img");
    show.appendChild(image);

    // nom du produit
    const name = document.createElement("p");
    name.textContent = "Article : " + furniture.name;
    name.classList.add("product-cart-name");
    show.appendChild(name);

    // vernis
    const varnish = document.createElement("p");
    varnish.textContent = "Vernis : " + productVarnish;
    varnish.classList.add("product-cart-varnish");
    show.appendChild(varnish);

    // quantité
    const quantity = document.createElement("p");
    quantity.textContent = "Quantité : ";
    quantity.classList.add("product-cart-quantity")
    show.appendChild(quantity);

    // prix du produit
    const price = document.createElement("p");
    price.textContent = "Total : " + furniture.price + " €";
    price.classList.add("product-cart-price");
    show.appendChild(price);
  }

  // on envoie la requête
  request.send();
}
