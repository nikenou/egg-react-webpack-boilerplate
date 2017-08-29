module.exports = function(source) {
  const resourcePath = this.resourcePath;
  return `
    import React from 'react';
    import ReactDom from 'react-dom';
    import Hello from '${this.resourcePath.replace(/\\/g, '\\\\')}';
    const state = window.__INITIAL_STATE__;
    ReactDom.render(<Hello {...state} />, document.getElementById('app'));
  `;
};
