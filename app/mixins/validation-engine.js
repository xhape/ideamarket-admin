import Mixin from 'ember-metal/mixin';
import RSVP from 'rsvp';
import {A as emberA, isEmberArray} from 'ember-array/utils';
import DS from 'ember-data';
import Model from 'ember-data/model';

import InviteUserValidator from 'ideamarket-admin/validators/invite-user';
import NavItemValidator from 'ideamarket-admin/validators/nav-item';
import PostValidator from 'ideamarket-admin/validators/post';
import ResetValidator from 'ideamarket-admin/validators/reset';
import SettingValidator from 'ideamarket-admin/validators/setting';
import SetupValidator from 'ideamarket-admin/validators/setup';
import SigninValidator from 'ideamarket-admin/validators/signin';
import SignupValidator from 'ideamarket-admin/validators/signup';
import SlackIntegrationValidator from 'ideamarket-admin/validators/slack-integration';
import SubscriberValidator from 'ideamarket-admin/validators/subscriber';
import TagSettingsValidator from 'ideamarket-admin/validators/tag-settings';
import UserValidator from 'ideamarket-admin/validators/user';

import ValidatorExtensions from 'ideamarket-admin/utils/validator-extensions';

const {Errors} = DS;

// our extensions to the validator library
ValidatorExtensions.init();

/**
* The class that gets this mixin will receive these properties and functions.
* It will be able to validate any properties on itself (or the model it passes to validate())
* with the use of a declared validator.
*/
export default Mixin.create({
    // these validators can be passed a model to validate when the class that
    // mixes in the ValidationEngine declares a validationType equal to a key on this object.
    // the model is either passed in via `this.validate({ model: object })`
    // or by calling `this.validate()` without the model property.
    // in that case the model will be the class that the ValidationEngine
    // was mixed into, i.e. the controller or Ember Data model.
    validators: {
        inviteUser: InviteUserValidator,
        navItem: NavItemValidator,
        post: PostValidator,
        reset: ResetValidator,
        setting: SettingValidator,
        setup: SetupValidator,
        signin: SigninValidator,
        signup: SignupValidator,
        slackIntegration: SlackIntegrationValidator,
        subscriber: SubscriberValidator,
        tag: TagSettingsValidator,
        user: UserValidator
    },

    // This adds the Errors object to the validation engine, and shouldn't affect
    // ember-data models because they essentially use the same thing
    errors: null,

    // Store whether a property has been validated yet, so that we know whether or not
    // to show error / success validation for a field
    hasValidated: null,

    init() {
        this._super(...arguments);
        this.set('errors', Errors.create());
        this.set('hasValidated', emberA());
    },

    /**
    * Passes the model to the validator specified by validationType.
    * Returns a promise that will resolve if validation succeeds, and reject if not.
    * Some options can be specified:
    *
    * `model: Object` - you can specify the model to be validated, rather than pass the default value of `this`,
    *                   the class that mixes in this mixin.
    *
    * `property: String` - you can specify a specific property to validate. If
    * 					   no property is specified, the entire model will be
    * 					   validated
    */
    validate(opts) {
        let model = this;
        let hasValidated,
            type,
            validator;

        opts = opts || {};

        if (opts.model) {
            model = opts.model;
        } else if (this instanceof Model) {
            model = this;
        } else if (this.get('model')) {
            model = this.get('model');
        }

        type = this.get('validationType') || model.get('validationType');
        validator = this.get(`validators.${type}`) || model.get(`validators.${type}`);
        hasValidated = this.get('hasValidated');

        opts.validationType = type;

        return new RSVP.Promise((resolve, reject) => {
            let passed;

            if (!type || !validator) {
                return reject([`The validator specified, "${type}", did not exist!`]);
            }

            if (opts.property) {
                // If property isn't in `hasValidated`, add it to mark that this field can show a validation result
                hasValidated.addObject(opts.property);
                model.get('errors').remove(opts.property);
            } else {
                model.get('errors').clear();
            }

            passed = validator.check(model, opts.property);

            return (passed) ? resolve() : reject();
        });
    },

    /**
    * The primary goal of this method is to override the `save` method on Ember Data models.
    * This allows us to run validation before actually trying to save the model to the server.
    * You can supply options to be passed into the `validate` method, since the ED `save` method takes no options.
    */
    save(options) {
        let {_super} = this;

        options = options || {};
        options.wasSave = true;

        // model.destroyRecord() calls model.save() behind the scenes.
        // in that case, we don't need validation checks or error propagation,
        // because the model itself is being destroyed.
        if (this.get('isDeleted')) {
            return this._super(...arguments);
        }

        // If validation fails, reject with validation errors.
        // If save to the server fails, reject with server response.
        return this.validate(options).then(() => {
            return _super.call(this, options);
        }).catch((result) => {
            // server save failed or validator type doesn't exist
            if (result && !isEmberArray(result)) {
                throw result;
            }

            return RSVP.reject(result);
        });
    },

    actions: {
        validate(property) {
            this.validate({property});
        }
    }
});
