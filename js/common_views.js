ContactManager.module('Common.Views', function(Views, ContactManager, Backbone, Marionette, $, _) {
    Views.Loading = Marionette.ItemView.extend({
        template: '#loading-view',
        initialize: function(options) {
            var options = options || {};
            this.title = options.title || 'Loading data';
            this.message = options.message || 'Please wait, data is loading...';
        },
        serializeData: function() { //passes vars to template
            return {
                title: this.title,
                message: this.message
            }
        },
        onShow: function() {
            var opts = {
                lines: 13, // The number of lines to draw
                length: 20, // The length of each line
                width: 10, // The line thickness
                radius: 30, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#000', // #rgb or #rrggbb or array of colors
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: '50%', // Top position relative to parent
                left: '50%' // Left position relative to parent
            };

            $('#spinner').spin(opts);
        }
    });

    Views.Form = Marionette.ItemView.extend({
        template: '#contact-form',
        /*
        tagName: 'form',
        className: 'ui form',
        */
        events: {
            'click .jsSubmit': 'submitContact'
        },
        initialize: function() {
            Backbone.Validation.bind(this);
        },
        submitContact: function(event) {
            event.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('form:submit', data);
        }
    });
});