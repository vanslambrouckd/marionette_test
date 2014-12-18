ContactManager.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
    Entities.Contact = Backbone.Model.extend({
        defaults: {
            firstName: '',
            phoneNumber: 'No phone number'
        }
    });

    Entities.ContactCollection = Backbone.Collection.extend({
        model: Entities.Contact,
        comparator: 'firstName'
    });

    var contacts;

    Entities.initializeContacts = function() { //private function
        var conts = [ //private var
            {
                firstName: 'david',
                lastName: 'van'
            },
            {
                firstName: 'Bob',
                lastName: 'Brigham',
                phoneNumber: '66998877'
            }
        ];

        if (contacts === undefined) {
            contacts = new Entities.ContactCollection(conts);
        }
        return contacts;
    }
});