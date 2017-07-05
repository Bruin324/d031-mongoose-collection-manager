const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Magnet = require('./models/magnets.js');
// const viewController = require('view-controller')

const application = express();

application.set('views', '/views');
application.set('view engine', 'mustache-express');

application.engine('mustache', mustache());
application.set('views', './views');
application.set('view engine', 'mustache');


application.use('/public', express.static('./public'));
application.use(bodyParser.urlencoded());

mongoose.connect('mongodb://localhost:27017/MagnetsApplication')

application.get('/', async (request, response) => {
    var magnets = await Magnet.find();
    var model = {magnets: magnets}
    response.render('index', model)
    // response.send(model);
});

application.get('/add', (request, response) => {
    response.render('add');
})

application.post('/add', (request, response) => {
    var colorSplits = /, | |,/
    var splitColors = colorSplits[Symbol.split](request.body.colors)
    var newMagnet = {
        name: request.body.name,
        description: request.body.description,
        theme: request.body.theme,
        dateGot: request.body.dateBought,
        locationFrom: {
            city: request.body.city,
            state: request.body.state,
            country: request.body.country
        },
        colors: splitColors,
        cost: request.body.cost,
        gift: request.body.gift
    }
    response.send(newMagnet);
})

// var magnet = new Magnet({ 
//     name: '2015Disney',
//     theme: 'Vacation',
//     dateBought: 'Fri Feb 4 2015 19:05:17 GMT+0900 (JST)',
//     locationBought: {
//         city: 'Orlando',
//         state: 'FL',
//     },
//     colors: ['red', 'blue', 'white'],
//     cost: 10,
// });

// var errors = magnet.validateSync();


// // async function save() {
// //     var result = await magnet.save();
// //     return result
// // }

// // save();

// async function getMagnet(page, size) {
//     var index = Math.max(page-1, 0) * size;
//     var magnets = await Magnet.find( { theme: 'Vacation'})
//     .skip(index)
//     .limit(size);
//     return magnets;
// }
// console.log(getMagnet(1,20));
console.log('app started')
application.listen(3000);