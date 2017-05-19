import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import DevTools from '../components/dev-tools/dev-tools'

const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
};

export default configureStore
