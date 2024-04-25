const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const Controller = require("./controllers/controller");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));

app.use(express.urlencoded({extended : true}));

app.get("/", Controller.showAll);
app.get("/register", Controller.register);
app.post("/register", Controller.postRegister);
app.get("/login", Controller.login);
app.post("/login", Controller.cekPassword);
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