'use strict';

var Router = Backbone.Router.extend({
    initialize: function(){

    },

    routes: {
        "": "explore",
        "explore": "explore",
        "create": "create",
        "profile": "profile",
        "mybeacons": "mybeacons"
    },

    explore: function(){
        console.log("Router: explore");

        
    },

    create: function(){
        console.log("Router: create");
    },

    profile: function(){
        console.log("Router: profile");
    },

    mybeacons: function(){
        console.log("Router: mybeacons");
    }

});

// Initiate the router
var router = new Router;

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start({
    root: '/hackday/dist/'
});