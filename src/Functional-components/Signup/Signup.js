
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Signup.css'

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: '',
            repeatedpassword: '',
            repeatedpasswordErrormessage:'',
            passwordMismatchErrormessage:'',
            userErrormessage: '',
            passwordErrormessage: '',
            signupErrorMessage: '',
            retry:''
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
        let repeatedpasswordErr = '';
        let passwordMismatchErr = '';
        let signupInvalid = false;

        let username = this.state.username;
        
        if (username === null || username.length === 0 ) {
            userErr = <strong>Please enter username</strong>;
            signupInvalid = true;
        }
        this.setState({userErrormessage: userErr});

        let password = this.state.password;
        
        if (password === null || password.length === 0) {
            passwordErr = <strong>Please enter password</strong>;
            signupInvalid = true;
        }

        this.setState({passwordErrormessage: passwordErr});

        let repeatedpassword = this.state.repeatedpassword;
        
        if (repeatedpassword === null || repeatedpassword.length === 0) {
            repeatedpasswordErr = <strong>Please enter password again</strong>;
            signupInvalid = true;
        }

        this.setState({repeatedpasswordErrormessage: repeatedpasswordErr});

        if(repeatedpassword !== password ){
            passwordMismatchErr = <strong>Both password should be same</strong>;
            signupInvalid = true;
        }
        this.setState({repeatedpasswordErrormessage: passwordMismatchErr});

        if(!signupInvalid)
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
          url: "https://blogs-backend.herokuapp.com/api/signup",
          //url: "http://localhost:2001/api/signup",
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
            this.setState({signupErrorMessage: response.data.message});
          }
          else if(response.data.status == 'success'){
            localStorage.setItem('username', response.data.username);
            this.props.history.push(`/`);
          }
        }).catch(error => {
          console.log(`signup error: ${error}`);
        });
    
    }
    
    render() {
        return (
            <div className='container-signup'>
            <form onSubmit={this.mySubmitHandler}>
                <h1>Signup</h1>

                <p className='p'>Username:</p>
                <input
                    className='inp'
                    type='text'
                    name='username'
                    value={this.state.username}
                    onChange={this.myChangeHandler}
                />
                {this.state.userErrormessage}

                <p className='p'>Password:</p>
                <input 
                    className='inp'
                    type='password'                
                    name='password'
                    value={this.state.password}
                    onChange={this.myChangeHandler}
                />
                {this.state.passwordErrormessage}

                <p className='p'>Re-Enter Password:</p>
                <input 
                    className='inp'
                    type='password'                
                    name='repeatedpassword'
                    value={this.state.repeatedPassword}
                    onChange={this.myChangeHandler}
                />
                {this.state.repeatedpasswordErrormessage}
                <br />
                <br />
                <input className='inp' type='submit' />
                <span className='newUser'>Already resisterd?</span>
                <div className='btn-div'><button className='btn btn-link'><Link to='/Login'> Login </Link></button></div>
                {this.state.signupErrorMessage}
                {this.state.retry}
            </form>
            </div>
        );
    }
}
