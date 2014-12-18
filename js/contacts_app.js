ContactManager.module('ContactsApp', function(ContactsApp, ContactManager, Backbone, Marionette, $, _) {
    ContactsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'contacts': 'listContacts',
            'contacts/:id': 'showContact',
            'contacts/:id/edit': 'editContact'
        }
    });


    var API = {
        listContacts: function() {
            ContactsApp.List.Controller.listContacts();
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

    /*
    ContactManager.on('start', function(){}); wordt pas uitgevoerd NADAT alle initializers uitgevoerd werden
    */
    ContactManager.addInitializer(function() {
        new ContactsApp.Router({
            controller: API
        })
    })
});