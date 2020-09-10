import React from 'react';
import './App.css';

import CollectionsContainer from './components/CollectionsContainer';
import Form from './components/Form';
import Navbar from './components/Navbar';
import Home from './components/Home';
//Route things
import {Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class App extends React.Component {
  state = {

    user: {
      id: 0,
      username: "",
      collections:[]
    },

  }

 
  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")
     console.log(userInfo)
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(this.handleResponse)
  }
  

  handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted")
    console.log(userInfo)
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(this.handleResponse)
      
        //console.log(resp)
        // this.handleResponse


  }




  handleResponse = (resp) => {
    //console.log(this.props)
    if(!resp.message){
      //alert("Created a user")
      this.setState({
        // username: resp.username,
        // id: resp.id,
        // collections: resp.collections
        user: resp
      },()=>{this.props.history.push("/collection")})
    }
    else{
      alert(resp.message)
    }

  }




  renderCollection = (routerProps) => {
    console.log(routerProps)
    //debugger
    return <CollectionsContainer user={this.state.user}/>
  }




  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form formName="Log In" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/signup") {
      return <Form formName="Sign Up" handleSubmit={this.handleRegisterSubmit}/>
    }
  }

 

  render(){
    //console.log(this.state)
    return (

      <div className="App">
          {/* <Toolbar /> */}
          <Navbar />
          <Switch>
          <Route path="/login" render={ this.renderForm } />
          <Route path="/signup" render={ this.renderForm } />
          <Route path="/collection" render={ this.renderCollection } />
          <Route path="/" exact component={Home} />
          <Route render={ () => <p>Page not Found</p> } />
          </Switch>
      </div>

      // <div className="Collection-container">
      // <p>This is form area</p>
      // <CollectionsContainer />
      // </div>

      );
  }
}

export default withRouter(App);
