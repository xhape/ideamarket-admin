import ApplicationSerializer from 'ideamarket-admin/serializers/application';

export default ApplicationSerializer.extend({
    attrs: {
        createdAtUTC: {key: 'created_at'},
        updatedAtUTC: {key: 'updated_at'}
    }
});
