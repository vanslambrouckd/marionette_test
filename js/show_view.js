ContactManager.module('ContactsApp.Show', function(Show, ContactManager, Backbone, Marionette, $, _) {
    Show.Contact = Marionette.ItemView.extend({
        template: '#contact-view',
        events: {
            'click .jsEdit': 'editContact'
        },
        editContact: function(event) {
            event.preventDefault();
            this.trigger('contact:edit', this.model);
        }
    });

    Show.MissingContact = Marionette.ItemView.extend({
        template: '#missing-contact-view'
    });
});