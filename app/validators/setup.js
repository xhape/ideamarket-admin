import NewUserValidator from 'ideamarket-admin/validators/new-user';

export default NewUserValidator.create({
    properties: ['name', 'email', 'password', 'session'],
    session(model) {
        let usingOAuth = model.get('config.ghostOAuth');
        let isAuthenticated = model.get('session.isAuthenticated');

        if (usingOAuth && !isAuthenticated) {
            model.get('errors').add('session', 'Please connect a Ghost.org account before continuing');
            model.get('hasValidated').pushObject('session');
            this.invalidate();
        }
    }
});
