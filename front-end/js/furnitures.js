// variable pour affecter l'objet XMLHttpRequest
let request = new XMLHttpRequest()

// ouvre une nouvelle connexion en utilisant la méthode GET
request.open('GET', 'http://localhost:3000/api/furniture', true)

// charge les données de notre JSON récupéré
request.onload = function () {

  // on transfome les données en objets JavaScript
  let furnitures = JSON.parse(this.response);

  // on compte le nombre d'objets
  for (let i = 0; i < furnitures.length; i++) {
    // on défini sur quel élément HTML on va opérer
    let show = document.getElementById("products");

    // noms des produits
    const name = document.createElement("p");
    name.textContent = furnitures[i].name;
    name.classList.add("products-name");

    // prix des produits
    const price = document.createElement("p");
    price.textContent = "Prix : " + furnitures[i].price + " €";
    price.classList.add("products-price");

    // images des produits
    const image = document.createElement("img");
    image.src = furnitures[i].imageUrl;
    image.alt = furnitures[i].description;
    image.classList.add("products-img");

    // boutons des produits
    const button = document.createElement("button");
    const link =  document.createElement("a");
    link.textContent = "Voir l'article";
    link.href = "./product.html?id=" + furnitures[i]._id;
    button.appendChild(image);
    button.appendChild(name);
    button.appendChild(price);
    button.appendChild(link);
    button.classList.add("products-content");
    show.appendChild(button);
  }
}

// on envoie la requête
request.send()