info
=====

list_view: 
jsShow click => trigger(contact:show) => luisteren naar event in de controller (view.on(contact:show, function() {
	ContactManager.trigger(contact:show, id);
});

In contacts_app.js luister je naar de event
ContactManager.on('contact:show', function(id) {
    ContactManager.navigate('contacts/' + id); //zodat url upgedate wordt
    API.showContact(id);
});

trigger gaat altijd van view naar controller naar Contactmanager

todo
====
form validation: validate on input blur (ipv form submit)
modal: view needs to be wrapped in <div class="ui modal"> for correct layout, don't know how