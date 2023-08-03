// Import required modules / packeges
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('mongoose');
const XLSX = require('xlsx');
const fs = require('fs');
const http = require('http');


// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static('pages'))


// Connect to MongoDb
db.connect('mongodb+srv://ranan97531:2524097531R@cluster0.rhkco4m.mongodb.net/svShop')
    .then(() => console.log('db on'))


// Define database schemas and models
const userSchema = db.Schema({
    userName: String,
    userEmail: String,
    userPassword: String

})


const listProduct = db.Schema({
    productName: String,
    productPrice: Number,
    productImg: String
})


const ordersPending = db.Schema({
    userName: String,
    arrProducts: Array
})

const collectionUser = db.model('user', userSchema);
const collectionProduct = db.model('product', listProduct);
const collectionPending = db.model('pending', ordersPending);


// Define an array to hold the list of products.
let productsListArr = [

    {
        productName: 'Apple iPhone 14 Pro Max 1TB',
        productPrice: 7390,
        productImg: 'https://img.ksp.co.il/item/227289/b_1.jpg?v=5'
    }
    ,
    {
        productName: 'Samsung Galaxy S21 Ultra',
        productPrice: 3990,
        productImg: 'https://www.joymobile.co.il/wp-content/uploads/2022/11/Samsung-Galaxy-S21-Ultra-128GB-5G.png'
    }
    ,
    {
        productName: 'Bose QuietComfort 35 II wireless headphones',
        productPrice: 1290,
        productImg: 'https://www.fortress.com.hk/medias/Bose-QuietComfort-4-12518739.jpg?context=bWFzdGVyfHNpZGV6b29tfDQwMTM1fGltYWdlL2pwZWd8c2lkZXpvb20vaGI2L2g5YS85ODU1NTQ4MDYzNzc0LmpwZ3wxZDk0ZTNjOGRkNTU5ZThhZTNmN2UyMGE1NWQ2ZWU0OWY1ZGIzZTU3NTM1YmZiNmIzMjk2MDg0ODkyZWZkODhm'
    }
    ,
    {
        productName: 'Amazon Echo Dot (4th generation)',
        productPrice: 190,
        productImg: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6430/6430060cv12d.jpg'
    }
    ,
    {
        productName: 'Fitbit Charge 5',
        productPrice: 690,
        productImg: 'https://www.fitbit.com/global/content/dam/fitbit/global/pdp/devices/charge-5/hero-static/charge5-black-device-3qtr.png'
    },

    {
        productName: 'Microsoft Surface Laptop 4',
        productPrice: 3990,
        productImg: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4LiXm?ver=45be&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true'
    },

    {
        productName: 'DJI Mavic Air 2 drone',
        productPrice: 2990,
        productImg: 'https://img.fruugo.com/product/8/60/388898608_max.jpg'
    },

    {
        productName: 'Samsung 85 Neo QLED 8K Smart TV',
        productPrice: 38890,
        productImg: 'https://img.ksp.co.il/item/211404/b_1.jpg?v=5'
    },

    {
        productName: 'Nest Learning Thermostat (3rd generation)',
        productPrice: 890,
        productImg: 'https://m.media-amazon.com/images/I/41-ZMjShf0L._SS600_.jpg'
    }
    ,
    {
        productName: 'Sony PlayStation 5',
        productPrice: 1990,
        productImg: 'https://media.direct.playstation.com/is/image/sierialto/PS5-digital-edition-front-with-dualsense'
    }
    ,
    // ---------------------------------------- 10 more------------------------------------
    {
        productName: 'MacBook Pro M1',
        productPrice: 7990,
        productImg: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-mbp13-space-m1-2020?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1628621779000'
    }
    ,
    {
        productName: 'Philips Hue Smart Lights',
        productPrice: 140,
        productImg: 'https://www.assets.signify.com/is/image/Signify/61216af27e7e46bdb5c5acef00e1baa1'
    }
    ,
    {
        productName: 'Anker PowerCore 10000',
        productPrice: 190,
        productImg: 'https://anker-il.co.il/wp-content/uploads/2022/02/A3145H12_1-10.jpg'
    }
    ,
    {
        productName: 'Microsoft Xbox Series X 1TB SSD',
        productPrice: 1990,
        productImg: 'https://d3m9l0v76dty0.cloudfront.net/system/photos/8110441/original/bc072fa180d50f11738b9015a2bf1252.jpg'
    }
    ,
    {
        productName: 'Nintendo Switch Oled 64GB',
        productPrice: 1490,
        productImg: 'https://a-static.mlcdn.com.br/800x560/nintendo-switch-oled-64gb-branco/lojaibyte/100019061/b6523d26ab3a47185864e7eb23a0c13d.jpeg'
    }
    ,
    {
        productName: 'Xiaomi MI Electric Scooter 1S',
        productPrice: 1590,
        productImg: 'https://img.ksp.co.il/item/133389/b_7.jpg?v=5'
    }
    ,
    {
        productName: 'GoPro Hero 10 Black',
        productPrice: 1790,
        productImg: 'https://static.gopro.com/assets/blta2b8522e5372af40/blt741c2a686796c4bf/61b7c3bf1bdbe25709ba76a9/GoPro_News_HERO10_Black.jpg'
    }
    ,
    {
        productName: 'Apple Watch Ultra 49mm GPS + Cellular',
        productPrice: 3290,
        productImg: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQDY3ref_VW_34FR+watch-49-titanium-ultra_VW_34FR_WF_CO+watch-face-49-alpine-ultra_VW_34FR_WF_CO?wid=750&hei=712&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1660713659063%2C1660927566964%2C1660927563656'
    }
    ,
    {
        productName: 'MSI GeForce RTX 4090 SUPRIM X 24GB GDDR6X',
        productPrice: 9490,
        productImg: 'https://asset.msi.com/resize/image/global/product/product_16684922253a92c54981e8eee93e91a629894d2ca8.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png'
    }
    ,
    {
        productName: 'Nespresso Delonghi Citiz & Milk',
        productPrice: 770,
        productImg: 'https://cdn.cashcow.co.il/images/3b4efd33-fba4-458e-9250-669b6f834df2.jpg'
    }
    ,
    // ---------------------------------------- 10 more------------------------------------
    {
        productName: 'Ninja Foodi MAX Health Grill & Air Fryer AG551EU',
        productPrice: 990,
        productImg: 'https://img.ksp.co.il/item/177469/b_1.jpg?v=5'
    }
    ,
    {
        productName: 'Mixer Jeffrey Adams 1200W',
        productPrice: 590,
        productImg: 'https://img.ksp.co.il/item/234293/b_1.jpg?v=5'
    }
    ,
    {
        productName: 'Ninja Blender 1000W BN495EU',
        productPrice: 349,
        productImg: 'https://ksp.co.il/shop/items/512/149995.jpg'
    }
    ,
    {
        productName: 'Dyson V15 Detect Absolute',
        productPrice: 2590,
        productImg: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/leap-petite-global/products/floorcare/sticks/v15-detect/pdp/dynamic-media/primary/SV22-CORE-LB.png?$responsive$&fmt=png-alpha&cropPathE=desktop&fit=stretch,1&wid=960'
    }
    ,
    {
        productName: 'Dell UltraSharp U3023E QHD LED IPS 30',
        productPrice: 2690,
        productImg: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/u-series/u3023e/media-gallery/monitor-u3023e-gallery-2.psd?fmt=pjpg&pscan=auto&scl=1&wid=4002&hei=3663&qlt=100,1&resMode=sharp2&size=4002,3663&chrss=full&imwidth=5000'
    }
    ,
    {
        productName: 'HP Smart Tank 670',
        productPrice: 890,
        productImg: 'https://hk-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/6/U/6UU48A-1_T1678930520.png'
    }
    ,
    {
        productName: 'Xiaomi Mi Robot Vacuum Mop 2 Ultra',
        productPrice: 2890,
        productImg: 'https://i0.wp.com/mashvim.com/wp-content/uploads/2022/08/Xiaomi-Mi-Robot-Vacuum-Mop-2-Ultra.jpg?fit=600%2C600&ssl=1'
    }
    ,
    {
        productName: 'Apple AirPods 3 (3rd generation)',
        productPrice: 690,
        productImg: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1632861342000'
    }
    ,
    {
        productName: 'Intel Core i9 12900K 3.2Ghz 30MB Cache s1700',
        productPrice: 2490,
        productImg: 'https://ksp.co.il/shop/items/512/178011.jpg'
    }
    ,
    {
        productName: 'Apple iPad Pro 2022 12.9 2TB WiFi + Cellular',
        productPrice: 9990,
        productImg: 'https://img.ksp.co.il/item/231078/b_1.jpg?v=5'
    }
    ,

]

// Define a function to add products to the database
const addProduct = async (arr) => {
    await collectionProduct.insertMany(arr)
}

// addProduct(productsListArr)

// Middleware function to check if the user is an admin
const isAdmin = (req, res, next) => {
    const boolean = req.query.admin == 'true'
    if (boolean == true) {
        return next()
    }
    else {
        return res.status(400).send('error') //[ access key:  /All?admin=true ]
    }
} 


// Define routes for various pages
app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/pages/third.html')
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/pages/second.html')
})

app.get('/buy', (req, res) => {
    res.sendFile(__dirname + '/pages/fourth.html')
})

app.get('/admin', isAdmin, (req, res) => {
    res.sendFile(__dirname + '/pages/admin.html')
})

app.get('/All',(req,res)=>{
    res.sendFile(__dirname+'/pages/fifth.html')
})

app.get('/productManagement',(req,res)=>{
    res.sendFile(__dirname+'/pages/productManagement.html')
})

app.get('/appendProduct',(req,res)=>{
    res.sendFile(__dirname+'/pages/appendProduct.html')
})


// Route to add a new user to the database
app.post('/addUser', (req, res) => {
    let temp = {
        userName: req.body.nameUser,
        userEmail: req.body.emailUser,
        userPassword: req.body.passwordUser
    }

    // Check if the email already exists in the database
    // before inserting new user
    const checkEmail = async () => {
        let result = await collectionUser.findOne({ userEmail: temp.userEmail });
        if (result == null) {
            collectionUser.insertMany(temp)
            res.send({ result: true })
        }
        else {
            res.send({ result: false })
        }
    }

    checkEmail()



})


// Route to check if a user is valid
app.post('/check', (req, res) => {
    let checkEmail = req.body.emailUser;
    let checkPassword = req.body.passwordUser;
    const checkValidUser = async () => {
        let result = await collectionUser.findOne({ userEmail: checkEmail, userPassword: checkPassword })
        if (result != null) {
            res.send({ result: true, name: result.userName })
        }
        else {
            res.send({ result: false })
        }
    }

    checkValidUser()


})


// This request send back all the products that exist in the database
app.get('/getProducts', (req, res) => {
    const returnProductList = async () => {
        let arr = await collectionProduct.find()
        res.send({ arrp: arr })
    }

    returnProductList()
})


// Takes the order's name and the products and enters
// it into the orders Collection
app.post('/approve', (req, res) => {
    let temp = {
        userName: req.body.userName,
        arrProducts: req.body.arrProducts
    }

    const addOrder = async () => {
        await collectionPending.insertMany(temp)
        res.send({ result: true })
    }

    addOrder()
})

// Returns an array of all orders
app.get('/Order', (req, res) => {
    const order = async () => {
        let ArrOrders = await collectionPending.find()
        res.send({ result: ArrOrders })
    }
    order()
})

// delte order
app.delete('/deletOrder',(req,res)=>{
    const delete1 = async () =>{
        await collectionPending.findOneAndDelete({userName:req.body.userName , arrProducts: req.body.arrProducts})
        res.json('the order delte')
    }

    delete1()
    
})

// delete product
app.delete('/deletProduct',(req,res)=>{
    const delete2 = async () =>{
        let price = req.body.productPrice
        let name =  req.body.productName
        await collectionProduct.findOneAndDelete({productName: name , productPrice: price})
        res.json('the order delte')
    }

    delete2()
    
})

// Append a new product
app.post('/productNew',(req,res)=>{
    let temp = {
        productName: req.body.name,
        productPrice: req.body.price,
        productImg: req.body.img
    }
    
    const appendP = async ()=>{
        await collectionProduct.insertMany(temp)
        res.send(`<script>alert('The product is added');location.href = "/appendProduct"</script>`)
    }
    
    appendP()
})
// update the product
app.post('/update',(req,res)=>{
    let name1 = req.body.productName;
    let price = req.body.productPrice;
    let changeValue = req.body.changeValue;
    let update = req.body.updateInpt;
    const updateProduct = async ()=>{
        if(changeValue == 'name'){
            await collectionProduct.findOneAndUpdate({productName:name1,productPrice:price},{$set :{productName:update}})
        }
        else if(changeValue == 'price'){
            await collectionProduct.findOneAndUpdate({productName:name1,productPrice:price},{$set :{productPrice:Number(update)}})
        }
        else{
            await collectionProduct.findOneAndUpdate({productName:name1,productPrice:price},{$set :{productImg:update}})
        }
        let arr = await collectionProduct.find()
        res.json(arr)
    }
    updateProduct()
    
})
// export file xlsx for users
app.get('/usersXL',async(req,res)=>{
    let arrToFile = []
    let arrUsers = await collectionUser.find()
    arrUsers.forEach((val)=>{
        arrToFile.push({name:val.userName,email:val.userEmail})
    })
    arrToFile = XLSX.utils.json_to_sheet(arrToFile)
    let workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook,arrToFile,'Sheet1')   
    XLSX.writeFile(workBook,'users.xlsx')  
    const data = XLSX.write(workBook, { type: 'buffer', bookType: 'xlsx' }); 
    res.setHeader('Content-Disposition', 'attachment; filename=example.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(data);

})
app.listen(3000, () => console.log('server port on 3000'))





