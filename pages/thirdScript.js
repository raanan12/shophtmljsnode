// Third Page

// Global variable of an array that saves the selected product inside
let chosenProducts = [];
let ArrProducts = []

// This function creating the div tag each div contains only one product such as 
// product name, product price and product img.
const newDiv = (name, price,imgUrl) => {
  let div = document.createElement('div');
  let div1 = document.createElement('div');
  let h1 = document.createElement('h1');
  let p = document.createElement('p');
  let sum = document.createElement('p');
  let img = document.createElement('img'); 
  let btn1 = document.createElement('button');
  let btn2 = document.createElement('button');
  sum.innerHTML = 0;
  sum.value = 0;

  // Function that adds a product to the selected products array
  btn1.addEventListener('click',()=>{
    let obj = {
      productName: name,
      productPrice: price,
      productImg:imgUrl
    }
    chosenProducts.push(obj);
    sum.value++
    sum.innerHTML = sum.value 
  })

  // The function removes the product from the product array
  // that the user has selected.
  btn2.addEventListener('click',()=>{
    if(sum.value !=0){
      let obj = {
        productName: name,
        productPrice: price,
      }
     let boolean = false
     chosenProducts = chosenProducts.filter((val)=>  {
       if(obj.productName != val.productName && boolean == false){
         return val
       }
       else if(boolean == false) {
         boolean = true
       }
       else{
         return val
       }
     
     })
      sum.value--
      sum.innerHTML = sum.value
    }
  })
  btn1.innerHTML = '+';
  btn2.innerHTML = '-'
  div1.setAttribute('id','addAremove')
  div1.append(btn1,sum,btn2)
  h1.innerHTML = name
  p.innerHTML = `Price: ${price}`
  img.src = imgUrl
  div.append(img,h1, p,div1);
  div.setAttribute('class','product');
  document.getElementById('products').append(div)
}



// The fetch request is a request to the server that gets back from the server
// all product existed. 
fetch('/getProducts')
  .then(res => res.json())
  .then((data) => {
    ArrProducts = data.arrp  
    
    // forEach loop that goes throuh the array of products recieved from the
    // server and enters each product into a new div, which generates
    // a div for each product itself.
    document.getElementById('userName').innerHTML = sessionStorage.getItem('user')
    ArrProducts.forEach((val) => {
      newDiv(val.productName, val.productPrice,val.productImg)
    })
  })
  .catch((err) => {
    console.log(err);
  })


// The function for the Sort button, the function outputs the value selected
// in the select and arranges the products on the site accordingly.
const sort = () => {
  let nameOrPrice = document.getElementById('select_sort').value;
  if (nameOrPrice == 'price') {
    ArrProducts = ArrProducts.sort((a, b) => b.productPrice - a.productPrice);
  }
  else {
    ArrProducts = ArrProducts.sort((a, b) => (b.productName < a.productName) ? 1 : -1);
  }
  document.getElementById('products').innerHTML = ''
  ArrProducts.forEach((val) => {
    newDiv(val.productName, val.productPrice, val.productImg)
  })
}

// A search function that is connected to HTML
// using on input and filters the array of products by filter
// loop with the use of Index Of.
const search = () => {
  let userInput = document.getElementById('searchInpt').value;
  let ArrProductsSearch = ArrProducts.filter((val)=>{
    if (val.productName.toLowerCase().indexOf(userInput.toLowerCase()) != -1){
      return val
    }
  })
  document.getElementById('products').innerHTML = ''
  ArrProductsSearch.forEach((val) => {
    newDiv(val.productName, val.productPrice , val.productImg)
  })
}


// A request function that takes the array pf selected products
// and saves it on the browser in Local Storage which moves the user 
// to the purchase page.
const buy = () => {
  if(chosenProducts.length != 0){
    localStorage.setItem('chosenProducts', JSON.stringify(chosenProducts));
    location.href = '/buy';
  }
  else{
    alert('No products selected')
  }
  
}


