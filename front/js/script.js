//création de constantes pour :
const baseUrl = "http://localhost:3000/api/";
const endPoint = 'products';
const url = baseUrl + endPoint; 
//tableaux pour les produits
fetch(url, {
  method : 'GET' 
})
.then(response => response.text())
.then(text => {
    const data = JSON.parse(text) // analyse le texte de la chaîne comme du JSON.
    let codeHTML =''
    // i++ = opérateur postfixé donc (i++)=0 et (i)= 1 
    for (let i = 0; i<data.length; i++) {
        const kanap = data[i];
        codeHTML += `
        <a href="./product.html?id=${kanap._id}">
            <article>
              <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
              <h3 class="productName">${kanap.name}</h3>
              <p class="productDescription">${kanap.description}</p>
            </article>
          </a> `
    }

    document.querySelector('#items').innerHTML=codeHTML
});