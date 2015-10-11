'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/actions');

var modalState = false;

var ModalStore = Reflux.createStore({

  listenables: Actions,

  showModal: function (type) {
    modalState = type;

    this.trigger(modalState)
  },

  hideModal: function () {
    modalState = false;

    this.trigger(modalState)
  },

  toggleModal: function (modal, tool) {
    if (!modal) {
      this.showModal(tool)
    } else {
      this.hideModal(tool)
    }
  },

  getDefault: function () {
    return modalState
  }

});

module.exports = ModalStore;
