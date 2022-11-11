// split pour récup OrderID pour l'inserer dans innerHTML pour avoir id de commande dans fenêtre de confirmation (aucun lien avec back-end).
// "split" = divise une châine de carac. en sous-chaîne 
const orderId= window.location.href.split("id=")[1];
document.querySelector ("#orderId").innerHTML = orderId;
