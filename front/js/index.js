// Récupération des données de l'API via son url
let urlApi = 'http://localhost:3000/api/products';

fetch(urlApi)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        for(let info of data){

            let itemLink = document.createElement("a");
            document.querySelector(".items").appendChild(itemLink);
            itemLink.href = `./product.html?id=${info._id}`;

            let article = document.createElement("article");
            itemLink.appendChild(article);

            let image = document.createElement("img");
            article.appendChild(image);
            image.src = info.imageUrl;
            image.alt = info.altTxt;

            let itemTitle = document.createElement("h3");
            article.appendChild(itemTitle);
            itemTitle.classList.add("productName");
            itemTitle.innerText += info.name;

            let itemDescription = document.createElement("p");
            article.appendChild(itemDescription);
            itemDescription.classList.add("productDescription");
            itemDescription.innerText += info.description;

        }
                
    })
    .catch (function(e){
        alert('Une erreur est survenue : ' + e);
    });

