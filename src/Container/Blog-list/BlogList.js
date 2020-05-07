import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import './BlogList.css';
import POST from '../../Functional-components/Post/DisplayPost';
import Header from '../../Functional-components/Header/Header';
import DisplayPost from '../../Functional-components/Post/DisplayPost';
import Login from '../../Functional-components/Login/Login';


export default class BlogList extends React.Component {
  constructor(props) {
    super(props);
      
    this.state = {
      blogs:[],
      blogsCopy:[],
      showComponent: false,
      blogpost: null,
      showPostModal: false
    }
  }
  
  redirectToTarget = (blog) => {
    //console.log(blog);
    this.props.history.push({
      pathname:`/DisplayPost`,
      state: blog
    });
  }

  componentDidMount() {
    axios.post(`https://blogs-backend.herokuapp.com/api/search-blogs`)
      .then(res => {
        const blogs = res.data;
        this.setState({ blogs });
        this.setState({blogsCopy: res.data});
        console.log("Here is total blog"+this.state.blogs[0].body.length+`${typeof(this.state.blogs[0].body)}`);
                
      })
  }

  searchHandler = (event) => {
    let searchString = event.target.value;

    let blogs = [...this.state.blogsCopy];
    
    let searchResult = blogs.filter((blog)=>{
      return blog.title.toLowerCase().includes(searchString.toLowerCase()) || blog.body.toLowerCase().includes(searchString.toLowerCase());
    })

    this.setState({blogs: searchResult});

  }

  render() {
    return <>
                <Header 
                  changed={(event) => this.searchHandler(event)}
                />
                <div className='posts'>
                { this.state.blogs.map(blog =>
                  <div
                    key={blog._id}
                    id={blog._id}
                    className="container"
                    onClick={this.redirectToTarget.bind(this, blog)}
                  >
                      <h3>{blog.title.length >= 70 ? blog.title.substring(0, 70) + "..." : blog.title.substring(0, blog.title.length)}</h3>
                      <p>{blog.body.length >= 100 ? blog.body.substring(0, 100) + "..." : blog.body.substring(0, blog.body.length)}</p>
                      <h4>Author: {blog.username}</h4> 
                  </div>
                  )
                 }
                 </div>
              </>
  }
}