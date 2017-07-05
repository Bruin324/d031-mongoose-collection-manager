const mongoose = require('mongoose')

const magnetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    theme: { type: String },
    dateGot: { type: Date },
    locationFrom: {
        city: {type: String},
        state: {type: String},
        country: {type: String, required: true, default: 'USA'}
    },
    colors: { type: Array },
    cost: { type: Number },
    gift: { type: Boolean}
});

// steve.validate((errors) => {
//     console.errors);
// })

const Magnet = mongoose.model('Magnet', magnetSchema);

module.exports = Magnet;