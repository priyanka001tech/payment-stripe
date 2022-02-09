const express = require ('express')
const bodyParser = require ('body-parser')
const path = require ('path')

const PUBLISHABLE_KEY = "pk_test_51KNulkSFQIHS5wdFVFKEwHebVHNVK6HlKGZh09VhgV9qROcBRFVfyGswkuWfcngLB3lYRYOzh48cuzvXLPwXAqdi00bBrEqXmm"
const SECRET_KEY = "sk_test_51KNulkSFQIHS5wdFsGix4L7p3jUQuJZNajQL6efeAxy9jAlYiBJLCCRLIk0GSz1dgHb095CIveZFz48dZHQ7QxpD00cndnZvT2"

const stripe = require('stripe')(SECRET_KEY)
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 3000

app.get('/', (req,res) => {
    res.render('Home', {
        key: PUBLISHABLE_KEY
    })
})

app.post('/payment', (req, res) => { 

    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken,  
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: 50000.00,  
            description: 'Book Slot for Checkup', 
            currency: 'INR', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        res.send("Payment Done!!") 
    }) 
    .catch((err) => { 
        res.send("Payment Done!!") 
        console.log(err)
    }); 
}) 

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
})