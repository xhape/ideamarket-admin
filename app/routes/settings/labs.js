import AuthenticatedRoute from 'ideamarket-admin/routes/authenticated';
import styleBody from 'ideamarket-admin/mixins/style-body';
import CurrentUserSettings from 'ideamarket-admin/mixins/current-user-settings';

export default AuthenticatedRoute.extend(styleBody, CurrentUserSettings, {
    titleToken: 'Settings - Labs',

    classNames: ['settings'],

    beforeModel() {
        this._super(...arguments);
        return this.get('session.user')
            .then(this.transitionAuthor())
            .then(this.transitionEditor());
    },

    model() {
        return this.store.query('setting', {type: 'blog,theme,private'}).then((records) => {
            return records.get('firstObject');
        });
    }
});
