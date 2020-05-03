import React from 'react';
import axios from 'axios';
import './EditPost.css'
import { Link } from 'react-router-dom';

export default class EditMyPost extends React.Component {
    constructor(props) {
        super(props);

        const blog = props.location.state;
        
        this.state = {
            _id: blog._id,
            username: blog.username,
            title: blog.title,
            body: blog.body,
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
            this.updatePost({
                _id: this.state._id,
                username: this.state.username,
                title: this.state.title,
                body: this.state.body,
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

   
    updatePost =(blog)=>{
        console.log(`server: ${process.env.SERVER_URL}`);
        
        console.log("blog : "+JSON.stringify(blog));
        
        axios({
            url: "https://blogs-backend.herokuapp.com/api/update-blog",
            // url: "http://localhost:2001/api/update-blog",
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
            console.log(`update post error: ${error}`);
          });
    
    }
    
    render() {
        return (
            <div className='container-edit'>
            <form onSubmit={this.mySubmitHandler}>
                <h1>Edit Your Post</h1>

                <p className='p'>Title:</p>
                <textarea
                    type='text'
                    name='title'
                    value={this.state.title}
                    onChange={this.myChangeHandler}
                />
                {this.state.titleerrormessage}

                <p className='p'>Content:</p>
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
                <input className='btn btn-inp' type='submit' value='Update'/>
                   <button className="btn"><Link to={{
                        pathname: "/",
                    }}> Cancel</Link> </button>  
            </form>
            </div>
        );
    }
}
