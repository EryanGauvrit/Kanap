// Récupération des données de l'API via son url
let idUrl = (new URL(document.location).searchParams).get("id");
let urlApi = `http://localhost:3000/api/products/${idUrl}`;

fetch(urlApi)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // Ajout des bonnes données dans le DOM
        let productImage = document.createElement("img");
            document.querySelector(".item__img").appendChild(productImage);
            productImage.src = data.imageUrl;
            productImage.alt = data.altTxt;

        let productName = document.createElement("h1");
            document.querySelector(".item__content__titlePrice").appendChild(productName);
            productName.id = "title";
            productName.textContent += data.name;

        let productPrice = document.getElementById("price");
            productPrice.textContent += data.price;

        let productDescription = document.getElementById("description");
            productDescription.textContent += data.description;
            
        for (color of data.colors){
            let productColor = document.createElement("option"); 
                document.querySelector("#colors").appendChild(productColor);
                productColor.textContent += color;
                productColor.setAttribute("value", color);
        };
        
    })
    .catch (function(e){
        console.log("Une erreur est survenue"+ e);
        document.querySelector("#title").textContent = 'Une erreur est survenue : ' + e;

        let linkBack =  document.createElement("a");  
        document.querySelector(".item__content__titlePrice").appendChild(linkBack);
        linkBack.href = `./index.html`;
        linkBack.textContent = "Retour sur la page d'acceuil";
        linkBack.style.textDecoration = "none";
        linkBack.style.color = "black";
        linkBack.style.fontWeight = "700px";
        
        document.querySelector("#title").style.fontSize = "25px";
        document.querySelector("#title").style.marginBottom = "15px";
        document.querySelector("p").style.display = "none";
        document.querySelector(".item__content__description").style.display = "none";
        document.querySelector(".item__content__settings").style.display = "none";
        document.querySelector(".item__content__addButton").style.display = "none";
        
    });

// Enregistrement des données sur le localStorage

let color;
let quantity;

function itemSettings (){
    color = document.querySelector("#colors");
    quantity = document.querySelector("#quantity");
    let errorNbr =  "Vous dépassez la somme autorisés d'un même type d'articles dans votre panier.";
    let storageIdentity = "itemSettings" + idUrl + color.value;

    let objItemSettings = {
        id : idUrl,
        couleur : color.value,
        quantité : quantity.value,
    };

    

    if (localStorage[storageIdentity] && objItemSettings.quantité >= 1 && objItemSettings.quantité <= 100){

        objItemSettings = JSON.parse(localStorage[storageIdentity]);
        objItemSettings.quantité = Number(objItemSettings.quantité) + Number(quantity.value);

        if(objItemSettings.quantité >= 1 && objItemSettings.quantité <= 100){
            objItemSettings = JSON.stringify(objItemSettings);
            localStorage.setItem(storageIdentity, objItemSettings);

        }else {
            alert(errorNbr);
        }
        
    }else if (objItemSettings.quantité >= 1 && objItemSettings.quantité <= 100 && objItemSettings.couleur){
        objItemSettings = JSON.stringify(objItemSettings);
        localStorage.setItem(storageIdentity, objItemSettings);
    }else {
        alert("Choisir une couleur existante et entrer une quantité entre 1 et 100.");
    }
    
    console.log(localStorage);
};

document.querySelector("#addToCart").addEventListener("click", itemSettings);