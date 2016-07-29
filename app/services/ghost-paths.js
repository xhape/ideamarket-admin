import Ember from 'ember';
import Service from 'ember-service';
import ghostPaths from 'ideamarket-admin/utils/ghost-paths';

// ember-cli-shims doesn't export _ProxyMixin
const {_ProxyMixin} = Ember;

export default Service.extend(_ProxyMixin, {
    content: ghostPaths()
});
