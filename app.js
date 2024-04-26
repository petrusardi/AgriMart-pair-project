const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const Controller = require("./controllers/controller");
const session = require('express-session')

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));

app.use(express.urlencoded({extended : true}));

app.use(session({
    secret: 'rahasia cok',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        sameSite:true
    }
  }))

  
  app.get("/", Controller.landing);
  app.get("/register", Controller.register);
  app.post("/register", Controller.postRegister);
  app.get("/login", Controller.login);
  app.post("/login", Controller.postLogin);
  app.get('/logout', Controller.getLogout);


  app.use((req, res, next) => {
    // console.log(req.session);
    if (!req.session.userId) {
        const error = 'yuk login dulu!';
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
    })

app.get("/cart", Controller.buyOrders);
app.get("/home", Controller.showAll);
app.get("/products/add", Controller.addProduct);
app.post("/products/add", Controller.postAddProduct);
app.get("/cart/:ProductId", Controller.getOrders);
app.get("/products/:ProductId", Controller.detailProduct);
app.post("/products/:ProductId", Controller.getProduct);
app.get("/products/:ProductId/edit", Controller.editProduct);
app.post("/products/:ProductId/edit", Controller.postEditProduct);
app.get("/cart/:OrderId/delete",Controller.deleteOrder);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})