import RSVP from 'rsvp';
import injectService from 'ember-service/inject';
import AuthenticatedRoute from 'ideamarket-admin/routes/authenticated';
import CurrentUserSettings from 'ideamarket-admin/mixins/current-user-settings';
import styleBody from 'ideamarket-admin/mixins/style-body';

export default AuthenticatedRoute.extend(styleBody, CurrentUserSettings, {
    titleToken: 'Settings - General',

    classNames: ['settings-view-general'],

    config: injectService(),

    beforeModel() {
        this._super(...arguments);
        return this.get('session.user')
            .then(this.transitionAuthor())
            .then(this.transitionEditor());
    },

    model() {
        return RSVP.hash({
            settings: this.store.queryRecord('setting', {type: 'blog,theme,private'}),
            availableTimezones: this.get('config.availableTimezones')
        });
    },

    setupController(controller, models) {
        controller.set('model', models.settings);
        controller.set('availableTimezones', models.availableTimezones);
    },

    actions: {
        save() {
            this.get('controller').send('save');
        }
    }
});
