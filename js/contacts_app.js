ContactManager.module('ContactsApp', function(ContactsApp, ContactManager, Backbone, Marionette, $, _) {
    ContactsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'contacts(/filter/criterion::criterion)': 'listContacts',
            'contacts/:id': 'showContact',
            'contacts/:id/edit': 'editContact',
        }
    });


    var API = {
        listContacts: function(criterion) {
            ContactsApp.List.Controller.listContacts(criterion);
            console.log('route to list contacts was triggered');
        },
        showContact: function(id) {
            ContactsApp.Show.Controller.showContact(id);
        },
        editContact: function(id) {
            ContactsApp.Edit.Controller.editContact(id);
        }
    };

    ContactManager.on('contacts:list', function() {
        ContactManager.navigate('contacts'); //update url fragment
        API.listContacts();
    });

    ContactManager.on('contact:show', function(id) {
        ContactManager.navigate('contacts/' + id); //zodat url upgedate wordt
        API.showContact(id);
    });

    ContactManager.on('contact:edit', function(id) {
        ContactManager.navigate('contacts/' + id + '/edit');
        API.editContact(id);
    });

    ContactManager.on('contacts:filter', function(criterion) {
        if (criterion) {
            ContactManager.navigate('contacts/filter/criterion:' + criterion);
        } else {
            ContactManager.navigate('contacts');
        }
    });

    /*
    ContactManager.on('start', function(){}); wordt pas uitgevoerd NADAT alle initializers uitgevoerd werden
    */
    ContactManager.addInitializer(function() {
        new ContactsApp.Router({
            controller: API
        })
    })
});