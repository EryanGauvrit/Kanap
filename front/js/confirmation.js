let orderNbr = (new URL(document.location).searchParams).get("orderId");

document.getElementById("orderId").textContent = orderNbr;
