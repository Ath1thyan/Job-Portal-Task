import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobListScreen from './components/JobListScreen';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<JobListScreen />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
