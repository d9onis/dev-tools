'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/actions');

var valueState = 50;

var sliderStore = Reflux.createStore({

  listenables: Actions,

  onChangeSlider: function (value) {
    valueState = value;

    this.trigger(valueState)
  },

  getDefault: function () {
    return valueState
  }

});

module.exports = sliderStore;
