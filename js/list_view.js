ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Layout = Marionette.LayoutView.extend({
        template: '#contact-list-layout',
        regions: {
            panelRegion: '#panel-region',
            contactsRegion: '#contacts-region'
        }
    });

    List.Panel = Marionette.ItemView.extend({
        template: '#contact-list-panel',
        triggers: {
            'click .jsNew': 'contact:new'
        },
        events: {
            'submit #filter-form': 'filterContacts'
        },
        ui: {
            criterion: 'input.jsSearch'
        },
        filterContacts: function(event) {
            event.preventDefault();

            var criterion = this.$('.jsSearch').val();
            this.trigger('contacts:filter', criterion);
        },
        onSetFilterCriterion: function(criterion) {
            //triggered from list_controller.js (if (criterion) {})
            this.ui.criterion.val(criterion);
        }
    });

    List.Contact = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#contact-list-item',
        events: {
            'click': 'highlightName',
            'click .jsDelete': 'deleteContact',
            'click .jsShow': 'showContact',
            'click .jsEdit': 'editContact'
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
        },
        showContact: function(event) {
            event.preventDefault();
            event.stopPropagation();
            this.trigger('contact:show', this.model);
        },
        editContact: function(event) {
            event.preventDefault();
            event.stopPropagation();
            this.trigger('contact:edit', this.model);
            console.log('edit');
        },
        flash: function(cssClass) {
            var $el = this.$el;
            $el.toggleClass(cssClass).fadeIn(2000, function() {
                setTimeout(function() {
                    $el.toggleClass(cssClass);
                }, 500)
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

    var noContactsView = Marionette.ItemView.extend({
        template: '#contact-list-none',
        tagName: 'tr',
        className: 'error'
    })

    List.Contacts = Marionette.CompositeView.extend({
        tagName: 'table',
        className: 'ui table',
        template: '#contact-list',
        childView: List.Contact,
        emptyView: noContactsView,
        childViewContainer: 'tbody',
        onChildviewContactDelete: function() {
            /*
            https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.functions.md#marionettetriggermethod
            deze functie wordt automatisch uitgevoerd omwille van 
            this.trigger('contact:delete', this.model); in de childview (List.Contact)
            */
            this.$el.fadeOut(1000, function() {
                $(this).fadeIn(1000);
            });
        },
        /*
        initialize: function() {
            this.listenTo(this.collection, 'reset', function() {
                this.appendHtml = function(CollectionView, itemView, index) {
                    //prepend last added item
                    collectionView.$el.prepend(itemView.el);
                }
            });
        },
        onRenderCollection: function() {
            this.appendHtml = function(CollectionView, itemView, index) {
                //prepend last added item
                collectionView.$el.prepend(itemView.el);
            }
        }
        */
    });
});