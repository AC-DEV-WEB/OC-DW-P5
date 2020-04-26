// on vérifie la compatibilité du navigateur avec le localStorage
if (window.localStorage !== null) {
  // on défini sur quel élément HTML on va opérer
  let doShowAll = document.getElementById("product-cart");

  // tableau de produits
  let productsArray= []

  // on vérifie si le localStorage n'est pas vide
  if (window.localStorage.length > 0) {
    let storageKeys
    for (let y = 0; y < localStorage.length; y++) {
      // défini le nom de la clé d'itération
      storageKeys = localStorage.key(y);
      
      // on récupère les données des produits sélectionnés par l'utilisateur depuis le localStorage
      let storageProducts = JSON.parse(localStorage.getItem(storageKeys));
      
      // on crée de façon dynamique les élements HTML en fonction du nombre de produits
      for (let i = 0; i < storageProducts.length; i++) {
        // on créé un élément <tr> pour ajouter une ligne au tableau
        const tr = document.createElement("tr");
        
        // on créé un élément <td> pour ajouter une cellule au tableau
        const tdProduct = document.createElement("td");

        tdProduct.setAttribute("data-th", "Article :");

        // on créé une ligne
        const row = document.createElement("div");

        row.classList.add("row");

        // on créé une colonne pour l'image du produit
        const imgCol = document.createElement("div");

        imgCol.classList.add("rowcol-sm-2");
        imgCol.classList.add("hidden-xs");

        // image du produit
        const image = document.createElement("img");

        image.src = storageProducts[i].image;
        image.alt = storageProducts[i].description;
        image.classList.add("product-cart-img");
        imgCol.appendChild(image);

        // on créé une colonne pour la description du produit
        const descCol = document.createElement("div");

        descCol.classList.add("col-sm-10");

        // titre pour le nom du produit
        const name = document.createElement("h4");

        name.textContent = storageProducts[i].name;
        name.classList.add("nomargin");
        name.classList.add("product-cart-name");
        descCol.appendChild(name);

        // description du produit
        const description = document.createElement("p");

        description.textContent = storageProducts[i].description;
        description.classList.add("product-cart-desc");
        descCol.appendChild(description);

        // on créé un élément <td> pour ajouter une cellule au tableau
        const tdVarnish = document.createElement("td");

        tdVarnish.setAttribute("data-th", "Vernis :");
        tdVarnish.textContent = storageProducts[i].varnish;

        // on créé un élément <td> pour ajouter une cellule au tableau
        const tdQuantity = document.createElement("td");

        tdQuantity.setAttribute("data-th", "Quantité :");

        // on créé un élément <input> de tpye number pour la sélection de la quantité de produits
        const input = document.createElement("input");

        input.classList.add("form-control");
        input.classList.add("text-center");
        input.setAttribute("type", "number");
        input.setAttribute("min", "1");
        input.setAttribute("max", "10");
        input.value = storageProducts[i].quantity;
        input.setAttribute( "onchange", "javascript: updateQuantity(this);")
        tdQuantity.appendChild(input);

        // on créé un élément <td> pour ajouter une cellule au tableau
        const tdSubtotal = document.createElement("td");

        tdSubtotal.classList.add("text-center");
        tdSubtotal.setAttribute("data-th", "Total :");
        tdSubtotal.textContent = storageProducts[i].quantity*storageProducts[i].price + " €";

        // on créé un élément <td> pour ajouter une cellule au tableau
        const tdActions = document.createElement("td");

        tdActions.classList.add("actions");
        tdActions.setAttribute("data-th", "");

        // on rafraîchi la valeur de l'input du produit avec la nouvelle quantité
        let newQuantity
        var updateQuantity = function(quantityUpdate) {
          // on récupère le choix de l'utilisateur au changement d'état de l'input "Quantité"
          if (quantityUpdate.value !== quantityUpdate.defaultValue) {
            newQuantity = quantityUpdate.value;
          }
        }

        // on créé le bouton pour rafraîchir le produit
        const refreshButton = document.createElement("button");

        refreshButton.classList.add("btn");
        refreshButton.classList.add("btn-info");
        refreshButton.classList.add("btn-sm");
        refreshButton.classList.add("mr-1");
        refreshButton.value = storageProducts[i].id+':&:'+storageProducts[i].varnish;
        refreshButton.setAttribute( "onclick", "javascript: refreshProduct(this);")
        tdActions.appendChild(refreshButton);

        // on créé l'élément FontAwesome pour le bouton rafraîchir
        const refreshFA = document.createElement("i");

        refreshFA.classList.add("fa");
        refreshFA.classList.add("fa-refresh");
        refreshButton.appendChild(refreshFA);

        // on rafraîchi la page avec la nouvelle quantité
        var refreshProduct = function(refreshBtn) {
          let key = refreshBtn.value;
          let storageProduct = JSON.parse(localStorage.getItem(key));
          
          for (let x = 0; x < storageProduct.length; x++) {
            storageProduct[x].quantity = newQuantity;
          }

          if(typeof(newQuantity) === "string") {
            localStorage.setItem(key, JSON.stringify(storageProduct));
            window.location.reload();
          }
        }

        // on créé le bouton pour supprimer le produit
        const deleteButton = document.createElement("button");

        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-danger");
        deleteButton.classList.add("btn-sm");
        deleteButton.value = storageProducts[i].id+':&:'+storageProducts[i].varnish;
        deleteButton.setAttribute( "onclick", "javascript: eraseProduct(this);");
        tdActions.appendChild(deleteButton);

        // on créé l'élément FontAwesome pour le bouton supprimer
        const deleteFA = document.createElement("i");

        deleteFA.classList.add("fa");
        deleteFA.classList.add("fa-trash-o");
        deleteButton.appendChild(deleteFA);

        // on supprime la clé du produit du localStorage
        var eraseProduct = function(deleteBtn) {
          localStorage.removeItem(deleteBtn.value);
          window.location.reload();
        }

        // on ajoute les éléments au DOM
        row.appendChild(imgCol);
        row.appendChild(descCol);
        tdProduct.appendChild(row);
        tr.appendChild(tdProduct);
        tr.appendChild(tdVarnish);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdSubtotal);
        tr.appendChild(tdActions);
        doShowAll.appendChild(tr);
        
        // on récupère le prix total du panier
        getTotal += storageProducts[i].price*parseInt(storageProducts[i].quantity);

        // on stock les identifiants des produits du panier dans un tableau de produits
        productsArray.push(storageProducts[i].id);
      }
    }

    // prix total
    let totalPrice = document.getElementById("total");
    const total = document.createElement("strong");

    total.textContent = "Total : " + getTotal + " €";
    total.classList.add("product-cart-total");
    totalPrice.appendChild(total);

    // on créé le bouton pour vider le panier
    let eraseCart = document.getElementById("erase-cart");
    const resetButton = document.createElement("button");

    resetButton.textContent = "Vider le panier";
    resetButton.classList.add("btn");
    resetButton.id = "resetCart";
    eraseCart.appendChild(resetButton);

    // on vide le panier
    document.getElementById("resetCart").onclick = function() {
      window.localStorage.clear();
      window.location.reload();
    }

    // on vérifie si le formulaire qui contient le contrôle des expressions réguilères est bien rempli
    $(document).ready(function () {
      checkForm();
      $('#firstName, #lastName, #address, #city, #email').change(checkForm);
      
      // si tout est bon on peut faire la requête au serveur
      $("#submit").click(function() {
        if(order()) {
          // on vide le panier et on redirige l'utilisateur vers la page de confirmation de commande
          window.localStorage.clear();
          $("#modalForm").modal("toggle");
          window.location="order.html";
        } else {
          // on vide le panier et on redirige l'utilisateur sur la page d'accueil en cas d'erreur
          alert("⚠️ Une erreur est survenue lors de la validation de votre commande !");
          window.location.reload();
        }
      })
    })

    // contrôle le formulaire
    function checkForm() {
      if ($("#firstName").val().length > 2 &&
        $("#lastName").val().length > 2 &&
        $("#address").val().length > 8 &&
        $("#city").val().length > 2 &&
        $("#email").val().length > 6) {
        
        // on désactive le bouton de validation du formulaire
        $("#submit").prop("disabled", false);
      }
      else {
        // on active le bouton de validation du formulaire
        $("#submit").prop("disabled", true);
      }
    }

    // envoie la requête au serveur
    //
    // retourne true ou false
    function order() {
      if (productsArray.length > 0) {
        // on récupère les données du formulaire
        let firstName = $("#modalForm #firstName").val().trim();
        let lastName = $("#modalForm #lastName").val().trim();
        let address = $("#modalForm #address").val().trim();
        let city = $("#modalForm #city").val().trim();
        let email = $("#modalForm #email").val().trim();
        
        // on créé l'objet de contact
        let contact = {
          firstName: firstName,
          lastName: lastName,
          address: address,
          city: city,
          email: email
        }

        // on créé l'objet de la commande
        let data = {
          contact: contact, 
          products: productsArray
        }

        // on envoie au serveur l'objet de la commande via la méthode POST
        fetch(api + "order", {
          method: "POST",
          headers: new Headers({"Content-Type": "application/json"}),
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => save(response, getTotal));

        return true
      } else {
        return false
      }  
    }

    // sauvegarde l'order_id et le prix total de la commande 
    function save(response, total) {
      let order = {
        order_id: response.orderId,
        total: total
      }

      window.sessionStorage.setItem("order", JSON.stringify(order));
    }
  } else {
    alert("⚠️ Votre panier est vide !");
    window.location = "index.html";
  }
} else {
  alert("⚠️ Navigateur non supporté !");
  window.location = "index.html";
}