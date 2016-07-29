import EmbeddedRelationAdapter from 'ideamarket-admin/adapters/embedded-relation-adapter';

export default EmbeddedRelationAdapter.extend({

    shouldBackgroundReloadRecord() {
        return false;
    }

});
