import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router,Route} from 'react-router-dom'
class Home extends React.Component{
  render(){
    return(
      <Fragment>
        <Router>
          <Route exact path='/' component = {App}/>
        </Router>
      </Fragment>
    )
  }
}
ReactDOM.render(
    <Home />
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
