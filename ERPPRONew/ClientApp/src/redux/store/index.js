import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

function create() {
    const store = createStore(reducers, applyMiddleware(thunk));

    return store;
}

export default { create };
