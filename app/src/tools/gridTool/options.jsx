'use strict';

var React = require('react');

var Switcher = require('../../components/switcher');
var Actions = require('../../actions/actions');

var TOOL_NAME = 'GridTool';

var Options = React.createClass({

  render: function () {
    var localState = localStorage.getItem('tool');
    var state = localState === TOOL_NAME ? true : false;

    return (
      <Switcher
        onClick={
          function () {
            if (!state) {
              Actions.activateTool(TOOL_NAME);
              Actions.showModal(TOOL_NAME)
            } else {
              Actions.deActivateTool();
              Actions.hideModal()
            }
          }}
        isActive={ state } />
    )
  }

});

module.exports = Options;
