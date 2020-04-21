// variable pour affecter l'objet XMLHttpRequest
let request = new XMLHttpRequest()

// ouvre une nouvelle connexion en utilisant la méthode GET
request.open('GET', api + $_GET('id'))

request.onload = function () {
   // on transfome les données en objets JavaScript
  let furniture = JSON.parse(this.response);

  // on défini sur quel élément HTML on va opérer
  let show = document.getElementById("product");

  // image du produit
  const image = document.createElement("img");
  image.src = furniture.imageUrl;
  image.alt = furniture.description;
  image.classList.add("product-img");
  show.appendChild(image);
  
  // on créé un élément "div" pour stocker les informations du produit
  const content = document.createElement("div");
  content.id = "product-content";
  show.appendChild(content);

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

  const select = document.createElement("select");
  select.id = "product-varnish";

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

  custom.appendChild(varnishLabel);
  const br = document.createElement("br");
  custom.appendChild(br);
  custom.appendChild(select);
  custom.appendChild(br);

  // on créé un input de type number pour indiquer la quantité de produits
  const quantityLabel = document.createElement("label")
  quantityLabel.setAttribute("for", "product-varnish");
  quantityLabel.textContent = ("Quantité :");

  const input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("min", "1");
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
  button.id = "addToCart";

  // on crée le lien de la redirection au clic du bouton
  const link =  document.createElement("a");

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

      // on stock les données des produits sélectionnés par l'utilisateur dans le stockage de son navigateur
      document.getElementById("addToCart").onclick = function() {
        let oldItems = JSON.parse(localStorage.getItem("itemsArray") || "[]");
        let newItem  = {
          id: furniture._id,
          image: furniture.imageUrl,
          description: furniture.description,
          name: furniture.name,
          price: furniture.price,
          quantity: getQuantity,
          varnish: getVarnish
        };
    
        oldItems.push(newItem);
        let oldItems_json = JSON.stringify(oldItems);
        localStorage.setItem("itemsArray", oldItems_json);
      };
    } else {
      if (document.getElementById('addToCart')) {
        content.removeChild(button);
      }
    }
  };
}

// on envoie la requête
request.send();