ContactManager.module('ContactsApp.Show', function(Show, ContactManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showContact: function(model) {
            console.log('showContact called for model', model);
            console.log(Show);

            var contactView = new Show.Contact({
                model: model
            });
            ContactManager.mainRegion.show(contactView);

        }
    }
});