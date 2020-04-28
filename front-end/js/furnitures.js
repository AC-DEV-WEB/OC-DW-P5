fetch(api)
.then(response => response.json())
.then(response => {
  // on transfome les données en objets JavaScript
  let furnitures = response;

  // on compte le nombre d'objets
  for (let i = 0; i < furnitures.length; i++) {
    // élément HTML qui va contenir la liste des slides du carousel
    let carouselIndicators = document.getElementById("carousel-indicators");
    
    // on créé une puce pour le carousel
    const carouselLi = document.createElement("li");

    carouselLi.setAttribute("data-target", "#main-carousel");
    carouselLi.setAttribute("data-slide", i);
    carouselLi.id = i;
    carouselIndicators.appendChild(carouselLi);
    
    // élément HTML qui va contenir les images du carousel
    let carouselInner = document.getElementById("carousel-inner");

    // on créé un objet pour le carousel
    const carouselItem = document.createElement("div");

    carouselItem.classList.add("carousel-item");
    
    // on créé l'image pour le carousel
    const carouselImg = document.createElement("img");
    carouselImg.classList.add("d-block");
    carouselImg.classList.add("img-fluid");
    carouselImg.src = furnitures[i].imageUrl;
    carouselImg.alt = furnitures[i].description;
    carouselItem.appendChild(carouselImg);
    
    carouselInner.appendChild(carouselItem);

    // on active la puce et l'objet du carousel où id="0"
    if (i === 0) {
      carouselLi.classList.add("active");
      carouselItem.classList.add("active");
    }

    // élément HTML qui va contenir les cartes des produits
    let products = document.getElementById("products");

    // on créé un colonne
    const col = document.createElement("div");

    col.classList.add("col-md-4");
    col.classList.add("mb-4");

    // on créé une carte
    const card = document.createElement("div");

    card.classList.add("card");
    card.classList.add("h-100");
    col.appendChild(card);

    // on créé un le lien vers le produit
    const link =  document.createElement("a");

    link.href = "product.html?id=" + furnitures[i]._id;

    // image du produit
    const image = document.createElement("img");

    image.src = furnitures[i].imageUrl;
    image.alt = furnitures[i].description;
    image.classList.add("card-img-top");
    image.classList.add("products-img");
    link.appendChild(image);
    card.appendChild(link)

    // coprs du produit
    const cardBody = document.createElement("div");

    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    // nom du produit
    const name = document.createElement("h4");

    name.classList.add("card-title");
    name.textContent = furnitures[i].name;
    cardBody.appendChild(name);

    // prix du produit
    const price = document.createElement("h5");

    price.classList.add("card-price");
    price.textContent = furnitures[i].price + " €";
    cardBody.appendChild(price);

    // description du produit
    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = furnitures[i].description;
    cardBody.appendChild(description);

    // bouton du produit au pied de la carte
    const button = document.createElement("button");

    button.classList.add("btn");
    button.classList.add("btn-action");

    // on créé le lien du bouton
    const linkButton =  document.createElement("a");

    linkButton.textContent = "Voir l'article";
    linkButton.href = "product.html?id=" + furnitures[i]._id;
    button.appendChild(linkButton);

    cardBody.appendChild(button);
    products.appendChild(col);
  }
})
  