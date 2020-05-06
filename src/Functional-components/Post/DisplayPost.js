import React from 'react';
import './DisplayPost.css';
import axios from 'axios';


const Post = (props) => {
  let currentUser = localStorage.getItem('username');
  //console.log(`currentUser: ${currentUser}`);

  const blog = props.location.state;

  const redirectToEdit = (blog) => {
    //console.log(blog);
    props.history.push({
      pathname: `/EditPostNew`,
      state: blog
    });
  }
  const redirectToHome = (blog) => {
    //console.log(blog);
    props.history.push({
      pathname: `/`,
      state: blog
    });
  }

  const deletePost = (blogID) => {
    axios({
      url: "https://blogs-backend.herokuapp.com/api/delete-blog",
      // url: "http://localhost:2001/api/delete-blog",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ _id: blogID }),
    }).then(response => {

      //console.log(`response: ${JSON.stringify(response)}`);
      props.history.push(`/`);
    }).catch(error => {
      console.log(`delete post error: ${error}`);
    });

  }


  //console.log("blog in display post: "+JSON.stringify(blog));
  return <div className="blog-container">
    <h1>{blog.title}</h1>
    <p>{blog.body}</p>
    <h4>Author: {blog.username}</h4>
    <button 
    className=" btn btn-goBack" onClick={() => redirectToHome(blog)}>Go back</button>
    {currentUser === blog.username ?
      <button className="btn btn-green" onClick={() => redirectToEdit(blog)}>Edit</button> : ""}
    {currentUser === blog.username ?
      <button className="btn btn-delete" onClick={() => deletePost(blog._id)}>Delete</button>
      : ""
    }
  </div>
}


export default Post;