'use strict';

// Dev dependencies
var React = require('react');
var Reflux = require('reflux');

// Actions
var Actions = require('./src/actions/actions');

// Stores
var ModalStore = require('./src/stores/modalStore');
var ToolOptionsStore = require('./src/stores/toolOptionsStore');
var ToolStore = require('./src/stores/toolStore');

// Components
var Panel = require('./src/components/panel');
var PanelBtn = require('./src/components/panel/panelBtn.jsx');
var Icon = require('./src/components/icon');
var ActionBtn = require('./src/components/actionBtn');
var Modal = require('./src/components/modal');
var ToolOptions = require('./src/components/toolOptions');

// Tools
// Grid
var GridTool = require('./src/tools/gridTool');
var GridToolOptions = require('./src/tools/gridTool/options.jsx');
// Picture
var PictureTool = require('./src/tools/pictureTool');
var PictureToolOptions = require('./src/tools/pictureTool/options.jsx');

var DevTools = React.createClass({

  propTypes: {
    children: React.PropTypes.object
  },

  mixins: [
    Reflux.listenTo(ModalStore, 'onModalUpdate'),
    Reflux.listenTo(ToolOptionsStore, 'onToolOptionsUpdate'),
    Reflux.listenTo(ToolStore, 'onToolUpdate')
  ],

  getInitialState: function () {
    var initialModalState = localStorage.getItem('modal');
    var initialToolState = localStorage.getItem('tool');

    return {
      modal: initialModalState === 'false' ? ModalStore.getDefault() : initialModalState,
      toolOptions: ToolOptionsStore.getDefault(),
      tool: initialToolState === 'false' ? ToolStore.getDefault() : initialToolState,
      showToolOptions: false
    };
  },

  onModalUpdate: function (newModalState) {
    localStorage.setItem('modal', newModalState);
    this.setState({
      modal: newModalState
    });
  },

  onToolOptionsUpdate: function (newToolOptionsState) {
    this.setState({
      toolOptions: newToolOptionsState
    });
  },

  onToolUpdate: function (newToolState) {
    localStorage.setItem('tool', newToolState);
    this.setState({
      tool: newToolState
    })
  },

  getModalComponent: function (modal) {

    if (!modal) {
      return null;
    }

    var modalInner = null;

    switch (modal) {
      case 'GridTool':
        modalInner = <GridTool unitHeight={50} colCountInRow={12}/>;
        break;
      case 'PictureTool':
        modalInner = <PictureTool />;
    }

    return (
      <Modal>
        { modalInner }
      </Modal>
    );
  },

  getToolOptionsComponent: function (toolOptions) {

    if (!toolOptions) {
      return null;
    }

    var toolOptionsInner = null;

    switch (toolOptions) {
      case 'GridTool':
        toolOptionsInner = <GridToolOptions />;
        break;
      case 'Sprite':
        toolOptionsInner = 'sprite';
        break;
      case 'PictureTool':
        toolOptionsInner = <PictureToolOptions />;
    }

    return (
      <ToolOptions
        hideToolOptions={ () => Actions.hideToolOptions() }
        title={ toolOptions }>

        { toolOptionsInner }
      </ToolOptions>
    );
  },

  createActionBtn: function (modal, tool) {

    if (!tool) {
      return null;
    }

    if (tool) {
      return (
        <ActionBtn
          onClick={ () => Actions.toggleModal(modal, tool) }
          isActive={ modal ? true : false }/>
      )
    }
  },

  render: function () {
    var {
      modal,
      toolOptions,
      tool
      } = this.state;

    return (
      <div className='dev-tools'>

        { this.createActionBtn(modal, tool) }

        <Panel>
          <PanelBtn
            bgColor='#ff004c'
            onMouseEnter={ () => Actions.showToolOptions('GridTool') }>
            <Icon svg={ require('./src/tools/gridTool/grid-icon.svg') }/>
          </PanelBtn>

          <PanelBtn
            bgColor='#ff9200'
            onMouseEnter={ () => Actions.showToolOptions('PictureTool') }>
            <Icon svg={ require('./src/tools/pictureTool/picture-icon.svg') }/>
          </PanelBtn>
        </Panel>

        { this.getModalComponent(modal) }
        { this.getToolOptionsComponent(toolOptions) }
      </div>
    )
  }
});

/**
 * Exports
 * @returns {*}
 */
module.exports = function () {
  var devBox = document.createElement('div');
  var id = 'devToolsBox';

  devBox.setAttribute('id', id);

  document.body.appendChild(devBox);

  return React.render(
    React.createElement(DevTools),
    document.getElementById(id)
  );
};
