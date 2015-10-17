'use strict';

require('./gridTool.scss');

var React = require('react');
var Draggable = require('react-draggable');
var ClassNames = require('classnames');
var Utils = require('../../utils/utils');

var BASE_CLASS = 'dev-tool-grid';
var localStorageKey = BASE_CLASS + '-position';

var GridTool = React.createClass({

  PropTypes: {
    unitHeight: React.PropTypes.number,
    colCountInRow: React.PropTypes.number,
    colOuterPadding: React.PropTypes.number
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

    if (unitHeight != 0) {
      return Math.round(Utils.contentHeight() / unitHeight) * colCountInRow
    } else {
      return colCountInRow
    }
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
      colCountInRow,
      colOuterPadding
      } = this.props;

    var unitStyle = {
      height: unitHeight != 0 ? unitHeight : Utils.contentHeight(),
      flexBasis: 100 / colCountInRow + '%',
      paddingLeft: colOuterPadding,
      paddingRight: colOuterPadding
    };

    var containerStyle = {
      marginLeft: - colOuterPadding,
      marginRight: - colOuterPadding
    };

    var {
      topPosition
      } = this.state;

    for (var i = 0; i < this._unitsCount(); i++) {
      units.push(<div
        style={unitStyle}
        key={i}
        className={ ClassNames(BASE_CLASS + '__unit', colOuterPadding != 0 ? BASE_CLASS + '__unit--outer' : '') }>

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
            <div className={ BASE_CLASS + '__container' } style={ containerStyle }>
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
