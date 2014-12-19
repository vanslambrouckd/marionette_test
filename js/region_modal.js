Marionette.Region.Modal = Marionette.Region.extend({
    /*
    backbone marionette.js a gente introduction p 153
    */
    onShow: function(view) {
        var self = this;

        this.listenTo(view, 'modal:close', this.closeDialog);

        ContactManager.modalRegion.show(view);

        var modalOpts = {
            //closable: false,
            onDeny: function() {
                self.closeDialog();
            },
        }
        this.$el.modal(modalOpts).modal('show');
    },
    closeDialog: function() {
        this.stopListening();
        //this.close(); //todo: check if zombie view issue: http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
        this.$el.modal('hide');
    }
});