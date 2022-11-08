// On récup le cart qui est dans sessionStorage pour le mettre dans une variable 'cart'
let cart = JSON.parse (sessionStorage.getItem('cart'));
console.log (cart);
let totalQuantity = 0;
let totalPrice = 0;

// Foreach (tableaux) pour 'cart' (panier) + création du 'canap' en tant qu'"article" à mettre dans le 'cart'
cart.forEach(canap =>{ console.log(canap);
  totalQuantity += canap.quantity;
  totalPrice += canap.quantity * canap.price;
 
    // le doc.querySelect retourne l'élément(=> cart__items) dans le doc qui correspond au selecteur. 
    document.querySelector('#cart__items').innerHTML+=
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
`}
);
document.querySelector ('#totalQuantity').innerHTML = totalQuantity;
document.querySelector ('#totalPrice').innerHTML = totalPrice;
document.querySelectorAll ('.itemQuantity').forEach(element => {
  element.addEventListener('change',addQuantityToTotalPrice)
})
// Function pour supp un canap 
function deleteItem(id){
  // filtre : ne garde que ce qui rep à la cond ap la flèche / 
    cart= cart.filter(canap => canap.id !== id) 
    console.log (cart)
    // Mise à jour du session storage au niveau de la clé 'cart' (sessionStorage = même valeur que 'cart' sur nav)
    sessionStorage.setItem('cart', JSON.stringify(cart))
    // après suppression de canap la page se recharge automatiquement avec mise à jour du panier
    document.location.reload()
}
//--------- Si on ajoute +1 canap à la 'canap.quantity' , alors mise à jour du totalPrice & totalQuantity ---------

// fonction pour mise à jour du panier total à l'ajout d'un canap

function addQuantityToTotalPrice(event){
  console.log (event)
  const canap = cart.find(product => product.id === event.target.id);
  canap.quantity =parseInt(event.target.value); 
  console.log (cart) 
  sessionStorage.setItem('cart', JSON.stringify(cart))
  document.location.reload()

}

// ------------ ORDER ------------ 
//
const orderButton = document.querySelector('#order');
orderButton.addEventListener('click', order);
async function order(e) {
  e.preventDefault()
const firstName = document.querySelector('#firstName').value;
const lastName = document.querySelector('#lastName').value;
const address = document.querySelector('#address').value;
const city = document.querySelector('#city').value;
const email = document.querySelector('#email').value;
const contact = {
  firstName:firstName,
  lastName:lastName,
  address:address,
  city:city,
  email:email,
}

fetch("http://localhost:3000/api/products/order", {
  method: "post",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  //make sure to serialize your JSON body
  body:JSON.stringify({contact:contact,
    products:["415b7cacb65d43b2b5c1ff70f3393ad1"]})
})
.then(response=> {
  return response.json()
})
// affichage du n°de commande dans la fenêtre qui s'affiche 
.then (data => {
  console.log (data) 
  // redirige vers la page de confirmation / écrivant Id de commande dans l'url
  window.location.href = "/front/html/confirmation.html?id="+data.orderId;
})
}