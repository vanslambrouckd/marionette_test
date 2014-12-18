Marionette.Region.Modal = Marionette.Region.extend({
    /*
    backbone marionette.js a gente introduction p 153
    */
    onShow: function(view) {
        var self = this;

        this.listenTo(view, 'modal:close', this.closeDialog);

        ContactManager.modalRegion.show(view);

        var dialogOpts = {
            closable: false,
            onDeny: function() {
                self.closeDialog();
            },
        }
        $('#modal-region').modal({}).modal('show');
    },
    closeDialog: function() {
        this.stopListening();
        this.close();
        $('#modal-region').modal().modal('hide');
    }
});