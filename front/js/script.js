const baseUrl = "http://localhost:3000/api/"
const endPoint = 'products'
const url = baseUrl + endPoint
fetch(url)
.then(response => response.text())
.then(text => {
    const data = JSON.parse(text)
    let codeHTML =''
    for (let i = 0; i<data.length; i++) {
        const kanap = data[i]
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