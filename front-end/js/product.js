// variable pour affecter l'objet XMLHttpRequest
let request = new XMLHttpRequest()

// on récupère l'ID de l'URL
let url = window.location.href;
let productID = url.substring(url.lastIndexOf('=') + 1);

// ouvre une nouvelle connexion en utilisant la méthode GET
request.open('GET', 'http://localhost:3000/api/furniture/' + productID)

// charge les données de notre JSON récupéré
request.onload = function () {
   // on transfome les données en objets JavaScript
  let furniture = JSON.parse(this.response);

  // on défini sur quel élément HTML on va opérer
  let show = document.getElementById("product");
  
  const image = document.createElement("img");
  image.src = furniture.imageUrl;
  image.alt = furniture.description;
  image.classList.add("product-img");
  show.appendChild(image);
  
  // on créé un élément "div" pour stocker les informations du produit
  const content = document.createElement("div");
  content.classList.add("product-content");
  show.appendChild(content);

  // nom du produit
  const name = document.createElement("p");
  name.textContent = furniture.name;
  name.classList.add("product-name");
  content.appendChild(name);

  // prix du produit
  const price = document.createElement("p");
  price.textContent = price.textContent = "Prix : " + furniture.price + " €";
  price.classList.add("product-price");
  content.appendChild(price);

  // on créé un élément "div" pour le choix de la personnalisation du produit
  const custom = document.createElement("div");
  custom.classList.add("product-custom");
  content.appendChild(custom);

  // on créé un sélecteur pour le choix de la personnalisation du produit
  const label = document.createElement("label");
  label.setAttribute("for", "varnish");
  label.textContent = "Vernis :";

  const select = document.createElement("select");
  select.id = "varnish";

  let choose = document.createElement("option");
  choose.text = "Choisir un vernis";
  select.add(choose, select.choose);

  let options = furniture.varnish;
  options.forEach(function(element, key) {
    for (let i = 0; i < options.length; i++) {
      if (element == options[i]) {
        select[select.options.length] = new Option(element, select.options.length, false, false);
      }
    }              
  });

  custom.appendChild(label);
  const br = document.createElement("br");
  custom.appendChild(br);
  custom.appendChild(select);

  // on ajoute la description du produit
  const description = document.createElement("p");
  description.textContent = furniture.description;
  custom.appendChild(description);

  // on créé le bouton "Ajouter au panier"
  const button = document.createElement("button");

  // on crée le lien de la redirection au clic du bouton
  const link =  document.createElement("a");
  
  // on récupère le choix de l'utilisateur au changement d'état du sélecteur
  document.getElementById("varnish").onchange = function() {
    let getVarnish = document.getElementById("varnish")
    let choice = getVarnish.options[getVarnish.selectedIndex].text

    // on met à jour le bouton "Ajouter au panier" en fonction du choix de l'utilisateur
    if (choice != choose.text) {
      link.textContent = "Ajouter au panier";
      link.href = "./cart.html?id=" + furniture._id;
      button.appendChild(link);
      content.appendChild(button);
    } else {
      content.removeChild(button);
    }
    
    console.log(choice);
  };  
}

// on envoie la requête
request.send();