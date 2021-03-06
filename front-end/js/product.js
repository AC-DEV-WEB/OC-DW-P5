// on récupère les paramètres de l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

fetch(api + urlParams.get('id'))
.then(response => response.json())
.then(response => {
  // on transfome les données en objets JavaScript
  let furniture = response;

  // élément HTML qui va contenir le produit
  let product = document.getElementById("product");

  // image du produit
  const image = document.createElement("img");
  
  image.src = furniture.imageUrl;
  image.alt = furniture.description;
  image.classList.add("product-img");
  product.appendChild(image);
  
  // on créé un élément "div" pour stocker les informations du produit
  const content = document.createElement("div");

  content.id = "product-content";
  product.appendChild(content);

  // nom du produit
  const name = document.createElement("p");

  name.textContent = furniture.name;
  name.classList.add("product-name");
  content.appendChild(name);

  // prix du produit
  const price = document.createElement("p");

  price.textContent = "Prix : " + furniture.price + " €";
  price.classList.add("product-price");
  content.appendChild(price);

  // on créé un élément "div" pour le choix de la personnalisation du produit
  const custom = document.createElement("div");

  custom.classList.add("product-custom");
  content.appendChild(custom);

  // on créé un sélecteur pour le choix de la personnalisation du produit
  const varnishLabel = document.createElement("label");

  varnishLabel.setAttribute("for", "product-varnish");
  varnishLabel.textContent = "Vernis :";

  // on créé le sélecteur pour le choix du vernis
  const select = document.createElement("select");

  select.id = "product-varnish";

  // on ajoute une option pour indiquer qu'il faut faire un choix
  let choose = document.createElement("option");

  choose.text = "Choisir un vernis";
  select.add(choose, select.choose);

  // on ajoute les options de vernis disponible
  let options = furniture.varnish;

  options.forEach(function(element, key) {
    for (let i = 0; i < options.length; i++) {
      if (element == options[i]) {
        select[select.options.length] = new Option(element, select.options.length, false, false);
      }
    }          
  })

  // on ajoute un retour à la ligne
  const br = document.createElement("br");

  custom.appendChild(varnishLabel);
  custom.appendChild(select);
  custom.appendChild(br);

  // on créé un input de type number pour indiquer la quantité de produits
  const quantityLabel = document.createElement("label");

  quantityLabel.setAttribute("for", "product-varnish");
  quantityLabel.textContent = ("Quantité :");

  // on créé un input de type nombre pour la quantité de produit(s)
  const input = document.createElement("input");

  input.setAttribute("type", "number");
  input.setAttribute("min", "1");
  input.setAttribute("max", "10");
  input.value = "1";
  input.id = "product-input";
  custom.appendChild(quantityLabel);
  custom.appendChild(input);

  // on ajoute la description du produit
  const description = document.createElement("p");

  description.textContent = furniture.description;
  custom.appendChild(description);

  // on créé le bouton "Ajouter au panier"
  const button = document.createElement("button");

  button.classList.add("btn");
  button.id = "addToCart";

  // on crée le lien de la redirection au clic du bouton
  const link =  document.createElement("a");

  // on surveille le changement d'état du bouton du choix du vernis
  document.getElementById("product-content").onchange = function() {
    // on récupère le choix de l'utilisateur au changement d'état de l'input "Quantité"
    getQuantity = document.getElementById("product-input").value;

    // on récupère le choix de l'utilisateur au changement d'état du sélecteur
    let getChoice = document.getElementById("product-varnish");

    getVarnish = getChoice.options[getChoice.selectedIndex].text;

    // on met à jour le bouton "Ajouter au panier" en fonction du choix de l'utilisateur
    if (getVarnish != choose.text) {
      link.textContent = "Ajouter au panier";
      link.href = "./cart.html";
      button.appendChild(link);
      content.appendChild(button);

      // on stock les données des produits sélectionnés par l'utilisateur dans le localStorage
      document.getElementById("addToCart").onclick = function() {
        let storageProducts = JSON.parse(localStorage.getItem(furniture._id+':&:'+getVarnish) || "[]");
        let productData  = {
          id: furniture._id,
          image: furniture.imageUrl,
          description: furniture.description,
          name: furniture.name,
          price: furniture.price,
          quantity: getQuantity,
          varnish: getVarnish
        }
        
        // on contrôle si le produit existe déjà dans le localStorage
        if (window.localStorage.getItem(furniture._id+':&:'+getVarnish) == null) {
          storageProducts.push(productData);
          localStorage.setItem(furniture._id+':&:'+getVarnish, JSON.stringify(storageProducts));
        } else {
          if (!storageProducts.some(item => item.varnish === getVarnish)) {
            storageProducts.push(productData);
            localStorage.setItem(furniture._id+':&:'+getVarnish, JSON.stringify(storageProducts));
          }
        }
      }
    } else {
      // on retire le bouton d'ajout au panier s'il n'y a pas de vernis
      if (document.getElementById('addToCart')) {
        content.removeChild(button);
      }
    }
  }
})