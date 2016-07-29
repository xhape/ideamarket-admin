import AuthenticatedRoute from 'ideamarket-admin/routes/authenticated';
import CurrentUserSettings from 'ideamarket-admin/mixins/current-user-settings';
import styleBody from 'ideamarket-admin/mixins/style-body';

export default AuthenticatedRoute.extend(styleBody, CurrentUserSettings, {
    titleToken: 'Settings - Apps',

    classNames: ['settings-view-apps'],

    beforeModel() {
        this._super(...arguments);
        return this.get('session.user')
            .then(this.transitionAuthor())
            .then(this.transitionEditor());
    },

    model() {
        return this.store.queryRecord('setting', {type: 'blog,theme,private'});
    }
});
