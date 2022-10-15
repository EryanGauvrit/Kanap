// Récupération des données de l'API via son url
let idUrl = (new URL(document.location).searchParams).get("id");
let urlApi = 'http://localhost:3000/api/products/'+ idUrl;

fetch(urlApi)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // let idValid = false;        
        // for (info of data){
        //     // Recherche d'une correspondance entre l'ID de l'url et l'API
        //     if(idUrl == info._id){
        //         idValid = true;

        //         let img = `<img src="${info.imageUrl}" alt="${info.altTxt}">`;
        //         let name = info.name;
        //         let price = info.price;
        //         let description = info.description;

        //         document.querySelector(".item__img").innerHTML = img;
        //         document.querySelector("#title").innerHTML = name;
        //         document.querySelector("#price").innerHTML = price;
        //         document.querySelector("#description").innerHTML = description;

        //         for(color of info.colors){
        //             let colorOption = `<option value="${color}">${color}</option>`
        //             document.querySelector("#colors").innerHTML += colorOption; 
        //         }; 
        //         break;
        //     } else {
        //         idValid = false;
        //     }
        // }
        // // Traitement Erreur de recherche de l'article
        // if (idValid == false){
        //     document.querySelector("#title").innerHTML = "Erreur ! Nous n'avons pas trouver l'article recherché !";

        //     document.querySelector("p").innerHTML = `<a href="./index.html" style="text-decoration: none; color: black;">Retour sur la page d'acceuil</a>`;
        //     document.querySelector(".item__content__description").style.display = "none";
        //     document.querySelector(".item__content__settings").style.display = "none";
        //     document.querySelector(".item__content__addButton").style.display = "none";
            
        // }
        console.log(data);
    })
    .catch (function(e){
        document.querySelector("#title").innerHTML = 'Une erreur est survenue : ' + e;

        document.querySelector("p").innerHTML = `<a href="./index.html" style="text-decoration: none; color: black;">Retour sur la page d'acceuil</a>`;
            document.querySelector(".item__content__description").style.display = "none";
            document.querySelector(".item__content__settings").style.display = "none";
            document.querySelector(".item__content__addButton").style.display = "none";
    });
