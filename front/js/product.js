 const pageUrl = document.location.href;
 const id = (pageUrl.split `id=`[1]);
 const baseUrl = "http://localhost:3000/api/";
 const endPoint = 'products';
 const url = baseUrl + endPoint + `/`+ id ;
 fetch(url)
.then(response => response.text())
.then(text => {
    const kanap = JSON.parse(text)
    document.querySelector('#title').innerHTML=kanap.name;
});