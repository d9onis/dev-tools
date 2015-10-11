'use strict';

require('./pictureTool.scss');

var React = require('react');
var Reflux = require('reflux');
var Draggable = require('react-draggable');

var Actions = require('../../actions/actions');
var DropFileStore = require('../../stores/dropFileStore');
var SliderStore = require('../../stores/sliderStore');

var BASE_CLASS = 'dev-tool-picture';
var localStorageImageKey = BASE_CLASS + 'preview-image';
var localStorageOpacityKey = BASE_CLASS + 'opacity-image';
var localStorageImagePositionKey = BASE_CLASS + 'image-position';

var Picture = React.createClass({
  propTypes: {},

  mixins: [
    Reflux.listenTo(DropFileStore, 'onFileUpdate'),
    Reflux.listenTo(SliderStore, 'onSliderUpdate')
  ],

  getInitialState: function () {
    var initialFileState = localStorage.getItem(localStorageImageKey);
    var initialImagePosition = JSON.parse(localStorage.getItem(localStorageImagePositionKey));
    var initialOpacityState = localStorage.getItem(localStorageOpacityKey);

    return {
      file: initialFileState === 'false' ? DropFileStore.getDefault() : initialFileState,
      opacity: initialOpacityState === null ? SliderStore.getDefault() : initialOpacityState,
      topPosition: initialImagePosition === null ? 0 : initialImagePosition.top,
      leftPosition: initialImagePosition === null ? 0 : initialImagePosition.left
    }
  },

  onSliderUpdate: function (value) {
    this.setState({
      opacity: value
    });

    localStorage.setItem(localStorageOpacityKey, value);
  },

  onFileUpdate: function (newFileState) {
    this.setState({
      file: newFileState
    });

    localStorage.setItem(localStorageImageKey, newFileState);
  },

  handleStop: function (event, ui) {
    var position = {
      top: ui.position.top,
      left: ui.position.left
    };

    this.setState({
      topPosition: position.top,
      leftPosition: position.left
    });

    localStorage.setItem(localStorageImagePositionKey, JSON.stringify(position))
  },

  render: function () {

    var {
      file,
      topPosition,
      leftPosition,
      opacity
      } = this.state;

    var styles = {
      opacity: opacity / 100
    };

    return (
      <Draggable
        handle={ '.' + BASE_CLASS + '__draggable-area' }
        start={ {x: leftPosition, y: topPosition} }
        moveOnStartChange={ true }
        grid={ [1, 1] }
        zIndex={ 1 }
        onStop={ this.handleStop }>
        <div>
          <div
            className={ BASE_CLASS }
            style={ styles }>
            <div className={ BASE_CLASS + '__draggable-area' }></div>
            { file ? <img src={ file }/> : null }
          </div>
        </div>
      </Draggable>
    )
  }
});

module.exports = Picture;
