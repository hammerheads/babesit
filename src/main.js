const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(function (req, res, next) {
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
    babes: [
        {
            id: 1,
            firstName: 'Roberta',
            lastName: 'Peppa',
            email: 'robertapeppa@gmail.com',
            phone: '9158787818',
            tracking: true,
            plan: 'Basic',
            pic: 'https://static.vakinha.com.br/uploads/vakinha/image/537909/cover_IMG-20190412-WA0219.jpg',
            msg: [
                {
                    time: '18:50',
                    text: "Sua Babe entrou em um motel com um gajo musculoso"
                },
                {
                    time: '12:50',
                    text: "Sua Babe entrou em carro estranho!"
                },
                {
                    time: '12:30',
                    text: "Estou proximo dela"
                }
            ]
        },
        {
            id: 2,
            firstName: "O'Laria",
            lastName: 'Xereca',
            email: 'olariaxerequinha@gmail.com',
            phone: '6969696969',
            tracking: true,
            plan: 'Basic',
            pic: 'https://e3.365dm.com/19/02/512x512/skynews-sally-challen-georgina-challen_4590986.jpg',
            msg: [
                {
                    time: '13:20',
                    text: "Pelo visto ela está com 9 Fuzileiros em um quarto !!"
                },
                {
                    time: '12:50',
                    text: "Parece que ela está com fogo na XERECA!!!!!"
                },
                {
                    time: '11:50',
                    text: "Já estou proximo dela!"
                },
            ]
        }],
    pic: 'https://i.imgur.com/kt6FItI.png'
}, {
    id: 2,
    firstName: 'Rolo',
    lastName: 'RocketMan',
    email: 'rolao@dutchman.com',
    phone: '913477825',
    babes: [
        {
            id: 1,
            firstName: 'Roban',
            lastName: 'Opinião',
            email: 'chonco@gmail.com',
            phone: '666666666',
            tracking: true,
            plan: 'Basic',
            pic: 'https://i.imgur.com/kt6FItI.png',
            msg: [
                {
                    time: '18:50',
                    text: "Sua Babe entrou em um motel com um gajo musculoso"
                },
                {
                    time: '12:50',
                    text: "Sua Babe entrou em carro estranho!"
                },
                {
                    time: '12:30',
                    text: "Estou proximo dela"
                }
            ]
        }
    ],
    pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXQr48batW8bR6Nvm1N9B5z3u_OZAMbQyOnpNlTvbxgLiKNOHhaw'
}];
var babes = 2;


// GET A CUSTOMER
app.get('/customer/:id', (req, res) => res.send(getCustomer(req.params.id)));

app.post('/customer/:id/edit', function (req, res) {


    var edit = req.body;

    customers[req.params.id - 1].firstName = edit.firstName;
    customers[req.params.id - 1].lastName = edit.lastName;
    customers[req.params.id - 1].email = edit.email;
    customers[req.params.id - 1].phone = edit.phone;
    customers[req.params.id - 1].pic = edit.pic;


    res.send(customers[req.params.id - 1])

})


// ADD A BABE
app.post('/customer/:cid/babe', function (req, res) {

    var babe = req.body;

    var customer = getCustomer(req.params.cid);

    babes++;
    babe.id = babes;
    babe.tracking = false;
    customer.babes.push(babe);
    var date = new Date().getUTCHours()+ ':' + new Date().getMinutes()
    customer.babes[customer.babes.length - 1].msg = [ {
        time: date,
        text: "Pedido Aceito"
    }]

    res.send(customer.babes[customer.babes.length - 1]);
});

// GET A BABE
app.get('/customer/:cid/babe/:bid', function (req, res) {
    res.send(getBabe(getCustomer(req.params.cid), req.params.bid));
});

app.get('/customer/:cid/babes', function (req, res) {
    res.send(getCustomer(req.params.cid).babes);
})

// TRACK A BABE

app.put('/customer/:cid/babe/:bid/track/:plan', function (req, res) {



})


app.get('/detetive/chat/:cid/:bid', function (req, res) { //TODO
    var html = ''

    getCustomer(req.params.cid).babes[req.params.bid - 1].msg.forEach(element => {
        html += ` <div class="detetive-chat-container">
        <img src="https://i.imgur.com/EzxzTa3.png"
            alt="Avatar" id="detetive-avatar">
        <p style="overflow: visible">
            ${element.text}
            <span class="detetive-chat-time">${element.time}</span>
    </div>`
    });

    res.send(html)
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

app.listen(port, () => {
    console.log(` listening on port ${port}!`)
});


const webserver = express();
webserver.use(express.static(__dirname + '/public'))


webserver.get('/', function (req, res) {
    res.redirect('http://' + req.get('host') + '/index.html')
})

webserver.get('/babe-list/', function (req, res) {
    res.sendFile(__dirname + '/views/babe-list.html')
})

webserver.get('/babe-profile/', function (req, res) {
    res.sendFile(__dirname + '/views/babe-profile.html')
})

webserver.get('/babe-form/', function (req, res) {
    res.sendFile(__dirname + '/views/babe-form.html')
})

webserver.get('/babe-add/', function (req, res) {
    res.sendFile(__dirname + '/views/babe-add.html')
})

webserver.get('/babe-map/', function (req, res) {
    res.sendFile(__dirname + '/views/babe-map.html')
})


webserver.get('/payment/', function (req, res) {
    res.sendFile(__dirname + '/views/payment.html')
})

webserver.get('/profile/', function (req, res) {
    res.sendFile(__dirname + '/views/profile.html')
})
/*
webserver.get('/*', function (req,res) {
    res.redirect('http://'+ req.get('host') + '/404.html')
})*/
webserver.listen(80, () => console.log("WebServer on port 80"));