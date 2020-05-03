import React, { Component } from 'react';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import BlogList from './Container/Blog-list/BlogList';
import AddBlogPost from './Container/AddBlogPost/AddBlogPost';
import Header from './Functional-components/Header/Header';
import Login from './Functional-components/Login/Login';
import Signup from './Functional-components/Signup/Signup';
import DisplayPost from './Functional-components/Post/DisplayPost';
import EditPost from './Functional-components/EditPost/EditPost';
import EditPostNew from './Functional-components/EditPost/EditPostNew';
import './App.css';
require(`dotenv`).config();

class App extends Component {
    state={
      showLogin:false,
      showSignup:false
    }

  editHandler = ()=>{
    console.log("clicked");
  }

  deleteHandler = ()=>{
    console.log("clicked");
  }

  changedHandler = ()=>{
  console.log("input enterd");
  }

  openLoginComponent = () => {
    console.log("clicked");   
    const doesShow = this.state.showLogin;
    this.setState({showLogin:!doesShow});
  }

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={BlogList}/>
            <Route path="/DisplayPost" exact component={DisplayPost}/>
            <Route path="/AddBlogPost" exact component={AddBlogPost}/>
            <Route path="/EditPostNew" exact component={EditPostNew}/>
            <Route path="/Login" exact component={Login}/>
            <Route path="/Signup" exact component={Signup}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
  

