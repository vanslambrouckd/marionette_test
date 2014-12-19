/*
backbone marionette.js a gente introduction
*/
_.extend(Backbone.Validation.callbacks, {
    //http://jsfiddle.net/thedersen/udXL5/

    _clearErrors: function(view, attr) {
        var $el = view.$('[name=' + attr + ']');
        var $field = $el.closest('.field');
        $field.removeClass('error');
        $field.find('.prompt').remove();
    },
    valid: function(view, attr, selector) {
        this._clearErrors(view, attr);
    },
    invalid: function(view, attr, error, selector) {
        this._clearErrors(view, attr);

        var $el = view.$('[name=' + attr + ']');
        var $field = $el.closest('.field');

        $field.addClass('error');
        $field.append('<div class="ui red pointing prompt label transition visible">' + error + '</div>');
    }
});

var ContactManager = new Marionette.Application();
ContactManager.addRegions({
    mainRegion: '#main-region',
    modalRegion: Marionette.Region.Modal.extend({
        el: '#modal-region'
    })
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