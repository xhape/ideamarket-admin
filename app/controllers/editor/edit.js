import Controller from 'ember-controller';
import EditorControllerMixin from 'ideamarket-admin/mixins/editor-base-controller';

export default Controller.extend(EditorControllerMixin, {
    showDeletePostModal: false,

    actions: {
        toggleDeletePostModal() {
            this.toggleProperty('showDeletePostModal');
        }
    }
});
