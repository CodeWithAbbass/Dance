const express = require('express');
const path = require('path');
const app = express();
var mongo = require('mongodb');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    console.log('mongoose is connected')
    await mongoose.connect('mongodb://localhost:27017/contactDance');
}

const port = 80;

// Define Mongoose Schema 
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    subject: String,
    textarea: String
});

const Contact = mongoose.model('Contact', contactSchema);



// Express 
app.use('/static', express.static('static'));   // Serving Static Files
app.use(express.urlencoded({extended: false}));

// PUG 
app.set('view engine', 'pug');                  // Set Template Engine As Pug
app.set('views', path.join(__dirname, 'views')); // Set Directory 

// ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        console.log('The data is saved')
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("item was not saved to the databse")
    });
})


// SERVER 
app.listen(port, (req, res) => {
    console.log(`The app is Running at Port ${port}`);
});