ContactManager.module('ContactsApp.Edit', function(Edit, ContactManager, Backbone, Marionette, $, _) {
    Edit.Controller = {
        editContact: function(id) {
            var loadingView = new ContactManager.Common.Views.Loading({
                title: 'Loading the form',
                message: 'I am loading the form, please wait.'
            });

            ContactManager.mainRegion.show(loadingView);

            var fetchingContact = ContactManager.Entities.getContactEntity(id);
            $.when(fetchingContact).done(function(contact) {
                var view;

                if (contact !== undefined) {
                    view = new Edit.Contact({
                        model: contact
                    });

                    view.on('form:submit', function(data) {
                        if (contact.save(data)) {
                            ContactManager.trigger('contact:show', contact.get('id'));
                        }
                    });
                } else {
                    view = new ContactManager.ContactsApp.Show.MissingContact();
                }

                ContactManager.mainRegion.show(view);
            });
        }
    };
});