import injectService from 'ember-service/inject';
import GhostDropdown from 'ideamarket-admin/components/gh-dropdown';

export default GhostDropdown.extend({
    classNames: 'ghost-popover',
    dropdown: injectService()
});
