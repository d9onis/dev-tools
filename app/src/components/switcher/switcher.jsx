'use strict';

require('./switcher.scss');

var React = require('react');

var BASE_CLASS = 'dev-tools-switcher';

var switcher = React.createClass({

  propTypes: {
    onClick: React.PropTypes.func,
    isActive: React.PropTypes.bool
  },

  render: function () {
    var {
      onClick,
      isActive
      } = this.props;

    var text = isActive ? 'Active' : 'Inactive';

    var styles = {
      transform: isActive ? 'translate(-100%, 0)' : 'translate(0, 0)'
    };

    return (
      <div className={ BASE_CLASS } onClick={ onClick }>

        <div className={ BASE_CLASS + '__label' }>Activate</div>
        <div className={ BASE_CLASS + '__label' }>Deactivate</div>

        <div style={ styles } className={ BASE_CLASS + '__item' }>{ text }</div>
      </div>
    )
  }
});

module.exports = switcher;
