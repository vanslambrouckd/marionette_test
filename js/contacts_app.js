ContactManager.module('ContactsApp', function(ContactsApp, ContactManager, Backbone, Marionette, $, _) {
    ContactsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'contacts': 'listContacts'
        }
    });


    var API = {
        listContacts: function() {
            ContactsApp.List.Controller.listContacts();
            console.log('route to list contacts was triggered');
        }
    };

    ContactManager.on('contacts:list', function() {
        ContactManager.navigate('contacts');
        API.listContacts();
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