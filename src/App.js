import React from 'react';
import './App.css';

import CollectionsContainer from './components/CollectionsContainer';
import Form from './components/Form';
import Navbar from './components/Navbar';
import Home from './components/Home';
//Route things
import {Route, withRouter, Redirect,Switch} from 'react-router-dom';


class App extends React.Component {
  state = {

    user: {
      id: 0,
      username: "",
      collections:[]
    },
    token: ""
  }

 

  componentDidMount(){

    if (localStorage.token) {

      fetch("http://localhost:3000/api/v1/persist", {
        headers: {
          "Authorization": `bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then(this.handleResponse)



    }
  }
  
  handleLogout = () => {
    this.setState({
      user: {
        id: 0,
        username: "",
        collections:[]
      },
      token: ""
    })
    localStorage.clear()
  }



  handleLoginSubmit = (userInfo) => {
    //console.log("Login form has been submitted")
     //console.log(userInfo)
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
       
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(this.handleResponse)
  }
  

  handleSignupSubmit = (userInfo) => {
    //console.log("Register form has been submitted")
    //console.log(userInfo)
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(this.handleResponse)
      
  }




  handleResponse = (resp) => {
    //console.log(this.props)
    if(!resp.message){
      localStorage.token = resp.token

      this.setState({
        // username: resp.username,
        // id: resp.id,
        // collections: resp.collections
        user: resp.user,
        token: resp.token
      },()=>{this.props.history.push("/collection")})
    }
    else{
      alert(resp.message)
    }

  }




  renderCollection = (routerProps) => {
    //console.log(routerProps)
    //debugger
    if(this.state.token){
      return <div>
             <CollectionsContainer user={this.state.user} token={this.state.token} />
             </div>
    }else{
      return <Redirect to="/login" />
    }
    
  }




  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form formName="Log In" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/signup") {
      return <Form formName="Sign Up" handleSubmit={this.handleSignupSubmit}/>
    }
  }

 

  render(){
    //console.log(this.state)
    return (

      <div className="App">
          <Navbar />
          <Switch>
          <Route path="/login" render={ this.renderForm } />
          <Route path="/signup" render={ this.renderForm } />
          <Route path="/collection" render={ this.renderCollection } />
          <Route path="/" exact component={Home} />
          {(this.state.token) ? 
           <Route exact path='/logout' render={() => <div className="logout-div"><h2 className="logout-text">Save it Now, See you next time</h2><button className="logout-btn" onClick={this.handleLogout}>Log out</button> </div>} /> 
                    : null}
          <Route render={ () =><div><h4 className="title">Save it</h4> <h3 >Simple way to track your favorite website</h3> <img src="https://www.seekpng.com/png/full/212-2120947_planets-clipart-aesthetic-aesthetic-circle-background.png" alt="Save it" /> </div>} />
          </Switch>
      </div>

      );
  }
}

export default withRouter(App);
