// on récupère les données du produit sélectionné par l'utilisateur depuis le stockage de son navigateur
let data_json = sessionStorage.getItem("productData");
let data = JSON.parse(data_json);

console.log(data);