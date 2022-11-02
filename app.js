const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost:27017/contactDance');
const port = 80;



// Define Mongoose Schema 

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);




app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const con = "This is the best content on the internet so far so use it wisely"

    res.status(200).render('home.pug');
})

app.get('/contact', (req, res) => {

    res.render('contact.pug');
})


app.post('/contact', (req, res) => {

    var myData = new Contact({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        desc: req.body.desc,
        desc: req.body.desc,
    })
    myData.save().then(() => {
        res.send('The Item Has Been Saved To The Database')
    }).catch(() => {
        res.send(400).send('The Item Was Not saved To Database')
    })

    // res.status(200).render('contact.pug');
})



// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});