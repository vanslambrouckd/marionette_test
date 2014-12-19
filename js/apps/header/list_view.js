ContactManager.module('HeaderApp.List', function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Header = Marionette.ItemView.extend({
        template: _.template($('#header-link').html()),
        events: {
            'click a': 'navigate'
        },
        render: function() {
            //setelement zorgt dat er geen wrapping tag meer nodig is (en dat eventuele events nog meegenomen worden, via .html() gaan events verloren
            this.setElement(this.template(this.model.toJSON()));

            if (this.model.selected) {
                this.$el.addClass('active');
            }
            return this;
        },
        navigate: function(event) {
            event.preventDefault();
            this.trigger('navigate', this.model);
        }

        /*
        template: '#header-link',
        events: {
            'click a': 'navigate'
        },
        onRender: function() {
            //setelement zorgt dat er geen wrapping tag meer nodig is (en dat eventuele events nog meegenomen worden, via .html() gaan events verloren
            //this.setElement(this.template(this.model.toJSON()));
            if (this.model.selected) {
                this.$el.addClass('active');
            }
            return this;
        },
        navigate: function(event) {
            event.preventDefault();
            this.trigger('navigate', this.model);
        }
        */
    })

    List.Headers = Marionette.CompositeView.extend({
        template: '#header-template',
        childView: List.Header,
        childViewContainer: '.menu'
    })
});