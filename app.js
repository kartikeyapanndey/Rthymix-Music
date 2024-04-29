const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb://localhost/KartikayPandey', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});


const Schema = mongoose.Schema;
const userDataSchema = new Schema({
    email: String,
    password: String
});
const UserData = mongoose.model('UserData', userDataSchema);


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.post('/sign', async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    console.log("email is " + email + ", password is " + password);

    var newUser = new UserData({
        email: email,
        password: password
    });

    try {
        await newUser.save();
        console.log("User data saved successfully");
    } catch (err) {
        console.error("Error saving user data:", err);
        return res.status(500).send("Error saving user data");
    }

    res.sendFile(path.resolve(__dirname, 'public', 'home.html'));
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
