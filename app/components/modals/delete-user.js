import ModalComponent from 'ideamarket-admin/components/modals/base';
import {invokeAction} from 'ember-invoke-action';

export default ModalComponent.extend({

    submitting: false,

    user: null,

    actions: {
        confirm() {
            this.set('submitting', true);

            invokeAction(this, 'confirm').finally(() => {
                this.send('closeModal');
            });
        }
    }
});
