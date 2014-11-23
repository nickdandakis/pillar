/*global Hackday, Backbone*/

Hackday.Models = Hackday.Models || {};

(function () {
    'use strict';

    Hackday.Models.Explore = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
