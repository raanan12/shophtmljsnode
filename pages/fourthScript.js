// Receiving an array of products and the user name from the
// Local Storage and also from the Session Storage.
let chosenProducts = JSON.parse(localStorage.getItem('chosenProducts'));
let name1 = sessionStorage.getItem('user')

// A function that produces the divs of the selected products.
const newDiv = (name, price, imgUrl) => {
  let div = document.createElement('div');
  let h1 = document.createElement('h1');
  let p = document.createElement('p');
  let img = document.createElement('img');
  let imgDelete = document.createElement('img');


  // The function removes the product from the product array
  // that the user has selected.
  imgDelete.addEventListener('click', () => {
    let obj = {
      productName: name,
      productPrice: price,
    }
    let boolean = false
    chosenProducts = chosenProducts.filter((val) => {
      if (obj.productName != val.productName && boolean == false) {
        return val
      }
      else if (boolean == false) {
        boolean = true
      }
      else {
        return val
      }

    })
    document.getElementById('totalProducts').innerHTML = ''
    PresentingOrder()
    console.log(chosenProducts);
  })

  imgDelete.src = 'imgDelete.png';
  h1.innerHTML = name
  p.innerHTML = `Price: ${price}`
  img.src = imgUrl
  div.append(img, h1, p, imgDelete);
  div.setAttribute('class', 'product');
  document.getElementById('totalProducts').append(div)
}


// The function takes the Username and the Product array and passes to the server
// The server takes it and puts it in the Collection of pending orders and returns True or False
// if it returns True the user will be transferred to the home page and then discinnected from the system.
const approve = () => {
  if(chosenProducts.length != 0){
    fetch('/approve', {
      headers: { "Accept": 'application/json', 'Content-Type': 'application/json' },
      method: 'post',
      body: JSON.stringify({
        userName: name1,
        arrProducts: chosenProducts
      })
    })
      .then(res => res.json())
  
      .then(data => {
        if (data.result == true) {
          sessionStorage.setItem('user','not connected')
          location.href = '/'
        }
        else {
          alert = 'The request was not received by the system'
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  else{
    alert('No products selected')
  }
  
}

const back = () => {
  location.href = '/products'
}


// The function displays the entire order, it enters the Username
// and also the total amount of products.
const PresentingOrder = () => {
  let count = chosenProducts.reduce((currentTotal, element) => {
    return currentTotal + element.productPrice
  }, 0)
  chosenProducts.forEach((val) => {
    newDiv(val.productName, val.productPrice, val.productImg)
  });
  document.getElementById('userName').innerHTML = sessionStorage.getItem('user')
  document.getElementById('clientName').innerHTML = name1;
  document.getElementById('totalPrice').innerHTML = `₪ ${count}`;
  document.getElementById('numProducts').innerHTML = chosenProducts.length
}

PresentingOrder()