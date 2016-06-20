'use strict';

$(document).ready(function() {
    skipToMyLou.events();
    $('.mainPage').addClass("hidden");
});

var skipToMyLou = {
    events: function events() {
        var RatingData = 0;

        /* USER NAME AND PASSWORD */
        $('.signIn').on("click", function(event) {
            event.preventDefault();
            $.ajax({
                url: "/login",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    username: $("#Username").val(),
                    password: $('#Password').val()
                }),
                success: function success(data) {
                    console.log("This worked", data);
                    $('.logInPage').fadeToggle(1000);
                    $(".mainPage").removeClass("hidden").toggle();
                    $(".mainPage").fadeToggle(1000);
                },
                error: function error(err) {
                    console.error("OH CRAP", err);
                    alert("HOLD IT!");
                }
            });
        });
        // LOGOUT BUTTON
        // $('.logout')on('click', function(event){
        //   event.preventDefault();
        //   console.log('You logged out', data);
        //   $('.mainPage').addClass('hidden');
        //   $('.logInPage').fadeToggle(1000);
        // })
        /*SUBMIT TOILET INFORMATION */
        $('.btn-primary').on("click", function(event) {
            event.preventDefault();
            if ($('#isClean').val() === "Yep!") {
                clean = true;
            } else {
                clean = false;
            }
            $.ajax({
                url: "/skipToTheLoo",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    description: $("#exampleTextarea").val(),
                    latitude: $("#Latitude").val(),
                    longitude: $("#Longitude").val(),
                    visitDate: $("#When").val(),
                    isClean: clean,
                    rating: RatingData
                }),
                success: function success(data) {
                    console.log("DATA SENT", data);
                },
                error: function error(err) {
                    console.error("OOOPS!!!", err);
                }
            });
        });
        /* LOG RATING */
        $('.logo').on("click", function() {
            DataFields = $(this).data();
            RatingData = DataFields.id;
            $(this).css("border-color", "red");
        });
    },
    Read: function Read() {
        $.ajax({
            method: "GET",
            url: "/skipToTheLoo",
            success: function success(data) {
                console.log(data);
                data = JSON.parse(data);
                data.forEach(function(item) {
                    var mark = new google.maps.Marker({
                        position: {
                            latitude: item.Latitude,
                            longitude: item.Longitude
                        },
                        map: $('.map'),
                        title: item.description
                    });
                });
            },
            error: function error(err) {
                console.err("Oh SHit!!!", data);
            }
        });
    }
};