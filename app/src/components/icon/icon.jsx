'use strict';

var React = require('react');

var Icon = React.createClass({

  propTypes: {
    svg: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <span
        {...this.props}
        svg={ null }
        dangerouslySetInnerHTML={ { __html: this.props.svg } }>
      </span>
    )
  }
});

module.exports = Icon;
