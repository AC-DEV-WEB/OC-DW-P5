// on récupère les données de la commande
let order = JSON.parse(window.sessionStorage.getItem("order"));

// on remercie l'utilisateur pour sa commande
if (order !== null) {
  // on affiche le numéro de commande
  let orderId = document.getElementById("order-id");
  orderId.textContent = order.order_id;
  
  // on affiche la date de la commande
  let date = document.getElementById("date");
  date.textContent = getDate() + " à " + getHour();

  // on affiche le prix total de la commande
  let totalPrice = document.getElementById("total-price");
  totalPrice.textContent = order.total + " €";

  // on efface le sessionStorage pour effectuer une nouvelle commande
  window.sessionStorage.clear();
} else {
  alert("⚠️ Aucune commande n'a été trouvée !");
  window.location = "index.html";
}