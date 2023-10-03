const  Product =  require('../models/product')

const getAllProductsStatic = async (req , res) => {
    const products = await Product.find();
    res.status(200).json({msg: "products test routs " ,products });
}

const getAllProducts = async (req , res) => {
    const {name  ,price , featured, rating, company , sort , select} = req.query;
    const queryObj = {};
    if(featured){
        queryObj.featured = featured ===  'true' ? true: false ;
    }
    if(company){
        queryObj.company = company ;
    }
    if(name){
        queryObj.name = {$regex : name , $options : 'i',} ;
    }
    let result = Product.find(queryObj);
    if(sort){
        let sortingBasedOn  = sort.split(',').join(' ');
        result = result.sort(sortingBasedOn);
    }else{
        result = result.sort("createdAt");
    }
    if(select){
        let selectedBasedOn  = select.split(',').join(' ');
        result = result.select(selectedBasedOn);
    }
    const page = Number(req.query.page) || 1 ;
    const limit = Number(req.query.limit) || 10 ;
    const skip = (page - 1 ) * limit ;
    result = result.skip(skip).limit(limit);
    const products = await result;
    res.status(200).json({msg: "products routs "});
}
module.exports = {
    getAllProductsStatic , 
    getAllProducts
}