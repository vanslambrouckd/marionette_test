var ContactManager = new Marionette.Application();
ContactManager.addRegions({
    mainRegion: '#main-region'
});

ContactManager.navigate = function(route, options) {
    options = options || {};
    Backbone.history.navigate(route, options);
};

ContactManager.getCurrentRoute = function() {
    return Backbone.history.fragment;
};

ContactManager.on('start', function() {
    /*
    ContactManager.ContactsApp.List.Controller.listContacts();
    */
    if (Backbone.history) {
        Backbone.history.start();

        if (this.getCurrentRoute() === '') { //if no #contacts
            ContactManager.trigger('contacts:list');
        }
    }
});