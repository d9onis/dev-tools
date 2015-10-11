'use strict';

require('./actionBtn.scss');

var React = require('react');

var Icon = require('../icon');

var BASE_CLASS = 'dev-tools-action-btn';

var actionBtn = React.createClass({

  propTypes: {
    onClick: React.PropTypes.func,
    isActive: React.PropTypes.bool
  },

  render: function () {
    var {
      onClick,
      isActive,
      ...other
      } = this.props;

    var icon = isActive ? require('./hide.svg') : require('./show.svg');

    return (
      <div onClick={ onClick } className={ BASE_CLASS }>
        <Icon className={ BASE_CLASS + '__icon' } svg={ icon } />
      </div>
    )
  }
});

module.exports = actionBtn;
