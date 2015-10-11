'use strict';

require('./panel.scss');

var React = require('react');

var Panel = React.createClass({

  render: function () {
    var {
      children
      } = this.props;

    return (
      <div className='dev-tools-panel'>
        { children }
      </div>
    )
  }
});

module.exports = Panel;
