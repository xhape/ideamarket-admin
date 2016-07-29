import Component from 'ember-component';
import InfiniteScrollMixin from 'ideamarket-admin/mixins/infinite-scroll';

export default Component.extend(InfiniteScrollMixin, {
    actions: {
        checkScroll() {
            this._checkScroll();
        }
    }
});
