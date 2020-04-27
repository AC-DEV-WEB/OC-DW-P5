// déclaration des variables
let getTotal = 0 // prix total du panier
let getQuantity = 0 // quantité de produit(s) sélectionné(s) par l'utilisateur
let getVarnish // vernis du produit sélectionné par l'utilisateur

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
  )

  if ( param ) {
    return vars[param] ? vars[param] : null;	
  }

  return vars;
}

// renvoie la date du jour
function getDate() {
  // on défini les jours de la semaine
  let days = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
  
  // on défini les mois de l'année
  let month = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
  
  // on récupère la date
  let date = new Date();

  // on construit le message
  let message = days[date.getDay()] + " ";
  message += date.getDate() + " ";
  message += month[date.getMonth()] + " ";
  message += date.getFullYear();

  return message;
}

// renvoie l'heure actuelle
function getHour() {
  // on récupère la date
  let date = new Date();

  // on récupère l'heure
  let hours = date.getHours();

  // on récupère les minutes
  let minutes = date.getMinutes();

  if(minutes < 10) {
    minutes = "0" + minutes;
  }

  return hours + "H" + minutes;
}