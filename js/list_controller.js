ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = {
        listContacts: function(criterion) {

            var loadingView = new ContactManager.Common.Views.Loading({
                title: 'Loading list view',
                message: 'I am loading the list view please wait...'
            });
            ContactManager.mainRegion.show(loadingView);

            var fetchingContacts = ContactManager.request('contact:entities');

            var contactsListLayout = new List.Layout();
            var contactsListPanel = new List.Panel();

            $.when(fetchingContacts).done(function(contacts) {
                var filteredContacts = ContactManager.Entities.FilteredCollection({
                    collection: contacts,
                    filterFunction: function(filterCriterion) {
                        var criterion = filterCriterion.toLowerCase();
                        return function(contact) {
                            if (contact.get('firstName').toLowerCase().indexOf(criterion) !== -1
                                || contact.get('lastName').toLowerCase().indexOf(criterion) !== -1
                                || contact.get('phoneNumber').toLowerCase().indexOf(criterion) !== -1) {
                                return contact;
                            }

                        }
                    }
                });

                if (criterion) {
                    filteredContacts.filter(criterion);

                    /*
                    when typeing in #contacts/filter/criterion:azerty,
                    the jsSearch field has to contain the criterion value 
                    code can only be executed once (.once)
                    */
                    contactsListPanel.once('show', function() {
                        contactsListPanel.triggerMethod('set:filter:criterion', criterion);
                    })
                }

                var contactsListView = new List.Contacts({
                    collection: filteredContacts
                });

                contactsListLayout.on('show', function() {
                    contactsListLayout.panelRegion.show(contactsListPanel);
                    contactsListLayout.contactsRegion.show(contactsListView);
                });

                contactsListPanel.on('contacts:filter', function(filterCriterion) {
                    filteredContacts.filter(filterCriterion);
                    ContactManager.trigger('contacts:filter', filterCriterion);
                });

                contactsListPanel.on('contact:new', function() {
                    var newContact = new ContactManager.Entities.Contact();

                    var view = new ContactManager.ContactsApp.New.Contact({
                        model: newContact
                    });
                    view.on('form:submit', function(data) {
                        if (newContact.save(data)) {
                            contacts.add(newContact); //why?
                            view.trigger('modal:close');
                            var newContactView = contactsListView.children.findByModel(newContact);

                            if (newContactView) {
                                newContactView.flash('positive');
                            }
                        }
                    });

                    ContactManager.modalRegion.show(view);
                });

                contactsListView.on('childview:contact:delete', function(childView, model) {
                    model.destroy();
                });

                contactsListView.on('childview:contact:highlight', function(childView, model) {
                    console.log('highlighting toggled on model: ', model);
                });

                contactsListView.on('childview:contact:show', function(childView, model) {
                    ContactManager.trigger('contact:show', model.get('id'));
                });

                contactsListView.on('childview:contact:edit', function(childView, model) {
                    var view = new ContactManager.ContactsApp.Edit.Contact({
                        model: model
                    });

                    view.on('form:submit', function(data) {
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