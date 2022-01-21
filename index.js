const products = [
      {
        id: 0,
        name: 'MacBook Pro 2020',
        price : 1200,
        quantity:1,
      },
      
      {
        id : 1 ,
        name :'iphone 12 red ',
        price : 1000,
        quantity:1,
      },
      
      {
        id : 2,
        name : 'Galaxy',
        price : 1000 ,
        quantity:1,
      },
      
      {
        id: 3 ,
        name : 'pc portable Macbook 2020',
        price : 1200 ,
        quantity:1,
      
      },
      
      {
        id: 4,
        name : 'Iphone 12 pro ',
        price : 900,
        quantity:1,
      },
      
      {
        id: 5,
        name : 'galaxy s20',
        price : 700,
        quantity:1,
      },
      
      {
        id: 6,
        name: 'acer predator',
        price : 2000 ,
        quantity:1,
      },
      
      {
        id:7,
        name : 'Iphone 13',
        price : 1600,
        quantity:1,
      }
]

// Je déclare un panier vide
var panier = []
var productsDiv = document.getElementById('products')
// On prépare une variable qui va contenir l'html de toutes les cards
var htmlToInject = ""
// On boucle sur le tableau, et pour chaque object, on ajoute l'html d'une card
for (var i = 0; i < products.length; i++) {
    // J'extrait les props d'un objets en utilisant la déconstruction
    var { id, name, description, price, quantity } = products[i]
    // Je concatène à la variable l'html d'une card 
    htmlToInject += `<div class="card product">
            
            <div class="card-body">
                <div class="flex flex-space-between">
                    <h5 class="card-title">${name}</h5>
                    
                </div>
                <p class="card-text">${description}</p>
                <p>${price} euro</p>
                <div class="d-flex align-items-center justify-content-between">
                    <button id="${id}" onclick="addToCart(${id})" class="btn btn-primary commander">Commander</button>
                    <div class="d-flex align-items-center buttons-quantity">
                        <div onclick="incrementQuantity(${id})" class="btn btn-primary plus">+</div>
                        <h4 id="quantity-${id}" >${quantity}</h4>
                        <div onclick="decrementQuantity(${id})" class="btn btn-primary moins">-</div>
                    </div>
                </div>
            </div>
        </div>`
}

productsDiv.innerHTML = htmlToInject;



// Créer la fonction Delete du panier
const deleteFromPanier = (id) => {
    panier = panier.filter((e) => e.id !== id)
    document.getElementById('element-' + id).remove()
}

// Fonction pour ajouter au panier
const addToCart = (id) => {
    var total = 0;

    var prod = products.find((e) => e.id == id)
    var foundProd = panier.find(e => e.id == id)
    const { name, price, quantity } = prod
    if (!foundProd) {

        panier.push(prod)
        document.getElementById('taille-panier').innerText = panier.length
        // TODO: Injecter l'html du produit ajouté au MODAL
        // 1- Récuperer la div tbody avec l'id "panier-products"
        const panierProductsDiv = document.getElementById('panier-products')
        // 2- Ajouter à l'html de la div un <tr>
        panierProductsDiv.innerHTML += `<tr id="element-${id}">
                                <th scope="row">${id}</th>
                                <td>${name}</td>
                                <td>${quantity}</td>
                                <td>${price}</td>
                                <td><button onclick="deleteFromPanier(${id})" class="btn btn-danger">Delete</button></td>
                            </tr>`

    } else {
        foundProd.quantity++
    }
    var totalDiv = document.getElementById('total')
    for (let index = 0; index < panier.length; index++) {
        const element = panier[index];
        total += element.price * element.quantity
    }

    console.log({ total, panier })
    totalDiv.innerText = total + ' DZD'
}


const incrementQuantity = (id) => {
    var prod = products[products.findIndex(e => e.id === id)]
    prod.quantity++

    document.getElementById('quantity-' + id).innerText = prod.quantity
}

const decrementQuantity = (id) => {
    var index = products.findIndex(e => e.id === id)
    var prod = products[index]
    if (prod.quantity > 0)
        prod.quantity--


    document.getElementById('quantity-' + id).innerText = prod.quantity
}


