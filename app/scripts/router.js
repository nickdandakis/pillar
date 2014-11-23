'use strict';

var Router = Backbone.Router.extend({
    initialize: function(){
        this.on('route', this.onRoute);
    },

    routes: {
        "": "explore",
        "explore": "explore",
        "create": "create",
        "profile": "profile",
        "mybeacons": "mybeacons",
        "settings": "settings",
        "login": "login"
    },

    explore: function(){
        console.log("Router: explore");

        estimote.onUpdate = function(beacons){
            console.log(beacons);

            var model = [];
            $.each(beacons, function(index, beacon){
                console.log(beacon.distance);
                if(beacon.distance != undefined){
                    model.push(beacon);
                }
            });

            if(model == undefined || model.length == 0)
                router.showScanner();
            else 
                router.showList(model);
        }

    },

    create: function(){
        console.log("Router: create");
    },

    profile: function(){
        console.log("Router: profile");
    },

    mybeacons: function(){
        console.log("Router: mybeacons");
    },

    settings: function(){
        alert('Not ready yet');
    },

    login: function(){
        alert('Not ready yet');
    },

    loadView: function(view){
        this.view && this.view.remove();
        this.view = view;
    },

    onRoute: function(){
        $('#slidemenu li').removeClass('active');
        $(".navbar-toggle").trigger('click');

        $('#'+Backbone.history.fragment+'-navigation-link').parent().addClass('active');
    },

    showScanner: function(){
        var template = JST['app/scripts/templates/scanner.hbs'];

        $('#main').html(template());
    },

    showList: function(model){
        var template = JST['app/scripts/templates/list.hbs'];

        $('#main').html(template(model));  
    }

});

// Initiate the router
var router = new Router;