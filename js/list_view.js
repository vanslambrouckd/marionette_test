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
        },
        deleteContact: function(event) {
            event.stopPropagation(); //zodat highlightname niet uitgevoerd wordt, (event bubbling)
            this.model.collection.remove(this.model);
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