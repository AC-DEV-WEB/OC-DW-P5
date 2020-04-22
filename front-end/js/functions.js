// déclaration des variables
let getQuantity // quantité de produit(s) sélectionné(s) par l'utilisateur
let getVarnish // vernis du produit sélectionné par l'utilisateur
let getTotal // prix total du panier

// URL de l'API
const api = 'http://localhost:3000/api/furniture/';

// retourne les paramètres d’une URL 
function $_GET(param) {
  let vars = {};

  window.location.href.replace(location.hash, '').replace( 
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function( m, key, value ) { // callback
      vars[key] = value !== undefined ? value : '';
    }
  );

  if ( param ) {
    return vars[param] ? vars[param] : null;	
  }

  return vars;
}