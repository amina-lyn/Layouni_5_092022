 const pageUrl = document.location.href;
 const id = (pageUrl.split `id=`[1]);
 const baseUrl = "http://localhost:3000/api/";
 const endPoint = 'products';
 const url = baseUrl + endPoint + `/`+ id ;
 let product = {};
 fetch(url)
.then(response => response.text())
.then(text => {
    const kanap = JSON.parse(text);
    console.log (kanap);
    document.querySelector('#title').innerHTML=kanap.name;
    document.querySelector('#price').innerHTML=kanap.price;
    document.querySelector('#description').innerHTML=kanap.description;
    kanap.colors.forEach(color => {
        document.querySelector('#colors').innerHTML+='<option value="'+color+'">'+color+'</option>';
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
        return -1
    }
    let cart = []
    if(sessionStorage.getItem('cart')){
        cart = JSON.parse (sessionStorage.getItem('cart'))
    }
    const sameProduct = cart.find(canap => canap.id === product._id + document.querySelector('#colors').value)
    if(sameProduct){
        sameProduct.quantity += parseInt(document.querySelector('#quantity').value)
        }else { 
            cart.push({
                product_id: product._id,
                id:product._id + document.querySelector('#colors').value,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                color: document.querySelector('#colors').value,
                quantity: parseInt(document.querySelector('#quantity').value),
            });
        }
   
    sessionStorage.setItem('cart',JSON.stringify(cart));
    console.log(sessionStorage.getItem('cart'));

}
