  const { Product } = require("../model/Products");

  exports.createProduct = async (req, res) => {
    // We have to get this product from API
    const product = new Product(req.body);
    try {
      const doc = await product.save();
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json(err);
    } 
  };

  exports.fetchAllProducts = async (req, res) => {
    // here we need all query string
    let query = Product.find({deleted:{$ne:true}});
    let totalProductsQuery=Product.find({deleted:{$ne:true}})

    // For Category Filter
    if(req.query.category){
      query = query.find({category: req.query.category});
      totalProductsQuery = totalProductsQuery.find({category: req.query.category});
    }
    //For Brand Filter
    if(req.query.brand){
      query = query.find({brand: req.query.brand});
      totalProductsQuery = totalProductsQuery.find({brand: req.query.brand});

    }
    //TODO: How To Sort From Discounted Price
    //For Sorting 
    if(req.query._sort && req.query._order){
      query = query.sort({[req.query._sort]: req.query._order});
    }
    const totalDocs = await totalProductsQuery.countDocuments().exec();
    console.log({totalDocs} )

    //For Pagination
    if(req.query._page && req.query._limit){
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize* (page -1)).limit(pageSize);
    }

    try {
      const docs = await query.exec();
      res.set('X-Total-Count', totalDocs)
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    } 
  };
  //filter = {"category": ["smartphones",laptops]}
    //sort = {_sort: "price", _order= "desc"}
    //pagination=  {_page: "1", _limit= 10}
    // TODO: We Have to try with Multiple categories and brads after change in frontend

    exports.fetchProductById = async (req,res) => {
      const {id}= req.params;

      try {
        const product= await Product.findById(id)
        res.status(200).json(product)

      } catch (err) {
        res.status(400).json(err)
      }
    }

    exports.updateProduct = async (req,res) => {
      const {id}= req.params;

      try {
        const product= await Product.findByIdAndUpdate(id,req.body, {new: true});
        res.status(200).json(product);
      } catch (err) {
        res.status(400).json(err);
      }
    }
    
    