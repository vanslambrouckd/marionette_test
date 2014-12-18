ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Contact = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#contact-list-item'
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
        className: 'table table-hover',
        template: '#contact-list',
        childView: List.Contact,
        itemViewContainer: 'tbody'
    });
});