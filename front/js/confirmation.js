let orderNbr = localStorage.getItem("orderNbr");

document.getElementById("orderId").textContent = orderNbr;

localStorage.clear();