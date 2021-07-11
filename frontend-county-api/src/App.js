import React from 'react';
import Header from './components/Header';
import './global.css';
import "./theme.css";
import Routes from './routes';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Routes />
      </div>
    );
  }
}
