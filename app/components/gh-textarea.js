import OneWayTextarea from 'ember-one-way-controls/components/one-way-textarea';
import TextInputMixin from 'ideamarket-admin/mixins/text-input';

export default OneWayTextarea.extend(TextInputMixin, {
    classNames: 'gh-input'
});
