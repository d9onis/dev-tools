'use strict';

require('./toolOptions.scss');

var React = require('react');
var Icon = require('../icon');

var BASE_CLASS = 'dev-tools-tool-options';

var toolOptions = React.createClass({
  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ]),
    title: React.PropTypes.string,
    hideToolOptions: React.PropTypes.func
  },

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUp);
  },

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyUp);
  },

  onKeyUp(e) {
    if (e.keyCode === 27) {
      this.props.hideToolOptions();
    }
  },

  render: function () {

    var {
      children,
      title,
      hideToolOptions
      } = this.props;

    return (
      <div className={ BASE_CLASS }>
        <div className={ BASE_CLASS + '__title' }>{ title }</div>
        <a onClick={ hideToolOptions } className={ BASE_CLASS + '__close' }>
          <Icon svg={ require('./close.svg') } />
        </a>
        { children }
      </div>
    )
  }
});

module.exports = toolOptions;
