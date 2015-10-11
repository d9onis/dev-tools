'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/actions');

var fileState = false;

var DropFileStore = Reflux.createStore({

  listenables: Actions,

  onDropFile: function (url) {
    fileState = url;

    this.trigger(fileState)
  },

  getDefault: function () {
    return fileState
  }

});

module.exports = DropFileStore;
