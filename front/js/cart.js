console.log(localStorage);

for( let i = 0; i < localStorage.length; i++){
    let storageIdentity = localStorage.key(i);
    storageIdentity = localStorage.getItem(storageIdentity);
    let objItemSettings = JSON.parse(storageIdentity);
    console.log(objItemSettings);

    let id = objItemSettings.id;
    console.log(id);

    fetch (`http://localhost:3000/api/products/${id}`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);

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
                    productPrice.textContent += data.price + ",00 €";
            
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

                    let productDelete = document.createElement("div");
                    cartSettings.appendChild(productDelete);
                    productDelete.classList.add("cart__item__content__settings__delete");

                            let deleteItem = document.createElement("p");
                            productDelete.appendChild(deleteItem);
                            deleteItem.classList.add("deleteItem");
                            deleteItem.textContent = "Supprimer";

        })
        .catch(function (e){
            console.log("Il y a une erreur ..." + e);
        })

}





