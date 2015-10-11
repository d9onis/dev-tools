var Reflux = require('reflux');

var Actions = Reflux.createActions({
  // Tool switcher
  'activateTool': {},
  'deActivateTool': {},

  // Tool options Actions
  'showToolOptions': {},
  'hideToolOptions': {},

  // Modal Actions
  'showModal': {},
  'hideModal': {},
  'toggleModal': {},

  'onDropFile': {},

  'onChangeSlider': {}
});

module.exports = Actions;
