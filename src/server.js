const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());

var customers = [{
    id: 1,
    firstName: 'Robin',
    lastName: 'Le Lapin',
    email: 'chonco@slavs.com',
    phone: '967263998',
    babes: [{
        id: 1,
        firstName: 'Roberta',
        lastName: 'Xereca',
        email: 'robertaxerequinha@gmail.com',
        phone: '6969696969'
    }],
    pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXQr48batW8bR6Nvm1N9B5z3u_OZAMbQyOnpNlTvbxgLiKNOHhaw'
}, {
    id: 2,
    firstName: 'Rolo',
    lastName: 'RocketMan',
    email: 'rolao@dutchman.com',
    phone: '913477825',
    babes: [],
    pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXQr48batW8bR6Nvm1N9B5z3u_OZAMbQyOnpNlTvbxgLiKNOHhaw'
}];

var babes = [{
    id: 1,
    firstName: 'Roberta',
    lastName: 'Xereca',
    email: 'robertaxerequinha@gmail.com',
    phone: '6969696969'
}];


// GET A CUSTOMER
app.get('/customer/:id', (req, res) => res.send(getCustomer(req.params.id)));


// ADD A BABE
app.post('/customer/:cid/babe', function(req, res) {    

    var babe = req.body;    

    var customer = getCustomer(req.params.cid);    

    babe.id = babes.length+1;
    babe.tracking = false;

    customer.babes.push(babe);
    babes.push(babe);

    res.send(customer.babes[babes.length-1]);
    
});

// GET A BABE
app.get('/customer/:cid/babe/:bid', function(req, res) {
    res.send(getBabe(getCustomer(req.params.cid), req.params.bid));
});

// TRACK A BABE

app.put('/customer/:cid/babe/:bid/track/:plan', function(req, res) {


    
})

function getCustomer(id) {
    
    for (var i = 0; i < customers.length; i++) {
        if (customers[i].id === parseInt(id)) {
            return customers[i];
        }
    }
}


function getBabe(customer, id) {

    for (var i = 0; i < customer.babes.length; i++) {
        if (customer.babes[i].id === parseInt(id)) {
            return customer.babes[i];
        }
    }
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


const webserver = express();
webserver.use(express.static(__dirname + '/public'))

webserver.get('/', function (req,res) {
    res.redirect('http://'+ req.get('host') + '/index.html')
})


webserver.get('/babe-profile/',function (req,res) {
    res.sendFile(__dirname + '/views/babe-profile.html')
})


webserver.get('/babe-form/', function (req,res) {
    res.sendFile(__dirname + '/views/babe-form.html')
})

webserver.get('/babe-add/', function (req,res) {
    res.sendFile(__dirname + '/views/babe-add.html')
})

 
/*
webserver.get('/*', function (req,res) {
    res.redirect('http://'+ req.get('host') + '/404.html')
})*/
webserver.listen(80, () => console.log("WebServer on port 80"));