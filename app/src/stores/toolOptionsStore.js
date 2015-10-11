'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/actions');

var toolOptionsState = false;

var toolOptionsStore = Reflux.createStore({

  listenables: Actions,

  showToolOptions: function (type) {
    toolOptionsState = type;

    this.trigger(toolOptionsState)
  },

  hideToolOptions: function () {
    toolOptionsState = false;

    this.trigger(toolOptionsState)
  },

  getDefault: function () {
   return toolOptionsState
  }
});

module.exports = toolOptionsStore;
