const API = 'http://localhost:3000';

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});


function startPage(customer) {
    $('#Profile-Avatar').attr({ src: customer.pic });
    $('#username').html(customer.firstName);
}



$( document ).ready(function () {
   $.ajax({
        url: API + '/customer/1',
        type: 'GET',
        success: function (res) {
            startPage(res);
        }
    })
    tempBabe()
})


function submitBabe() {

    $("#cid").val("1");    

    $.ajax({
        url: API + '/customer/' + $("#cid").val() + "/babe/",
        type: 'POST',
        data: JSON.stringify({
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            address: $("#address").val(),
            locations: [$("#locations1").val(), $("#locations2").val(), $("#locations3").val()]
        }),
        async: true,
        contentType: "application/json",
        success: function() {
            console.log("success");
        },
        error: function(status, error) {
            console.log('Something went wrong: ', status, error);
        }
    })

}


function tempBabe() {
    $.ajax({
        url: '/babe-add/',
        type: 'GET',
        success: function (res) {
            $('#TOCHANGE > div').remove()
            $('#TOCHANGE').append(res)
            $('#addBabes').click(function () {
                tempFormBabe()
            })
        }
    })
}


function tempFormBabe() {
    $.ajax({
        url: '/babe-form/',
        type: 'GET',
        success: function (res) {
            $('#TOCHANGE > div').remove()
            $('#TOCHANGE').append(res)
        }
    })
}

$('#babes-show').click(function () {
    $.ajax({
        url: '/babe-list/',
        type: 'GET',
        success: function (res) {
            $('#TOCHANGE > div').remove()
            $('#TOCHANGE').append(res)
        }
    })
})

function displayBabe(babe) {



}