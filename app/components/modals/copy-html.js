import {alias} from 'ember-computed';
import ModalComponent from 'ideamarket-admin/components/modals/base';

export default ModalComponent.extend({
    generatedHtml: alias('model')
});
