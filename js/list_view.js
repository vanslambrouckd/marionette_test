ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Contact = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#contact-list-item',
        events: {
            'click': 'highlightName',
            'click .jsDelete': 'deleteContact'
        },
        highlightName: function(event) {
            event.preventDefault();
            this.$el.toggleClass('warning');
            this.trigger('contact:highlight', this.model);
        },
        deleteContact: function(event) {
            event.stopPropagation(); //zodat highlightname niet uitgevoerd wordt, (event bubbling)

            /*
            model delete moet in view, view is enkel om dingen weer te geven:
            doorgeven aan controller
            */
            this.trigger('contact:delete', this.model);
        },
        remove: function() {
            //marionette calls remove pethod when model is from the collection
            //standaard wordt de tr gehide: deleten:
            //this.$el.fadeOut(); 
            var self = this;
            this.$el.fadeOut(function() {
                Marionette.ItemView.prototype.remove.call(self);
            });
        }
    });

    /*
    List.Contacts = Marionette.CollectionView.extend({
        tagName: 'ul',
        childView: List.Contact
    });
    */

    /*
    composite view:
    om de tbody itemcollection te wrappen in table en theader tag
    (=samengestelde view)
    */
    List.Contacts = Marionette.CompositeView.extend({
        tagName: 'table',
        className: 'ui table',
        template: '#contact-list',
        childView: List.Contact,
        childViewContainer: 'tbody'
    });
});