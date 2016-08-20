import NewUserValidator from 'ideamarket-admin/validators/new-user';

export default NewUserValidator.create({
    properties: ['name', 'email', 'password']
});
