ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = {
        listContacts: function() {

            var loadingView = new ContactManager.Common.Views.Loading({
                title: 'Loading list view',
                message: 'I am loading the list view please wait...'
            });
            ContactManager.mainRegion.show(loadingView);

            var fetchingContacts = ContactManager.request('contact:entities');

            $.when(fetchingContacts).done(function(contacts) {
                var contactsListView = new List.Contacts({
                    collection: contacts
                });

                contactsListView.on('childview:contact:delete', function(childView, model) {
                    model.destroy();
                });

                contactsListView.on('childview:contact:highlight', function(childView, model) {
                    console.log('highlighting toggled on model: ', model);
                });

                contactsListView.on('childview:contact:show', function(childView, model) {
                    console.log('received childview:contact:show event on model', model);

                    ContactManager.trigger('contact:show', model.get('id'));
                });

                ContactManager.mainRegion.show(contactsListView);
            });
        }
    }
});