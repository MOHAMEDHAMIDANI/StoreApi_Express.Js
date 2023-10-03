require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');
const start = async ( ) => {
    try {
        await connectDB(process.env.Mongo_db_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('daaang its working ')
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

start();