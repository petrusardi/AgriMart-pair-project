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

  app.use((req, res, next) => {
    console.log(req.session);
      console.log('Time:', Date.now())
      next()
    })
app.get("/home", Controller.showAll);
app.get("/cart", Controller.getOrders);
app.post("/cart", Controller.buyOrders);
app.get("/products/:ProductId", Controller.detailProduct);
app.post("/products/:ProductId", Controller.getProduct);
app.get("/products/:ProductId/edit", Controller.editProduct);
app.post("/products/:ProductId/edit", Controller.postEditProduct);
app.get("/cart/:OrderId/delete",Controller.deleteOrder);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})