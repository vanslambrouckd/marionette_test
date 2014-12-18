ContactManager.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
    Entities.Contact = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('contact-backbone'),
        defaults: {
            firstName: '',
            phoneNumber: 'No phone number'
        },
    });

    Entities.ContactCollection = Backbone.Collection.extend({
        model: Entities.Contact,
        comparator: 'firstName',
        localStorage: new Backbone.LocalStorage('contact-backbone')
    });

    var contacts; //private var

    var initializeContacts = function() { //private function
        var conts = [ //private var
            {
                id: 1,
                firstName: 'david',
                lastName: 'van'
            },
            {
                id: 2,
                firstName: 'Bob',
                lastName: 'Brigham',
                phoneNumber: '66998877'
            }
        ];

        var contacts = new Entities.ContactCollection(conts);
        console.log(contacts);
        contacts.forEach(function(contact) {
            contact.save();
        });
        return contacts;
    }

    Entities.getContactEntities = function() {
        var contacts = new Entities.ContactCollection();

        var defer = $.Deferred();
        setTimeout(function() {
            contacts.fetch({
                success: function(data) {
                    defer.resolve(data);
                }
            });
        }, 300);


        var promise = defer.promise();
        $.when(promise).done(function(contacts) {
            console.log(contacts.length);
            if (contacts.length === 0) {
                console.log('initializeContacts');
                var models = initializeContacts();
                contacts.reset(models);

            }
        });
        return promise;
    }

    Entities.getContactEntity = function(contactId) {
        var contact = new Entities.Contact({
            id: contactId
        });

        var defer = $.Deferred();
        //test: dealing with latency
        setTimeout(function() {
            contact.fetch({
                success: function(data) {
                    defer.resolve(data);
                },
                error: function(data) {
                    defer.resolve(undefined);
                }
            })
        }, 400);
        return defer.promise();
    }

    ContactManager.reqres.setHandler('contact:entity', function(id) {
        return Entities.getContactEntity(id);
    });

    ContactManager.reqres.setHandler('contact:entities', function() {
        return Entities.getContactEntities();
    });
});