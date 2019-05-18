import React from 'react';
import { Provider } from 'react-redux'
import store from "./store";

import CountryContainer from '@/container/country'

class App extends React.Component {
  render() {

    return (
      <Provider store={store}>
        <CountryContainer />
      </Provider>
    );
  }
}

export default App;