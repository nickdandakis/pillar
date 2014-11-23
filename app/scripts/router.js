'use strict';

var Router = Backbone.Router.extend({
    // content: '',

    initialize: function(){
        this.on('route', this.onRoute);
    },

    onRoute: function(){
        $('#slidemenu li').removeClass('active');

        var frag = Backbone.history.fragment;
        if(frag.indexOf('create/') > -1){
            $('#create-navigation-link').parent().addClass('active');
        } else {
            $(".navbar-toggle").trigger('click');
            $('#'+Backbone.history.fragment+'-navigation-link').parent().addClass('active');
        }
    },

    routes: {
        "": "explore",
        "explore": "explore",
        "create(/:type)": "create",
        "register/:major/:minor": "registerPillar",
        "profile": "profile",
        "mybeacons": "mybeacons",
        "settings": "settings",
        "login": "login"
    },

    explore: function(){
        console.log("Router: explore");

        estimote.onUpdate = function(beacons){
            var model = [];
            $.each(beacons, function(index, beacon){
                if(beacon.distance != undefined){
                    beacon.distance = (Number(beacon.distance) * 3.28).toFixed(1);
                    model.push(beacon);
                }
            });

            if(model == undefined || model.length == 0)
                router.showScanner();
            else 
                router.showList(model);
        }

    },

    create: function(type){
        console.log("Router: create");
        estimote.onUpdate = function(){};

        var template;
        if(type == undefined){
            template = JST['app/scripts/templates/selectContent.hbs'];
        } else {
            template = JST['app/scripts/templates/create' + type.charAt(0).toUpperCase() + type.slice(1) + '.hbs'];
        }
        $('#main').html(template());

        $('#text-upload-button').on('click', function(e){
            var text = $(e.target).prev().val();

            var model = {
                text: text
            };

            router.content = model;
            router.recognizePillar();
        });
    },

    profile: function(){
        console.log("Router: profile");
        alert('Not ready yet');
    },

    mybeacons: function(){
        console.log("Router: mybeacons");
        alert('Not ready yet');
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

    showScanner: function(){
        var template = JST['app/scripts/templates/scanner.hbs'];
        $('#main').html(template());
    },

    showList: function(model){
        var template = JST['app/scripts/templates/list.hbs'];
        $('#main').html(template({beacons:model}));  
    },

    recognizePillar: function(){
        console.log('Router: recognizePillar');

        $('.navbar').hide();
        $('#content').attr('style', 'padding-top: 0');

        var template = JST['app/scripts/templates/recognizePillar.hbs'];
        $('#main').html(template());

        estimote.onUpdate = function(beacons){
            $.each(beacons, function(index, beacon){
                if(beacon.distance != undefined){
                    beacon.distance = (Number(beacon.distance) * 3.28).toFixed(2);

                    console.log(beacon.distance);

                    if(beacon.distance < 0.04){
                        estimote.onUpdate = function(){};
                        $('.navbar').show();
                        $('#content').attr('style', '');

                        var template = JST['app/scripts/templates/registerPillar.hbs'];
                        var model = {
                            major: beacon.major,
                            minor: beacon.minor
                        };
                        $('#main').html(template({beacon:model}));

                        $('form').submit(function(e) {

                        });

                        return false; // break
                    }
                }
            });
        }
    },

    registerPillar: function(major, minor){
        console.log('Router: registerPillar');
    }

});

// Initiate the router
var router = new Router;