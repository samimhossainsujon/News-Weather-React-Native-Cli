import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import NavigationBar from './components/NavigationBar/NavigationBar';


const App = () => {

  return (
    <Provider store={store}>
      <NavigationBar />
    </Provider>
  );
};

export default App;