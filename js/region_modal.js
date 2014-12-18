Marionette.Region.Modal = Marionette.Region.extend({
    /*
    backbone marionette.js a gente introduction p 153
    */
    onShow: function(view) {
        var self = this;

        this.listenTo(view, 'modal:close', this.closeDialog);

        ContactManager.modalRegion.show(view);

        var modalOpts = {
            closable: false,
            onDeny: function() {
                self.closeDialog();
            },
        }
        console.log(this.$el);
        this.$el.modal(modalOpts).modal('show');
    },
    closeDialog: function() {
        this.stopListening();
        this.close();
        this.$el.modal('hide');
    }
});