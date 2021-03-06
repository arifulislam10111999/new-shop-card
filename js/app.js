const loadProducts = () => {
  const inputText=document.getElementById('input').value;

   const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};



// show all product in UI 
const showProducts = (products) => {
 
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
   
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div  class="single">
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p> Rating: ${product.rating.rate}</p>
      <p> Average-rating: ${product.rating.count}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick='details()' id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  
updateTotal();
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;

  const converted = parseInt(element);
 
  return converted;
};





// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  

  const total = convertedOldPrice + convertPrice;
 
  document.getElementById(id).innerText =parseFloat(total);
return total;
};


// set innerText function
const setInnerText = (id, value) => {
 const seatInnerValue= document.getElementById(id).innerText = Math.round(value);


};



// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  

  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  
  const grandTotal =
  getInputValue("price")+
    getInputValue("delivery-charge")+ 
     getInputValue("total-tax");
 
  document.getElementById("total").innerText = grandTotal;

};
const details=()=>{
const idm=document.getElementById('details-btn');


  const urls=`https://fakestoreapi.com/products/1`;
  fetch(urls)
  .then(res=>res.json())
  .then(data=>detailOf(data))

 
}

const detailOf = (allProducts)=>{
 
 

document.getElementById('details').innerText='';
const div=document.createElement('div');

div.classList.add('single-productDetail');
div.innerHTML=`
<div  class="single">
<img class="product-image" src=${allProducts.image}></img>
  </div>
<h3>${allProducts.title}</h3>
`;

document.getElementById('details').appendChild(div);


}

loadProducts();