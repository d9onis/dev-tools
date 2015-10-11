'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/actions');

var toolState = false;

var toolStore = Reflux.createStore({

  listenables: Actions,

  activateTool: function (type) {
    toolState = type;

    this.trigger(toolState)
  },

  deActivateTool: function () {
    toolState = false;

    this.trigger(toolState)
  },

  getDefault: function () {
    return toolState
  }
});

module.exports = toolStore;
