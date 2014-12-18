ContactManager.module('ContactsApp.Edit', function(Edit, ContactManager, Backbone, Marionette, $, _) {
    Edit.Contact = Marionette.ItemView.extend({
        template: '#contact-form',
        tagName: 'form',
        className: 'ui form',
        events: {
            'click #editContact': 'editContact'
        },
        initialize: function() {
            Backbone.Validation.bind(this);
        },
        editContact: function(event) {
            event.preventDefault();
            var data = Backbone.Syphon.serialize(this); //syphon heeft formtag nodig + name attr op inputs
            this.trigger('form:submit', data);
        }
    });
});