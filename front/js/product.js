const pageUrl = document.location.href;
 const id = (pageUrl.split `id=`[1]);
 const baseUrl = "http://localhost:3000/api/";
 const endPoint = 'products';
 const url = baseUrl + endPoint + `/`+ id ;
 let product = {};
 //La méthode fetch() renvoie une promesse (un objet de type Promise ) qui va se résoudre avec un objet "Response" . la promesse va être résolue dès que le serveur renvoie les en-têtes HTTP, c-à-d avant même qu'on ait le corps de la réponse.
 fetch(url, {
    method : 'GET'
 })
.then(response => response.text())
.then(text => {
    const kanap = JSON.parse(text);
    console.log (kanap);
    document.querySelector('#title').innerHTML=kanap.name;
    document.querySelector('#price').innerHTML=kanap.price;
    document.querySelector('#description').innerHTML=kanap.description;
    document.querySelector('.item__img').innerHTML=`<img src="${kanap.imageUrl}" alt="Photographie d'un canapé"></img>`;

    kanap.colors.forEach(color => {
        document.querySelector('#colors').innerHTML+=`<option value="${color}">${color}</option>`; 
    });
    product = kanap;
    document.querySelector('#addToCart').addEventListener('click',addProductToCart);
    
});
function addProductToCart(){
    if(document.querySelector('#colors').value ===""){
        alert("selectionnez une couleur")
        return -1
    }
    if(document.querySelector('#quantity').value <1){
        alert("selectionnez une quantité")
        return -1 //met fin à l'exécution d'une fonction et définit une valeur à renvoyer à la fonction appelante.
    }
    let cart = []
    if(localStorage.getItem('cart')){
        cart = JSON.parse (localStorage.getItem('cart'))
    }
    const sameProduct = cart.find(canap => canap.id === product._id + document.querySelector('#colors').value)
    if(sameProduct){
        sameProduct.quantity += parseInt(document.querySelector('#quantity').value) 
        // parseInt =  analyse une chaîne de caractère fournie  et renvoie un entier
        }else { 
            cart.push({
                product_id: product._id,
                id:product._id + document.querySelector('#colors').value,
                name: product.name,
                imageUrl: product.imageUrl,
                color: document.querySelector('#colors').value,
                quantity: parseInt(document.querySelector('#quantity').value),
            });
        }
    
    //JSON.stringify = convertit valeur JavaScript => chaîne JSON. Peut remplacer des valeurs ou spécifier les propriétés à inclure si un tableau de propriétés a été fourni.
    localStorage.setItem('cart',JSON.stringify(cart));
    // alert d'ajout d'un kanap
    alert(product.name + " a été ajouté dans le panier.")
    console.log(localStorage.getItem('cart'));

}