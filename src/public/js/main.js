const API = 'http://192.168.248.189:3000';

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});


function startPage(customer) {
    $('#Profile-Avatar').attr({ src: customer.pic });
    $('#username').html(customer.firstName);
}


function startin() {
    $("#cid").val(getRandomInt(1, 2));
    $.ajax({
        url: API + '/customer/' + $("#cid").val(),
        type: 'GET',
        success: function (res) {
            startPage(res);
        }
    })
}
$(document).ready(function () {
    startin()
    tempBabe()
})

$('#canttouchmybabe').click(function () {
    tempBabe()
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function submitBabe() {
    $.ajax({
        url: API + '/customer/' + $("#cid").val() + "/babe/",
        type: 'POST',
        data: JSON.stringify({
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            address: $("#address").val(),
            locations: [$("#locations1").val(), $("#locations2").val(), $("#locations3").val()],
            pic: $("#img-url").val(),
        }),
        async: true,
        contentType: "application/json",
        success: function (p) {
            $.ajax({
                url: '/payment/',
                type: 'GET',
                success: function (res) {
                    $('#TOCHANGE > div').remove()
                    $('#TOCHANGE').append(res)
                    $("#bid").val(p.id)
                    console.log(p.id);

                },
                error: function (status, error) {
                    console.log('Something went wrong: ', status, error);
                }
            })
        },
        error: function (status, error) {
            console.log('Something went wrong: ', status, error);
        }
    })
}

function setPlan(plan) {
    $.ajax({
        url: API + '/customer/' + $("#cid").val() + '/babe/' + $("#bid").val(),
        type: 'GET',
        success: function (res) {
            if (plan === 1) {
                res.plan = 'Basic';
            } else if (plan === 2) {
                res.plan = 'Intermediate';
            } else if (plan === 3) {
                res.plan = 'Pro';
            }
            showBabesList();
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
            $.ajax({
                url: API + '/customer/' + $("#cid").val() + '/babes/',
                type: 'GET',
                success: function (res) {
                    if (res.length >= 1) {
                        $('#babyadd-page').html('Do you know where your babe is going?')
                    }
                },
                error: function (status, error) {
                    console.log('Something went wrong: ', status, error);
                }
            })

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

$('#babes-list').click(function () {
    showBabesList();
})

function showBabesList() {
    $.ajax({
        url: '/babe-list/',
        type: 'GET',
        success: function (res) {
            $('#TOCHANGE > div').remove()
            $('#TOCHANGE').append(res)
            displayBabeList();
        },
        error: function (status, error) {
            console.log('Something went wrong: ', status, error);
        }
    })
}


function profile() {
    $.ajax({
        url: '/profile/',
        type: 'GET',
        success: function (res) {
            $('#TOCHANGE > div').remove()
            $('#TOCHANGE').append(res)
            $.ajax({
                url: API + '/customer/' + $("#cid").val(),
                type: 'GET',
                success: function (res) {
                    $('#user-profile-img-pf').attr('src', res.pic)
                    $('#user-name-pf').html(res.firstName + ' ' + res.lastName)
                    $('#firstName').val(res.firstName);
                    $('#lastName').val(res.lastName);
                    $('#email').val(res.email);
                    $('#phone').val(res.phone);
                    $('#img-url').val(res.pic);
                }
            })


            $('#edit-profile').click(function () {
                console.log('SEND');
                console.log($("#cid").val());


                $.ajax({
                    url: API + '/customer/' + $("#cid").val() + '/edit',
                    type: 'POST',
                    data: JSON.stringify({
                        firstName: $("#firstName").val(),
                        lastName: $("#lastName").val(),
                        email: $("#email").val(),
                        phone: $("#phone").val(),
                        pic: $("#img-url").val(),
                    }),
                    async: true,
                    contentType: "application/json",
                    success: function (res) {
                        startin()
                        profile()
                    }
                })
            })
        },
        error: function (status, error) {
            console.log('Something went wrong: ', status, error);
        }
    })
}

$('#user-profile').click(function () {
    profile()
})

function displayBabeProfile(id) {
    $.ajax({
        url: API + '/customer/' + $("#cid").val() + '/babe/' + id,
        type: 'GET',
        success: function (res) {
            $("#babe-name").text(res.firstName + ' ' + res.lastName);
            $("#detail-email").text(res.email);
            $("#detail-phone").text(res.phone);

            $('#babeprofile-img').attr("src", res.pic);

            if (res.tracking === false) {
                $("#detail-track").text('None');
            } else {
                $("#detail-track").text('Active');
            }
        }
    })

}

function displayBabeList() {
    $.ajax({
        url: API + '/customer/' + $("#cid").val() + '/babes/',
        type: 'GET',
        success: function (res) {
            $("babe-list").append(
                `<p hidden class='idHOLDER' id='${$("#cid").val()}'>This paragraph should be hidden.</p>`
            )
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id);

                $(".babe-list").append(
                    `<div>
                    <div class='pic'><a class='babe-pic' id=${res[i].id}><img id='babe${res[i].id}'></a></div> 
                    <div><h2 id='name${res[i].id}'>name</div>
                    </div>`
                )

                $("#babe" + res[i].id).attr("src", res[i].pic);
                $("#babe" + res[i].id).attr("width", "200px");
                $("#babe" + res[i].id).attr("height", "200px");
                $("#name" + res[i].id).text(res[i].firstName);
            }

            $(".babe-pic").click(function () {
                const id = $('#cid').val()
                const babeID = $(this).attr('id');

                $.ajax({
                    url: '/babe-profile/',
                    type: 'GET',
                    success: function (res) {
                        $('#TOCHANGE > div').remove()
                        $('#TOCHANGE').append(res)
                        displayBabeProfile(babeID);
                        getDetetiveMsg(id, babeID)
                    }
                })
            })

        },
        error: function (status, error) {
            console.log('Something went wrong: ', status, error);
        }
    })
}


function getDetetiveMsg(userid, babeid) {
    $.ajax({
        url: API + '/detetive/chat/' + userid + '/' + babeid,
        type: 'GET',
        success: function (res) {
            $('#msgContainer > div').remove()
            $('#msgContainer').append(res)
            displayBabeList();
        },
        error: function (status, error) {
            console.log('Something went wrong: ', status, error);
        }
    })
}

function displayBabe(babe) {

    $("#detail-email").text(babe.email);
    $("#detail-phone").text(babe.phone);

    if (babe.tracking === false) {
        $("#detail-track").text("None");
    } else {
        $("#detail-track").text("Active");
    }

}




