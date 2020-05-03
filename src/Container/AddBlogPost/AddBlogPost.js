import React from 'react';
import axios from 'axios';
import './AddBlogPost.css';
import { Link } from 'react-router-dom';


export default class AddBlogPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem('username'),
            title: '',
            body:'',
            titleerrormessage: '',
            bodyerrormessage: ''
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
        let titleErr = '';
        let bodyErr = '';
       
        let title = this.state.title;
        
        if (title === null || title.length === 0) {
            titleErr = <strong>Please enter title</strong>;
        }
        this.setState({titleerrormessage: titleErr});

        let body = this.state.body;
        
        if (body === null || body.length === 0) {
            bodyErr = <strong>Please enter the content</strong>;
        }

        this.setState({bodyerrormessage: bodyErr});

        if(titleErr.length == 0 && bodyErr.length == 0)
        {
            this.addNewPost({
                username: this.state.username,
                title: this.state.title,
                body: this.state.body
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

   
    addNewPost =(blog)=>{
        console.log("blog : "+JSON.stringify(blog));
        
        axios({
            url: "https://blogs-backend.herokuapp.com/api/add-blog",
            // url: "http://localhost:2001/api/add-blog",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(blog),
          }).then(response => {
              this.redirectToHome(response);
            //console.log(`response: ${JSON.stringify(response)}`);
            // this.props.history.push(`/post/${this.props.match.params.id}`);
          }).catch(error => {
            console.log(`add post error: ${error}`);
          });
    
    }
    
    render() {
        return (
            <div className='add-blog-container'>
            <form onSubmit={this.mySubmitHandler}>
                <h1>Add New Post</h1>

                <p className='p'>Title:</p>
                <textarea
                    rows='3'
                    cols='50'
                    type='text'
                    name='title'
                    value={this.state.title}
                    onChange={this.myChangeHandler}
                />
                {this.state.titleerrormessage}

                <p  className='p'>Content:</p>
                <textarea 
                    name='body'
                    rows='5'
                    cols='50'
                    value={this.state.body}
                    onChange={this.myChangeHandler}
                />
                {this.state.bodyerrormessage}
                <br />
                <br />
                <input className="btn" type='submit' value='Add'/>
                <button className="btn"><Link to={{
                    pathname: "/",
                }}> Cancel</Link> </button>  
            </form>
            </div>
        );
    }
}
