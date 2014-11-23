/*global Hackday, $*/


window.Hackday = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');

        // Remove tap delay
        FastClick.attach(document.body);

        // TODO: Prevent elastic scrolling 

        // Start Backbone history a necessary step for bookmarkable URL's
        Backbone.history.start({
            root: '/hackday/dist/'
        });

        // Enter your ids or classes
        var toggler = '.navbar-toggle';
        var pagewrapper = '#content';
        var navigationwrapper = '.navbar-header';
        var menuwidth = '100%'; // the menu inside the slide menu itself
        var slidewidth = '50%';
        var menuneg = '-100%';
        var slideneg = '-50%';

        var fillHeight = document.height - 50;
        $('#slidemenu').attr('style', 'height: '+fillHeight+'px');
        
        $("#slide-nav").on("click", toggler, function (e) {
            var selected = $(this).hasClass('slide-active');

            $('#slidemenu').stop().animate({
                left: selected ? menuneg : '0px'
            });

            $('#navbar-height-col').stop().animate({
                left: selected ? slideneg : '0px'
            });

            $(pagewrapper).stop().animate({
                left: selected ? '0px' : slidewidth
            });

            $(this).toggleClass('slide-active', !selected);
            $('#slidemenu').toggleClass('slide-active');

            $('#content, .container, .navbar, body, .navbar-header').toggleClass('slide-active');
        });

        var selected = '#slidemenu, #content, body, .navbar, .navbar-header';

        $(window).on("resize", function () {
            if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
                $(selected).removeClass('slide-active');
            }
        });
    }
};

$(document).ready(function () {
    'use strict';
    Hackday.init();
});