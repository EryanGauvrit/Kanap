console.log(localStorage);

let calculPrice;
let totalPrice = 0;
let totalQuantity = 0;

for( let i = 0; i < localStorage.length; i++){
    let storageIdentity = localStorage.key(i);
    storageIdentity = localStorage.getItem(storageIdentity);
    let objItemSettings = JSON.parse(storageIdentity);

    let id = objItemSettings.id;

    fetch (`http://localhost:3000/api/products/${id}`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){

            let article = document.createElement("article");
            document.querySelector("#cart__items").appendChild(article);
            article.classList.add("cart__item");
            article.dataset.id = "{product-ID}";
            article.dataset.color = "{product-color}";

                    let blockimage = document.createElement("div");
                    article.appendChild(blockimage);
                    blockimage.classList.add("cart__item__img");

                    let image = document.createElement("img");
                    blockimage.appendChild(image);
                    image.src = data.imageUrl;
                    image.alt = data.altTxt;

            let cartItem = document.createElement("div");
            article.appendChild(cartItem);
            cartItem.classList.add("cart__item__content");

            // Affichage du nom / couleur / prix des produits
            let cartDescritpion = document.createElement("div");
            cartItem.appendChild(cartDescritpion);
            cartDescritpion.classList.add("cart__item__content__description");

                    let productName = document.createElement("h2");
                    cartDescritpion.appendChild(productName);
                    productName.textContent += data.name;

                    let optionColor = document.createElement("p");
                    cartDescritpion.appendChild(optionColor);
                    optionColor.textContent += objItemSettings.couleur;

                    let productPrice = document.createElement("p");
                    cartDescritpion.appendChild(productPrice);
                    calculPrice = Number(data.price) * Number(objItemSettings.quantité);
                    totalPrice += Number(calculPrice);
                    productPrice.textContent +=  calculPrice + ",00 €";
            
            // Affichage de la quantité / le système de suppression

            let cartSettings = document.createElement("div");
            cartItem.appendChild(cartSettings);
            cartSettings.classList.add("cart__item__content__settings");

                    let productQuantity = document.createElement("div");
                    cartSettings.appendChild(productQuantity);
                    productQuantity.classList.add("cart__item__content__settings__quantity");

                            let showQuantity = document.createElement("p");
                            productQuantity.appendChild(showQuantity);
                            showQuantity.textContent += "Qté : ";

                            let inputQuantity = document.createElement("input");
                            productQuantity.appendChild(inputQuantity);
                            inputQuantity.type = "number";
                            inputQuantity.classList.add("itemQuantity");
                            inputQuantity.name = "itemQuantity";
                            inputQuantity.min = "1";
                            inputQuantity.max = "100";
                            inputQuantity.value = objItemSettings.quantité;
                            totalQuantity += Number(objItemSettings.quantité);

                    let productDelete = document.createElement("div");
                    cartSettings.appendChild(productDelete);
                    productDelete.classList.add("cart__item__content__settings__delete");

                            let deleteItem = document.createElement("p");
                            productDelete.appendChild(deleteItem);
                            deleteItem.classList.add("deleteItem");
                            deleteItem.textContent = "Supprimer";

                document.getElementById("totalQuantity")
                        .textContent = totalQuantity; 
                document.getElementById("totalPrice")
                        .textContent = totalPrice + ",00"; 


            // Gestion de la modification de la quantité
            inputQuantity.addEventListener('change', function (){

                if (this.value >= 1 && this.value <= 100 ){
                        objItemSettings.quantité = this.value;
                        console.log(objItemSettings.quantité);
                        objItemSettings = JSON.stringify(objItemSettings);
                        localStorage.setItem(localStorage.key(i), objItemSettings);
                        objItemSettings = JSON.parse(objItemSettings);
                        console.log(objItemSettings);
                        calculPrice = Number(data.price) * Number(this.value);
                        totalPrice += Number(calculPrice);

                        productPrice.textContent =  calculPrice + ",00 €";
                        document.getElementById("totalQuantity")
                                .textContent = totalQuantity; 
                        document.getElementById("totalPrice")
                                .textContent = totalPrice + ",00"; 
                        
                }else {
                alert("Entrer une quantité entre 1 et 100.");
                this.value = "";
                }           
            })        

            // Gestion de la suppression de produits dans le panier 
            productDelete.addEventListener('click', function(){
                objItemSettings = JSON.stringify(objItemSettings);
                localStorage.removeItem(localStorage.key(i), objItemSettings);
                objItemSettings = JSON.parse(objItemSettings);
                console.log(localStorage.length);
                location.reload();
            })
        })
        .catch(function (e){
            alert("ERREUR : " + e);
        })

}


// Gestion des données du formulaire













