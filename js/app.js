const drawProducts = (data) => {
    let products = data.products;
    console.log(products)
    let productsContainer = document.getElementById("products-container");
    let containerTable = document.getElementById("container"); //contenedor para agregar los productos del carrito
    products.forEach((product, index) => {
        let idProduct = product.id;
        console.log(idProduct);
        let productHTML = createProductHTML(product);
        productsContainer.appendChild(productHTML);
    });
};

const createProductHTML = (product) => {
    let template = `
    <h3>${product.title}</h3>
    <img src='${product.imageUrl}' alt='${product.description}'/>
    <p>${product.description}</p>
    <button data-product-id=${product.id}
      onclick="addToCart(${product.id})"
      class='btn btn-primary'>
        Agregar a carrito
      </button>
    <hr/>
  `;

    let templateTable = `<tr>
            <th scope="row">${product.title}</th>
            <td>${product.price}</td>
          </tr>`;

    //console.log(product.title, product.price, "producto template")

    let productContainer = document.createElement("div");
    productContainer.className = "col text-center";
    productContainer.innerHTML = template;
    return productContainer;
};

drawProducts(data);

//array para agregar productos
const arrayId = [];

const addToCart = (product) => {
    arrayId.push(product);
    //console.log(product)

    //se convierte el array a string
    let saveArrayProducts = localStorage.setItem("productSelect", JSON.stringify(arrayId));
    JSON.parse(localStorage.getItem(("productSelect")));

    //llamando a las funciones que dependen de esta
    increaseCounter();
    changeButtonStatus(product);
    createProductHTML(product);
    console.log(arrayId)
    return arrayId;
};

const removeFromCart = (product) => {
    arrayId.pop(product);
    console.log(arrayId);
    console.log(product, "si entra")
    let removeArrayProducts = localStorage.setItem("productSelect", JSON.stringify(arrayId));
    JSON.parse(localStorage.removeItem(("productSelect")));

    //console.log(array);

    decreaseCounter();
    //changeButtonStatus(product);
};

const increaseCounter = () => {
    let counterCart = document.getElementById("counterItems");
    counterCart.innerHTML++;
};

const decreaseCounter = () => {
    let counterCart = document.getElementById("counterItems");
    counterCart.innerHTML--;
};

const changeButtonStatus = (button) => {
    let text = event.target;
    if (text.innerText == "Agregar a carrito") {
        text.innerText = "Quitar del carrito"
            //removeFromCart(button);
    } else {
        text.innerText = "Agregar a carrito"
        removeFromCart(button);
    };
};