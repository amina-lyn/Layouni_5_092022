// Variables 'cart'
let cart = JSON.parse (sessionStorage.getItem('cart'));
console.log (cart);
// Foreach (tableaux) pour 'cart' (panier) + création du 'canap' en tant qu'"article" à mettre dans le 'cart'
cart.forEach(canap =>{ console.log(canap)
    // le doc.querySelect retourne le premier élément(=> cart__items) dans le doc qui correspond au selecteur. 
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
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canap.quantity}">
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
// Function pour supp un canap 
function deleteItem(id){
  // filtre si canap x2
    cart= cart.filter(canap => canap.id !== id) 
    console.log (cart)
    sessionStorage.setItem('cart', JSON.stringify(cart))
    // après suppression la page se recharge automatiquement
    document.location.reload()
}