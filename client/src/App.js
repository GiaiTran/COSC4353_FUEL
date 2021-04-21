import logo from './logo.svg';
import './App.css';
import {React,Component} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./app/components/register"
import LogIn from "./app/components/login"
import Profile from "./app/components/profile"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Gas from './app/components/gasform'
import DataProfile from './app/components/getalluser'
import Details from './app/components/detailsUser'
import Update from './app/components/updateUser'
import HeaderNav from './app/components/headerNav'
import GetHist from './app/components/quoteHistory'
import {checkAuth,CheckProfile} from "./app/components/check"
class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      
    }
    
  }
 
  render(){
    
    return (
    
      <Router>
        
        <Switch>
          
          <Route exact path="/" component={Register}/>
          <Route path="/login"  component={LogIn}/>
           
              <Route path="/create/profile" component={Profile}/>
              <Route path="/create/gas" component={Gas}/>
              <Route path="/admin/profile" component={DataProfile}/>
              <Route path="/detail/:slug" component={Details}/>
              <Route path="/profile/update/:slug" component={Update}/>
              <Route path="/history/:profile" component={GetHist}></Route>
            
            
         
          
        
      </Switch>
        
        
    </Router>
    
    );
  }
  
}

export default App;
