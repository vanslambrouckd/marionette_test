ContactManager.module('ContactsApp.Edit', function(Edit, ContactManager, Backbone, Marionette, $, _) {
    Edit.Contact = Marionette.ItemView.extend({
        template: '#contact-form',
        events: {
            'click #editContact': 'editContact'
        },
        editContact: function(event) {
            event.preventDefault();
            console.log('form edit');
        }
    });
});