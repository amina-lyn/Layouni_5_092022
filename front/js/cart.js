// On récup le cart(panier) qui est dans localStorage pour le mettre dans une variable 'cart'
let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
let totalQuantity = 0;
let totalPrice = 0;

if (!cart || cart.length === 0){
  cart = []
}
// Foreach (tableaux) pour 'cart'(panier) + création du 'canap' en tant qu'"article" à mettre dans le 'cart'
cart.forEach((canap) => {

  //récupérer le prix du kanap
  const baseUrl = "http://localhost:3000/api/";
  const endPoint = 'products';
  const url = baseUrl + endPoint + `/`+ canap.product_id ;
  //La méthode fetch() renvoie une promesse (un objet de type Promise ) qui va se résoudre avec un objet "Response" . la promesse va être résolue dès que le serveur renvoie les en-têtes HTTP, c-à-d avant même qu'on ait le corps de la réponse. Mais ici pour on va placer la console.log(canap)à la suite pour que le retour de la promesse ne se fasse pas avant.
  fetch(url, {
     method : 'GET'
  })
 .then(response => response.text())
 .then(text => {
     const kanap = JSON.parse(text);
     console.log (kanap);
     canap.price = kanap.price
     console.log(canap);
     totalQuantity += canap.quantity;
     totalPrice += canap.quantity * canap.price;
    
     // le doc.querySelect retourne l'élément(=> cart__items) dans le doc qui correspond au selecteur.
     document.querySelector("#cart__items").innerHTML +=
       // Avec .innerHTML on récupère ou définit la syntaxe HTML qui décrit les descendants de l'élément (ex:${canap.imageUrl}...)
       `
       <article class="cart__item" data-id="${canap.product_id}" data-color="${canap.color}"> 
       <div class="cart__item__img">
         <img src="${canap.imageUrl}" alt="Photographie d'un canapé">
       </div>
       <div class="cart__item__content">
         <div class="cart__item__content__description">
           <h2>${canap.name}</h2>
           <p>${canap.color}</p>
           <p>${canap.price}€</p>
         </div>
         <div class="cart__item__content__settings">
           <div class="cart__item__content__settings__quantity">
             <p>Qté : </p>
             <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canap.quantity}" id="${canap.id}">
           </div>
           <div class="cart__item__content__settings__delete">
             <p class="deleteItem"
             onclick= "deleteItem('${canap.id}')"
             >Supprimer</p>
           </div>
         </div>
       </div>
     </article> 
    `;
    document.querySelector("#totalQuantity").innerHTML = totalQuantity;
    document.querySelector("#totalPrice").innerHTML = totalPrice;
    document.querySelectorAll(".itemQuantity").forEach((element) => {
      // // le addEventList = attache une fonction &/ou évenement à appeler = ex: ici dès qu'on change la qté d'un canap le total en bas est appelé à changé aussi.
      element.addEventListener("change", addQuantityToTotalPrice);
    });
 });
 
});
// Fonction pour supp un canap
function deleteItem(id) {
  // filtre : ne garde que ce qui rep à la cond ap la flèche /
  cart = cart.filter((canap) => canap.id !== id);
  console.log(cart);
  // Mise à jour du session storage au niveau de la clé 'cart' (localStorage = même valeur que 'cart' sur nav)
  localStorage.setItem("cart", JSON.stringify(cart));
  // après suppression de canap la page se recharge automatiquement avec mise à jour du panier
}

// fonction pour mise à jour du panier total à l'ajout d'un canap
function addQuantityToTotalPrice(event) {
  // event = évenement dans le DOM
  console.log(event);
  const canap = cart.find((product) => product.id === event.target.id); // ".find"= recherche page
  canap.quantity = parseInt(event.target.value);
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));

  // mise à jour du prix total
  totalQuantity = 0;
  totalPrice = 0;
  cart.forEach((canap) => {

    //récupérer le prix du kanap
    const baseUrl = "http://localhost:3000/api/";
    const endPoint = 'products';
    const url = baseUrl + endPoint + `/`+ canap.product_id ;
    //La méthode fetch() renvoie une promesse (un objet de type Promise ) qui va se résoudre avec un objet "Response" . la promesse va être résolue dès que le serveur renvoie les en-têtes HTTP, c-à-d avant même qu'on ait le corps de la réponse.
    fetch(url, {
       method : 'GET'
    })
   .then(response => response.text())
   .then(text => {
       const kanap = JSON.parse(text);
       canap.price = kanap.price
       totalQuantity += canap.quantity;
       totalPrice += canap.quantity * canap.price;
      document.querySelector("#totalQuantity").innerHTML = totalQuantity;
      document.querySelector("#totalPrice").innerHTML = totalPrice;

   });
   
  });
}

// ------------ ORDER ------------
//
const orderButton = document.querySelector("#order");
// évènement de 'click' sur le orderButton(commander)
orderButton.addEventListener("click", order);
//async function = fonction qui peut contenir un mot clé (ex:await.asyn) qui permet d'avoir un comportement asynchrone, basé sur une promesse.
async function order(e) {
  e.preventDefault(); // annule le comportement par default de l'évènement (le reload de la page)
  // gestion des erreurs
  let formError = false;
  console.log(cart)
  if (cart.length === 0) {
    alert('Le panier est vide')
    return -1;
  }

  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const address = document.querySelector("#address").value;
  const city = document.querySelector("#city").value;
  const email = document.querySelector("#email").value;
  //validation des champs du formulaire

  // le regex fonctionne si la chaine de carac contient des carac de A à Z et les caratères spéciaux
  const regexName =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  if (!regexName.test(firstName)) {
    document.querySelector("#firstNameErrorMsg").innerHTML =
      "veuillez renseigner un prénom";
      formError = true;
  }else{
    document.querySelector("#firstNameErrorMsg").innerHTML = "";
  }

  if (!regexName.test(lastName)) {
    document.querySelector("#lastNameErrorMsg").innerHTML =
      "veuillez renseigner un nom";
      formError = true;
  }else{
    document.querySelector("#lastNameErrorMsg").innerHTML = "";
  }

  if (!regexName.test(city)) {
    document.querySelector("#cityErrorMsg").innerHTML =
      "veuillez renseigner un nom de ville";
      formError = true;

  }else{
    document.querySelector("#cityErrorMsg").innerHTML = "";
  }

  const regexAddress = /^[a-zA-Z0-9\s,'-]*$/u;
  if (!regexAddress.test(address)) {
    document.querySelector("#addressErrorMsg").innerHTML =
      "veuillez renseigner une adresse";
      formError = true;
  }else{
    document.querySelector("#addressErrorMsg").innerHTML = "";
  }

  const regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!regexEmail.test(email)) {
    document.querySelector("#emailErrorMsg").innerHTML =
      "veuillez renseigner un email";
      formError = true;

  }else{
    document.querySelector("#emailErrorMsg").innerHTML = "";
  }

  if (formError === true) {
    return -1;
  }
  
  const contact = {
    // id    : name
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  };
  //La méthode fetch() renvoie une promesse (un objet de type Promise ) qui va se résoudre avec un objet "Response" . la promesse va être résolue dès que le serveur renvoie les en-têtes HTTP, c-à-d avant même qu'on ait le corps de la réponse.
  fetch("http://localhost:3000/api/products/order", {
    method: "POST", // envoi données au serveur
    headers: {
      //création de nos propres objects d'en-têtes(=ensemble de +sieurs clés) via 'headers'
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    //make sure to serialize your JSON body
    //JSON.stringify = convertit valeur JavaScript => chaîne JSON. Peut remplacer des valeurs ou spécifier les propriétés à inclure si un tableau de propriétés a été fourni.
    body: JSON.stringify({
      contact: contact,
      products: ["415b7cacb65d43b2b5c1ff70f3393ad1"],
    }),
  })
    .then((response) => {
      return response.json();
    })
    // affichage du n°de commande dans la fenêtre qui s'affiche
    .then((data) => {
      console.log(data);
      // effacer le cart dans localStorage
      localStorage.setItem("cart", "");
      // redirige vers la page de confirmation / écrivant Id de commande dans l'url
      window.location.href = "/front/html/confirmation.html?id=" + data.orderId;
    });
}