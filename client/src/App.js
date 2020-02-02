import React, { Component } from 'react';
import Login from './Components/Login/Login'
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {Provider} from 'react-redux';
import store from './redux/store/store';
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Profile from './Components/Profile/Profile'
import './App.css';

class App extends Component {
  

  // componentWillMount(){
  //   const query = queryString.parse(this.props.location.search);
  //   if (query.token) {
  //     window.localStorage.setItem("jwt", query.token);
  //     this.props.history.push('/');
  //   }
  // }

  render(){
    return (
      <Provider store={store}>
        <Router>
            <div className="app">
              <Navbar/>
              <Route exact path="/" component={Home} />
              <Route exact path='/profile' component={Profile} />
            </div>
      </Router>
     </Provider>
    );
  }
}

export default App;
