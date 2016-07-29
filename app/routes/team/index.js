import AuthenticatedRoute from 'ideamarket-admin/routes/authenticated';
import CurrentUserSettings from 'ideamarket-admin/mixins/current-user-settings';
import PaginationMixin from 'ideamarket-admin/mixins/pagination';
import styleBody from 'ideamarket-admin/mixins/style-body';

export default AuthenticatedRoute.extend(styleBody, CurrentUserSettings, PaginationMixin, {
    titleToken: 'Team',

    classNames: ['view-team'],

    paginationModel: 'user',
    paginationSettings: {
        status: 'active',
        limit: 20
    },

    model() {
        this.loadFirstPage();

        return this.store.query('user', {limit: 'all', status: 'invited'}).then(() => {
            return this.store.filter('user', () => {
                return true;
            });
        });
    },

    actions: {
        reload() {
            this.refresh();
        }
    }
});
