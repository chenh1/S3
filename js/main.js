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
    this.initialize = function(){
        $.ajax({
            url: "pages/landing.php",
            dataType: 'html',
            success: function(data){

                $(".mainContent").append(data);

                $(".landingForm, .loginForm, .registerForm").hide();

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

                $(".landingForm").click(function(e){
                    e.stopPropagation();
                });

                $(window).click(function(){
                    $(".landingForm").fadeOut();
                });

                $(".closeForm").click(function(){
                    $(".landingForm").fadeOut();
                });
            },
            error: function(){
                console.log("failed");
            }
        });
    };
};


$(document).ready(function(){

    var playerInterface = new Interface();

    playerInterface.initialize();

});