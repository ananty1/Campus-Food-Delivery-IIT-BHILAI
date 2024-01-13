const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
// const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection URI and details
const mongoURI = 'mongodb://localhost:27017/flipr';
const dbName = 'flipr';
const collectionName = 'userData';
const saltRounds = 10;


// MongoDB client
const client = new MongoClient(mongoURI);

// Connect to MongoDB server
(async () => {
    await client.connect();
    console.log('Connected to MongoDB server');
})();

// MongoDB database and collection
const database = client.db(dbName);
const collection = database.collection(collectionName);

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Route to handle GET request
app.get('/', (req, res) => {
    console.log('Server started.');
    res.status(200).send('Server is running.');
});

// Route to handle POST request for signup
app.post('/signup', async (req, res) => {
    const userData = req.body;

    try {
        // Create a new User instance
        // const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        const newUser = new User(userData);

        // Save the user data to MongoDB
        const result = await collection.insertOne(userData);

        console.log('User data saved to MongoDB:', newUser);
        res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
