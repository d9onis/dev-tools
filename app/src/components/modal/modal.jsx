'use strict';

require('./modal.scss');

var React = require('react');

var BASE_CLASS = 'dev-tools-modal';

var CLASSES = {
  modal: BASE_CLASS,
  overlay: BASE_CLASS + '__overlay'
};

var Modal = React.createClass({

  propTypes: {
    hideModal: React.PropTypes.func,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ])
  },

  render: function () {
    var {
      children,
      ...other
      } = this.props;

    return (
      <div className={ CLASSES.modal }>
        <div className={ CLASSES.overlay }>
          { children }
        </div>
      </div>
    )
  }

});

module.exports = Modal;
