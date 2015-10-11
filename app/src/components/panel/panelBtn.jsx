'use strict';

require('./panel.scss');

var React = require('react');

var BASE_CLASS = 'dev-tools-panel-btn';

var PanelBtn = React.createClass({

  propTypes: {
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    bgColor: React.PropTypes.string
  },

  render: function () {
    var {
      onMouseEnter,
      onMouseLeave,
      onClick,
      bgColor,
      } = this.props;

    var styles = {
      backgroundColor: bgColor
    };

    return (
      <div
        onClick={ onClick }
        onMouseLeave={ onMouseLeave }
        onMouseEnter={ onMouseEnter }
        className={ BASE_CLASS }
        style={ styles } >
        { this.props.children }
      </div>
    )
  }
});

module.exports = PanelBtn;
