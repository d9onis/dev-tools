import {
  createStore
} from 'redux';
import rootReducer from '../reducers';
import { IStore } from './store.types';

const configureStore = (): IStore => {
  return createStore(
    rootReducer
  );
};

export default configureStore;
