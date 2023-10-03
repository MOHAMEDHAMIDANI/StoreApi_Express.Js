require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const productRouter = require('./routes/products')


const notFoundErr = require('./middleware/not-found')
const Errhandler = require('./middleware/error-handler');

// middleware

app.use(express.json());

// routes
app.use('/api/MrMH/products',productRouter);

// product routes 
app.use(notFoundErr)
app.use(Errhandler)
const Mongo_db_URI = process.env.Mongo_db_URI ;
const port = process.env.port || 5000 ;
const start = async(req , res) => {
    try {
        const connectDB = require('./db/connect')
        await connectDB(Mongo_db_URI);
        app.listen(port, () => {
            console.log(`server is listening in  port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start();



