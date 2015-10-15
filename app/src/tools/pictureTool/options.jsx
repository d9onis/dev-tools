'use strict';

var React = require('react');
var Reflux = require('reflux');
var Dropzone = require('react-dropzone');
var Slider = require('../../components/slider');
var Switcher = require('../../components/switcher');

var Actions = require('../../actions/actions');
var SliderStore = require('../../stores/sliderStore');

var TOOL_NAME = 'PictureTool';

var BASE_CLASS = 'dev-tool-picture';
var localStorageOpacityKey = BASE_CLASS + 'opacity-image';

var Options = React.createClass({

  getInitialState: function () {
    var initialOpacityState = localStorage.getItem(localStorageOpacityKey);

    return {
      file: null,
      value: initialOpacityState === null ? SliderStore.getDefault() : initialOpacityState
    }
  },

  onDrop: function (files) {
    var file = files[0];
    if (file.type.match('image.*')) {
      var reader = new FileReader();

      reader.onload = (function () {
        return function (e) {
          var result = e.target.result;

          Actions.onDropFile(result);
        };
      })(file);

      reader.readAsDataURL(file);
    }

    Actions.activateTool(TOOL_NAME);
    Actions.showModal(TOOL_NAME)
  },

  handleChange: function (value) {

    Actions.onChangeSlider(value);

    this.setState({
      value: value,
    });
  },

  render: function () {
    var localState = localStorage.getItem('tool');
    var state = localState === TOOL_NAME ? true : false;
    var value = parseInt(this.state.value);

    var dropZoneStyles = {
      maxWidth: '180px',
      height: '50px',
      borderRadius: '5px',
      border: '1px dashed #A3A3A3',
      cursor: 'pointer',
      color: '#a3a3a3',
      background: '#eaeaec'
    };

    var dropZoneActiveStyles = {
      opacity: '.6'
    };

    return (
      <div>
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
          isActive={ state }/>

        <div className='dev-tools-tool-options__sub-title'>Opacity</div>
        <Slider
          defaultValue={ value }
          onChange={ this.handleChange }
          className={ 'dev-tools-slider' }
          handleClassName={ 'dev-tools-slider__handle' }/>

        <div className='dev-tools-tool-options__sub-title'>Select file</div>
        <Dropzone
          style={ dropZoneStyles }
          activeStyle={ dropZoneActiveStyles }
          multiple={ false }
          ref='dropzone'
          onDrop={ this.onDrop }>
          <span className='dev-tools-tool-options__upload-text'>Try dropping file here, or click to select file to upload.</span>
        </Dropzone>
      </div>
    )
  }

});

module.exports = Options;
