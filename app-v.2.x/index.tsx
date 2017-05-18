import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


const RootElement = document.createElement('div');
RootElement.setAttribute('id', 'root');
document.body.appendChild(RootElement);

ReactDOM.render(
  <div>
    test
  </div>,
  document.getElementById('root')
);
