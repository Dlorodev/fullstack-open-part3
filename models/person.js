const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
console.log('Connecting to ', url);

mongoose.connect(url).then(result => {
    //console.log(result);
    console.log('Connected to MongoDB');
}).catch(error => {
    console.log('error connecting to MongoDB ', error.message)
});

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Person', personSchema) 