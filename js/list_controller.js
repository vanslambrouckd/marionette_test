ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = {
        listContacts: function() {

            var loadingView = new ContactManager.Common.Views.Loading({
                title: 'Loading list view',
                message: 'I am loading the list view please wait...'
            });
            ContactManager.mainRegion.show(loadingView);

            var fetchingContacts = ContactManager.request('contact:entities');

            var contactsListLayout = new List.Layout();
            var contactsListPanel = new List.Panel();

            $.when(fetchingContacts).done(function(contacts) {
                var contactsListView = new List.Contacts({
                    collection: contacts
                });

                contactsListLayout.on('show', function() {
                    contactsListLayout.panelRegion.show(contactsListPanel);
                    contactsListLayout.contactsRegion.show(contactsListView);
                });

                /**/
                //HIER DOORDOEN p148
                contactsListPanel.on('contact:new', function() {
                    var newContact = new ContactManager.Entities.Contact();

                    var view = new ContactManager.ContactsApp.New.Contact({
                        model: newContact
                    });
                    view.on('form:submit', function(data) {
                        if (newContact.save(data)) {
                            contacts.add(newContact); //why?
                            view.trigger('modal:close');
                            contactsListView.children.findByModel(newContact).flash('positive');
                        }
                    });

                    ContactManager.modalRegion.show(view);
                });
                /**/

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

                contactsListView.on('childview:contact:edit', function(childView, model) {
                    var view = new ContactManager.ContactsApp.Edit.Contact({
                        model: model
                    });
                    console.log('childView', childView);

                    view.on('form:submit', function(data) {
                        console.log(data);
                        if (model.save(data)) {
                            childView.render(); //childView = table row
                            view.trigger('modal:close');
                            childView.flash('positive');
                        }
                    });
                    ContactManager.modalRegion.show(view);
                });

                ContactManager.mainRegion.show(contactsListLayout);
            });
        }
    }
});