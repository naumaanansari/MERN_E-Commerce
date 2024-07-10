const express = require("express");
const server = express();
const mongoose = require("mongoose");
const productsRouter = require('./routes/Products')
const categoriesRouter = require('./routes/Category')
const brandsRouter = require('./routes/Brands')
const cors = require ('cors')




// Middlewares
server.use(cors({
  exposedHeaders: 'X-Total-Count'
}))
server.use(express.json()); //to parse req.body
server.use('/products',productsRouter.router);
server.use('/categories',categoriesRouter.router)
server.use('/brands',brandsRouter.router)



main().catch(err=>console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wecommerce");
  console.log('database connected')
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});


server.listen(8080, () => {
  console.log("Server Started");
});
