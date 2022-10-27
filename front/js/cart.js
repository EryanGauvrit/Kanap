console.log(localStorage);

let calculPrice;
let calculQuantity;
let totalPrice = 0;
let totalQuantity = 0;


fetch (`http://localhost:3000/api/products/`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){

                // Récupération des données du local Storage
                for( let i = 0; i < localStorage.length; i++){
                        let storageIdentity = localStorage.key(i);
                        storageIdentity = localStorage.getItem(storageIdentity);
                        let objItemSettings = JSON.parse(storageIdentity);

                        console.log(objItemSettings);
                
                        let id = objItemSettings.id;

                        // Récupération des données de l'api en fonction de l'ID du local storage
                        for(let info = 0; info < data.length; info++){ 
                                if (data[info]._id == objItemSettings.id){ // Vérification de l'existance ou non de l'id du local storage

                                        let productData = data[info];

                                        let article = document.createElement("article");
                                        document.querySelector("#cart__items").appendChild(article);
                                        article.classList.add("cart__item");
                                        article.dataset.id = id;
                                        article.dataset.color = objItemSettings.couleur;

                                        storageIdentity = "itemSettings" + article.dataset.id + article.dataset.color;

                                        let blockimage = document.createElement("div");
                                        article.appendChild(blockimage);
                                        blockimage.classList.add("cart__item__img");

                                        let image = document.createElement("img");
                                        blockimage.appendChild(image);
                                        image.src = productData.imageUrl;
                                        image.alt = productData.altTxt;

                                        let cartItem = document.createElement("div");
                                        article.appendChild(cartItem);
                                        cartItem.classList.add("cart__item__content");

                                        // Affichage du nom / couleur / prix des produits
                                        let cartDescritpion = document.createElement("div");
                                        cartItem.appendChild(cartDescritpion);
                                        cartDescritpion.classList.add("cart__item__content__description");

                                                let productName = document.createElement("h2");
                                                cartDescritpion.appendChild(productName);
                                                productName.textContent += productData.name;

                                                let optionColor = document.createElement("p");
                                                cartDescritpion.appendChild(optionColor);
                                                optionColor.textContent += objItemSettings.couleur;

                                                let productPrice = document.createElement("p");
                                                cartDescritpion.appendChild(productPrice);
                                                calculPrice = Number(productData.price) * Number(objItemSettings.quantité);
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
                                                        calculPrice = Number(productData.price) * Number(this.value);
                                                        productPrice.textContent =  calculPrice + ",00 €";

                                                        calculatePriceQuantity (storageIdentity, data);
                                                        
                                                }else {
                                                alert("Entrer une quantité entre 1 et 100.");
                                                this.value = "";
                                                }  
                                        }) 

                                        // Gestion de la suppression de produits dans le panier 
                                        productDelete.addEventListener('click', function(){
                                                console.log(article.dataset.id);
                                                console.log(objItemSettings);
                                                if (article.dataset.id == objItemSettings.id){                                                        
                                                        localStorage.removeItem(storageIdentity);
                                                        let domRemove = article.closest(".cart__item");
                                                        domRemove.remove();  
                                                        calculatePriceQuantity (storageIdentity, data);
                                                        localStorageIsEmpty();
                                                }else{
                                                        alert("Une erreur est survenue");
                                                }
                                                
                                        })          
                                        break;
                                }
                        }               
                }
                localStorageIsEmpty();
        })
        .catch(function (e){
                alert("ERREUR : " + e);
        })

// Fonction calcul prix total et articles total

function calculatePriceQuantity (storageIdentity, data){

        totalQuantity = 0;
        totalPrice = 0;

        for (let i = 0; i < localStorage.length; i++){

                storageIdentity = localStorage.key(i);
                storageIdentity = localStorage.getItem(storageIdentity);                
                let storage = JSON.parse(storageIdentity);
                totalQuantity +=  Number(storage.quantité); 
                document.getElementById("totalQuantity")
                .textContent = totalQuantity; 

                for(let info = 0; info < data.length; info++){ 
                        if (data[info]._id == storage.id){

                                calculPrice = Number(data[info].price) * Number(storage.quantité);
                                console.log(data[info].price);
                                console.log(info);
                                totalPrice += Number(calculPrice);
                                document.getElementById("totalPrice")
                                .textContent = totalPrice + ",00"; 
                                break;

                        } else if (info > 10000){
                                alert("Une erreur s'est produite ...");
                                break;
                        }
                }
        };
}

// Si le local storage est vide alors on affiche une quantité et un prix de 0
function localStorageIsEmpty(){
        
        if(localStorage.length <= 0){

                document.getElementById("totalQuantity")
                .textContent = 0; 

                document.getElementById("totalPrice")
                .textContent = 0 + ",00"; 
        }
}

// Gestion des données du formulaire

document.querySelector(".cart__order__form").addEventListener("submit", function (e){
        e.preventDefault();

        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let email = document.getElementById("email").value;

        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        let emailErrorMsg = document.getElementById("emailErrorMsg");
        let error;

        
        let majuscule = /[A-Z]/;
        let nombre = /[0-9]/;
        let emailVerification = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        // Champs prénom
        if (firstName.search(majuscule) != 0 || firstName.search(nombre) != -1 || firstName.length >= 15){
                error = firstNameErrorMsg
                error.textContent = "La première lettre dois être en MAJUSCULE et les suivantes en minuscule. 15 caractères maximum.";
                e.preventDefault();
        }else{
                error = firstNameErrorMsg
                error.textContent = "";
        }

        // Champs Nom
        if (lastName.search(majuscule) != 0 || lastName.search(nombre) != -1 || lastName.length >= 20){
                error = lastNameErrorMsg
                error.textContent = "La première lettre dois être en MAJUSCULE et les suivantes en minuscule. 20 caractères maximum.";
                e.preventDefault();
        }else{
                error = lastNameErrorMsg
                error.textContent = "";
        }

        // Champs Ville
        if (city.search(majuscule) != 0 || city.search(nombre) != -1 || city.length >= 30){
                error = cityErrorMsg
                error.textContent = "La première lettre dois être en MAJUSCULE et les suivantes en minuscule. 30 caractères maximum.";
                e.preventDefault();
        }else{
                error = cityErrorMsg
                error.textContent = "";
        }

        if(!emailVerification.test(email)){
                error = emailErrorMsg
                error.textContent = "Entrez une adresse email vailde.";
                e.preventDefault();
        }else{
                error = emailErrorMsg
                error.textContent = "";
        }

        // Validation de la commande
        if (firstNameErrorMsg.textContent == "" && lastNameErrorMsg.textContent == "" && cityErrorMsg.textContent == "" && emailErrorMsg.textContent == ""){

                let productId = [];

                for( let i = 0; i < localStorage.length; i++){
                        let storageIdentity = localStorage.key(i);
                        storageIdentity = localStorage.getItem(storageIdentity);
                        let objItemSettings = JSON.parse(storageIdentity);
                        objItemSettings.id = String(objItemSettings.id)
                        console.log(typeof(objItemSettings.id));
                        productId.push(objItemSettings.id);
                }

                let order = {
                        contact : {
                                firstName : firstName,
                                lastName : lastName,
                                address : address,
                                city : city,
                                email : email,
                        },

                        products : productId
                }

                // préparation de la requête
                request =  {
                        method: "POST",
                        headers: { "Content-Type": "application/json;charset=utf-8" },
                        body: JSON.stringify(order)                        
                };

                fetch("http://localhost:3000/api/products/order", request)
                        .then(function(response){
                                return response.json();
                        })
                        .then(function(data){

                                if (localStorage.length >= 0){
                                        localStorage.clear();

                                        document.location.href = "confirmation.html?orderId=" + data.orderId;
                                }else{
                                        alert("Le panier est vide.");                                
                                }            
                        })
                        .catch(function(e){
                                        alert ("Une erreur s'est produite : " + e);                                                      
                        })
        }
})






