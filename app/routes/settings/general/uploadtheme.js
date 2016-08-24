import AuthenticatedRoute from 'ideamarket-admin/routes/authenticated';

export default AuthenticatedRoute.extend({

    model() {
        return this.modelFor('settings.general').settings.get('availableThemes');
    },

    actions: {
        cancel() {
            this.transitionTo('settings.general');
        }
    }
});
