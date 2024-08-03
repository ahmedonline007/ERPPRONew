import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from '../src/redux/store';
import Router from '../src/router/router'; 
import '../src/Design/CSS/bootstrap.min.css';
import '../src/Design/CSS/icon.css';
import '../src/Design/CSS/style.css';
import '../src/Design/CSS/ar.css';
import 'toastr/build/toastr.min.css';
import 'react-tabs/style/react-tabs.css';

const store = createStore.create();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isTrust: false,
            isLoading: true
        }
    } 

    render() {
      //  toastr.options.rtl = true;

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}


export default App;