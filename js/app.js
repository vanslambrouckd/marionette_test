var ContactManager = new Marionette.Application();
ContactManager.addRegions({
    mainRegion: '#main-region'
});

ContactManager.on('start', function() {
    /*
    ContactManager.ContactsApp.List.Controller.listContacts();
    */
    if (Backbone.history) {
        Backbone.history.start();

        if (Backbone.history.fragment === '') { //if no #contacts
            Backbone.history.navigate('contacts'); //update url fragment
            ContactManager.ContactsApp.List.Controller.listContacts(); //show contacts
        }
    }
});