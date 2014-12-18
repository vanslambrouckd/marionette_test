ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = {
        listContacts: function() {
            var contacts = ContactManager.request('contact:entities');

            var contactsListView = new List.Contacts({
                collection: contacts
            });

            contactsListView.on('childview:contact:delete', function(childView, model) {
                contacts.remove(model);
            });

            contactsListView.on('childview:contact:highlight', function(childView, model) {
                console.log('highlighting toggled on model: ', model);
            });

            contactsListView.on('childview:contact:show', function(childView, model) {
                console.log('received childview:contact:show event on model', model);

                ContactManager.navigate('contacts/' + model.get('id')); //zodat url upgedate wordt
                ContactManager.ContactsApp.Show.Controller.showContact(model);
            });

            ContactManager.mainRegion.show(contactsListView);
        }
    }
});