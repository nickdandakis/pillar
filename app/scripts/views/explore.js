/*global Hackday, Backbone, JST*/

Hackday.Views = Hackday.Views || {};

(function () {
    'use strict';

    Hackday.Views.Explore = Backbone.View.extend({

        template: JST['app/scripts/templates/explore.hbs'],

        tagName: 'div',

        id: 'main',

        className: '',

        events: {},

        initialize: function () {
            // this.listenTo(this.model, 'change', this.render);
            // fix model ting
        },

        render: function (model) {
            // this.$el.html(this.template(this.model.toJSON()));

            var tpl = this.template(model);
            $('#main').html(tpl); // dun goof'd
        }

    });

})();
