'use strict';

require('./gridTool.scss');

var React = require('react');
var Draggable = require('react-draggable');

var BASE_CLASS = 'dev-tool-grid';
var localStorageKey = BASE_CLASS + '-position';

var GridTool = React.createClass({

  PropTypes: {
    unitHeight: React.PropTypes.number,
    colCountInRow: React.PropTypes.number
  },

  getInitialState: function () {

    var localStorageTopPosition = localStorage.getItem(localStorageKey);

    return {
      topPosition: localStorageTopPosition != null ? localStorageTopPosition : 0
    }
  },

  _unitsCount: function () {
    var {
      colCountInRow,
      unitHeight
      } = this.props;

    var height = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight);

    return Math.round(height / unitHeight) * colCountInRow
  },

  handleStop: function (event, ui) {
    this.setState({
      topPosition: ui.position.top
    });

    localStorage.setItem(localStorageKey, ui.position.top);
  },

  render: function () {
    var units = [];
    var {
      unitHeight,
      colCountInRow
      } = this.props;

    var unitStyle = {
      height: unitHeight,
      maxWidth: 100 / colCountInRow + '%',
      flexBasis: 100 / colCountInRow + '%'
    };

    var {
      topPosition
      } = this.state;

    for (var i = 0; i < this._unitsCount(); i++) {
      units.push(<div
        style={unitStyle}
        key={i}
        className={ BASE_CLASS + '__unit' }>
      </div>)
    }

    return (
      <Draggable
        axis="y"
        handle={ '.' + BASE_CLASS + '__draggable-area' }
        start={ {x: 0, y: parseInt(topPosition)} }
        moveOnStartChange={ true }
        grid={ [1, 1] }
        zIndex={ 1 }
        onStop={ this.handleStop }>
        <div>
          <div className={ BASE_CLASS }>
            <div className={ BASE_CLASS + '__container' }>
              <div className={ BASE_CLASS + '__draggable-area' }></div>
              { units }
            </div>
          </div>
        </div>
      </Draggable>

    );
  }
});

module.exports = GridTool;
