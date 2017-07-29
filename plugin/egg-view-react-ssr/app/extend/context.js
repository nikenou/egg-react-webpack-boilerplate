'use strict';
module.exports = {

  /**
   * render react bundle file
   * @method Context#render
   * @param {String} name filename
   * @param {Object} [locals] template data
   * @param {Object} options custom params
   */
  * render(name, locals, options = {}) {
    locals = Object.assign({}, this.app.locals, this.locals, locals);
    const config = this.app.config.reactssr;
    const layout = options.layout || config.layout;
    let html = '';
    if (layout) {
      html = yield this.app.react.render(layout, locals, { markup: true });
    }
    if (!options.renderClient) {
      const content = yield this.app.react.render(name, locals, options);
      html = html.replace(/(<\/div><\/body>)/i, match => {
        return content + match;
      });
    }
    this.body = this.app.react.resource.inject(html, config, name, locals, options);
  },

  * renderClient(name, locals, options = {}) {
    options.renderClient = true;
    yield this.render(name, locals, options);
  },
};