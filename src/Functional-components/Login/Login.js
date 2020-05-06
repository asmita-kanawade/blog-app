
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css'


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: '',
            userErrormessage: '',
            passwordErrormessage: '',
            loginErrorMessage: ''
        };

        
    }

    
    redirectToHome = (blog) => {
        //console.log(blog);
          this.props.history.push({
          pathname:`/`,
          blog
        });
      }

    mySubmitHandler = (event) => {
        event.preventDefault();
        let userErr = '';
        let passwordErr = '';
       
        let username = this.state.username;
        
        if (username === null || username.length === 0) {
            userErr = <strong className='login-error'>Please enter username</strong>;
        }
        this.setState({userErrormessage: userErr});

        let password = this.state.password;
        
        if (password === null || password.length === 0) {
            passwordErr = <strong className='login-error'>Please enter password</strong>;
        }

        this.setState({passwordErrormessage: passwordErr});

        if(userErr.length == 0 && passwordErr.length == 0)
        {
            this.doLogin({
                username: this.state.username,
                password: this.state.password
            });
    
        }
    
    }
    
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        
        this.setState({ 
            [nam]: val 
        });
        
    }

   
    doLogin = (loginDetails) => {
        axios({
          url: "https://blogs-backend.herokuapp.com/api/login",
          // url: "http://localhost:2001/api/login",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
              username: loginDetails.username,
              password: loginDetails.password
          }),
        }).then(response => {
          
          console.log(`response: ${JSON.stringify(response)}`);
          if(response.data.status == 'failed')
          {
            this.setState({loginErrorMessage: response.data.message});
          }
          else if(response.data.status == 'success'){
            localStorage.setItem('username', response.data.username);
            this.props.history.push({pathname:`/`});
          }
            
        }).catch(error => {
          console.log(`login error: ${error}`);
        });
    
    }
    
    render() {
        return (
            <div className="container-login">
            <form onSubmit={this.mySubmitHandler}>
                <h1>Login</h1>

                <p className='p'>Username:</p>
                <input
                    className="inp"
                    type='text'
                    name='username'
                    value={this.state.username}
                    onChange={this.myChangeHandler}
                />
                {this.state.userErrormessage}

                <p className='p'>Password:</p>
                <input 
                    className="inp"
                    type='password'                
                    name='password'
                    value={this.state.password}
                    onChange={this.myChangeHandler}
                />
                {this.state.passwordErrormessage}
                <br />
                <br />
                <input 
                 className="inp"
                 type='submit' />
                <span className='newUser'>New user?</span>
                <div className='btn-div'><button className='btn btn-link-login'><Link to='/Signup'> Signup </Link></button></div>
                <div className='error-div-login'>{this.state.loginErrorMessage}</div>
                
            </form>
            </div>
        );
    }
}
