
// Global Variable for order array.
let ArrOrders = []


// Function that produce new Divs for order of products.
const newDiv = (name, arr, orderNumber) => {
  let div = document.createElement('div');
  let p2 = document.createElement('p');
  let p1 = document.createElement('p');
  let p = document.createElement('p');
  let btn = document.createElement('button');
  btn.setAttribute('id','delete')
  let Remove = document.getElementById('delete');

  // This function takes the Orders and calculating the total of the
  // order and then preseting it on the created div.
  div.addEventListener('click', () => {
    let obj = {
      userName: name,
      arrProducts: arr,
    }
    document.getElementById('clientName').innerHTML = `${name}`
    document.getElementById('Products').innerHTML = ''
    let price = 0
    arr.forEach((val) => {
      let p = document.createElement('p');
      p.innerHTML = val.productName
      document.getElementById('Products').append(p)
      price += val.productPrice;
    })

    document.getElementById('totalPaid').innerHTML = ` ₪ ${price}`
    Remove.innerHTML = ''
    btn.addEventListener('click',()=>{
      remove(obj)
      console.log(obj);
    })
    btn.innerHTML = 'dalete'
    Remove.append(btn)
  })
  p2.innerHTML = `Order Number: ${orderNumber}`
  p1.innerHTML = `Client Name: ${name}`
  p.innerHTML = `Amount Of Products: ${arr.length}`
  div.append(p2, p1, p);
  div.setAttribute('class', 'orders');
  document.getElementById('OrderList').append(div)
}


const remove =(obj)=>{
  let userName = obj.userName;
  let arrProducts = obj.arrProducts;
  console.log(userName);
  document.getElementById('OrderList').innerHTML = ''
    let boolean = false
    ArrOrders = ArrOrders.filter((val) => {
      if (boolean == false && userName== val.userName && val.arrProducts == arrProducts) {
        boolean = true
      }
      else {
        return val
      }

    })
    ArrOrders.forEach((val,index) => {
      newDiv(val.userName, val.arrProducts, ++index)
    });

    fetch('/deletOrder', {
      headers: { "Accept": 'application/json', 'Content-Type': 'application/json' },
      method: 'delete',
      body: JSON.stringify({
        userName,
        arrProducts
      })
    })

      .then(res => res.json())

      .then((data) => {
        alert(data)

      })
      .catch((err) => {
        console.log(err);
      })

  
}

// Recieving the array of orders from the server.
fetch('/Order')
  .then(res => res.json())
  .then((data) => {
    ArrOrders = data.result
    ArrOrders.forEach((val,index) => {
      newDiv(val.userName, val.arrProducts, ++index)
    });
  })
  .catch((err) => {
    console.log(err);
  })
