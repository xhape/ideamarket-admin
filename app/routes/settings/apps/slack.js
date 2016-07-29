import AuthenticatedRoute from 'ideamarket-admin/routes/authenticated';
import CurrentUserSettings from 'ideamarket-admin/mixins/current-user-settings';
import styleBody from 'ideamarket-admin/mixins/style-body';

export default AuthenticatedRoute.extend(styleBody, CurrentUserSettings, {
    titleToken: 'Settings - Apps - Slack',

    classNames: ['settings-view-apps-slack'],

    model() {
        return this.modelFor('settings.apps').get('slack.firstObject');
    },

    setupController(controller) {
        this._super(...arguments);

        controller.set('settings', this.modelFor('settings.apps'));
    }
});
