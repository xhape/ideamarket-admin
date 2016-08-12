/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
import AuthenticatedRoute from 'ideamarket-admin/routes/authenticated';
import CurrentUserSettings from 'ideamarket-admin/mixins/current-user-settings';
import styleBody from 'ideamarket-admin/mixins/style-body';

export default AuthenticatedRoute.extend(styleBody, CurrentUserSettings, {
    titleToken: 'Team - User',

    classNames: ['team-view-user'],

    model(params) {
        return this.store.queryRecord('user', {slug: params.user_slug, include: 'count.posts'});
    },

    serialize(model) {
        return {user_slug: model.get('slug')};
    },

    afterModel(user) {
        this._super(...arguments);

        return this.get('session.user').then((currentUser) => {
            let isOwnProfile = user.get('id') === currentUser.get('id');
            let isIdeaMarketTeam = currentUser.get('isIdeaMarketTeam');

            if (!isIdeaMarketTeam && !isOwnProfile) {
                this.transitionTo('team.user', currentUser);
            }
        });
    },

    deactivate() {
        let model = this.modelFor('team.user');

        // we want to revert any unsaved changes on exit
        if (model && model.get('hasDirtyAttributes')) {
            model.rollbackAttributes();
        }

        model.get('errors').clear();

        this._super(...arguments);
    },

    actions: {
        didTransition() {
            this.modelFor('team.user').get('errors').clear();
        },

        save() {
            this.get('controller.save').perform();
        }
    }
});
