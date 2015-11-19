/** Planets */

//var Planet = function(name, mass, size, liquid, gas, solid){
//    this.name = name;
//    this.mass = mass;
//    this.size = size;
//    this.composition = {
//        liquid: liquid,
//        gas: gas,
//        solid: solid
//    };
//    this.type;
//
//    /**
//     * orbital velocity in meters per second:
//     * v = sqrt((6.674*10^-11 * (planetmass in kg + sunmass in kg)) / distance between 2 bodies in m)
//     */
//    this.orbitalVelocity;
//    this.orbit = function(){};
//    this.placement = function(){};
//    this.removal = function(){};
//}
//
///** Level */
//
//var Level = function(){
//    this.planets = [];
//    this.createPlanet = function(){
//        var planet = new Planet();
//        this.planets[this.planets.length] = planet;
//    }
//}

/** Map */

var Interface = function(){
    this.starAnimate = function(starAmt, maxSize, canvas){
        for(var i = 0; i < starAmt; i++){
            /** Randomly generate a number between 1 and 100 (used for left position) */
            var positionX = Math.floor((Math.random() * 100) + 1);
            /** Randomly generate a number between 1 and 100 (used for top position) */
            var positionY = Math.floor((Math.random() * 100) + 1);

            /** Randomly generate a number between 1 and 8 (used for pixel size)*/
            var size = Math.floor((Math.random() * maxSize) + 1);

            var star = $("<div>", {
                class: "starDecor",
                style: "top: " + positionY + "%" + "; left: " + positionX + "%" + "; width: " + size + "px; height: " + size + "px;"
            });

            if(canvas == "starCanvas") {
                if (size > 5) {
                    $(".large").append(star);
                } else if (size > 3) {
                    $(".mid").append(star);
                } else {
                    $(".small").append(star);
                }
            } else if (canvas == "mapCanvas") {
                $(".mapCanvas").append(star).addClass("mapCanvasZoom");
            }
        }
    };

    this.initialize = function(){
        var interfaceObj = this;
        $.ajax({
            url: "pages/landing.php",
            dataType: 'html',
            success: function(data){

                /** Append the page to .mainContent */
                $(".mainContent").append(data);

                /** Randomly generate 50 stars */
                interfaceObj.starAnimate(50, 8, "starCanvas");

                /** Hide forms upon load */
                $(".landingForm, .loginForm, .registerForm").hide();

                /** Click handler to open both forms */
                $(".landingBtn").click(function(e){
                    e.stopPropagation();
                    $(".customPlaceholder").hide();
                    var openForm = $(this).attr("open-form");
                    $(".landingForm, .landingForm form").hide();
                    $(".landingForm, " + openForm).fadeIn(100);
                    $(".mask, .maskLabel").addClass("removeMask");
                    setTimeout(function(){
                        $(".customPlaceholder").fadeIn();
                    }, 300);
                });

                /** Stop propagation on the forms; closing form by clicking outside of it is desired */
                $(".landingForm").click(function(e){
                    e.stopPropagation();
                });

                /** Close forms if window is clicked (barring form itself) */
                $(window).click(function(){
                    $(".landingForm").fadeOut();
                });

                /** Close form if close button is clicked */
                $(".closeForm").click(function(){
                    $(".landingForm").fadeOut();
                });

                /** Animate sequence */
                $(".submitBtn").click(function(e){

                    e.preventDefault();

                    $(".landingBtn").off("click").animate({
                        opacity: 0
                    }, 500);

                    $(".landingForm").fadeOut();

                    $(".landingBg").animate({
                        opacity: 0
                    }, 2000);

                    setTimeout(function(){

                        setTimeout(function(){
                            $(".landingContent").remove();
                        }, 1500);

                        $(".transition1").addClass("transition1Animation");
                        $(".transition2").addClass("transition2Animation");
                        $(".starDecor").addClass("starAnimate");
                        $(".starCanvas").addClass("starCanvasZoom").animate({
                            opacity: 0
                        }, 200);

                        $(".transition1, .transition2").animate({
                            opacity:0
                        }, 1000);

                        setTimeout(function(){
                            $(".mapBg").animate({
                                opacity:.3
                            }, 1000);

                            interfaceObj.starAnimate(50, 5, "mapCanvas");
                        }, 1000);

                        setTimeout(function(){
                            $(".starCanvas").remove();
                            $(".transition1, .transition2").remove();
                        }, 4000);

                    }, 1500);
                });
            },
            error: function(){
                console.log("failed");
            }
        });
    };

    this.loadLevel = function(){
        $.ajax({
            url: 'pages/level.php',
            dataType: 'html',
            success: function(data){
                console.log(data);
                $(".mainContent").append(data);

                /**Size responds based on user input (use this for other inputs as well) */
                $(".planetSize").keyup(function(){
                    var size = $(this).val();
                    $(".viewPlanet").css({
                        width: size,
                        height: size
                    });
                });

                $(".createPlanet").click(function(){
                    var newPlanet = $(".viewPlanetWindow").html();
                    $(newPlanet).addClass("planetCursor").removeClass(".viewPlanet");
                    $("body").append(newPlanet);
                });

            },
            error: function(){
                console.log("Failed");
            }
        })
    }
};


$(document).ready(function(){

    var playerInterface = new Interface();

    playerInterface.loadLevel();

    //playerInterface.initialize();

});