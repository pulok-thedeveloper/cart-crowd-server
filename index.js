const express = require('express')
const cors = require('cors');
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tftz42f.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//Connecting Database
async function dbConnect() {
    try {
        await client.connect();
        console.log('Database Connected')
    }
    catch (error) {
        console.log(error.name, error.message)
        res.send({
            success: false,
            error: error.message
        })
    }
}

dbConnect();

//Categories
const Categories = client.db('cartCrowd').collection('productCategories');
app.get('/categories', async (req, res) => {
    try {
        const cursor = Categories.find({});
        const categories = await cursor.toArray();

        res.send({
            success: true,
            data: categories
        })
    }
    catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
})

//Men's Products
const MenProducts = client.db('cartCrowd').collection('menProducts');
app.get('/categories/men', async (req, res) => {
    try {
        const cursor = MenProducts.find({});
        const result = await cursor.toArray();

        res.send({
            success: true,
            data: result
        })
    }
    catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
})

//Women's Products
const WomenProducts = client.db('cartCrowd').collection('womenProducts');
app.get('/categories/women', async (req, res) => {
    try {
        const cursor = WomenProducts.find({});
        const result = await cursor.toArray();

        res.send({
            success: true,
            data: result
        })
    }
    catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
})


//HeaderSlider
const HeaderSlider = client.db('cartCrowd').collection('headerSlider');
app.get('/header/slider', async (req, res) => {
    try {
        const cursor = HeaderSlider.find({});
        const result = await cursor.toArray();

        res.send({
            success: true,
            data: result
        })
    }
    catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
})

app.get('/', (req, res) => {
    try {
        res.send("CartCrowd server is running...")
    }
    catch (error) {
        res.send(error.message)
    }
})

app.listen(port, () => { console.log(`CartCrowd server is running on ${port}`) })