const connectToMongo = require('./db')
const express = require('express')
const cors = require("cors");

const app = express()
const port = 5000;

connectToMongo();
app.use(cors());
app.use(express.json())


// Avaliable routes
app.get('/', (req, res) => {
  console.log("Invoked");
  res.send('Hello World!')
})

// app.get('/customer', (req, res) => {
//   console.log("Customer");
//   res.send('customer')
// })


// app.get('/shop', (req, res) => {
//   console.log("Customer");
//   res.send('Shopkeeper')
// })


// app.get('/dev', (req, res) => {
//   console.log("Customer");
//   res.send('DeliveryBoy')
// })
// trying

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/note'));

app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`)
})

module.exports = app; // Export the Express app