import React, { Component } from 'react';
import NavBar from './components/NavBar'
import CourseList from './components/CourseList'
import Dashboard from './components/dashboard/dashboard'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}

export default App;
