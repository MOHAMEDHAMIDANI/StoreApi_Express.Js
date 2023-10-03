const mongoose = require('mongoose');
const Product = new mongoose.Schema({
    name : {
        type : String , 
        required : [true , 'name must be provided']
    },
    price : {
        type : Number  ,
        required : [true , 'price must be provided']
    } , 
    featured : {
        type :Boolean ,
        default : false ,
    },
    rating : {
        type : Number ,
        default : 3
    },
    createdAt: {
        type : Date , 
        default : Date.now(),
    },
    company : {
        type : String,
        enum : {
            values : ['ikea' , 'liddy' , 'caressa' , 'marcos'], 
            message : '{VAlUE} is not supported' , 
        }
        // enum : ['ikea' , 'liddy' , 'caressa' , 'marcos'],
    }
})
module.exports = mongoose.model('Product',Product);