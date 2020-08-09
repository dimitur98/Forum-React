import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'
import Category from '../components/category'
import UserContext from '../Context'
import PageWrapper from '../components/pageWrapper'

class HomePage extends Component{
  constructor(props){
    super(props)

    this.state = {
      categories: [],
      admin: true
    }
  }
  static contextType = UserContext
  getAllNotDeletedCategories = async() => {
    const promise = await fetch('http://localhost:9999/api/category/allCategories')
    const categories = await promise.json()
    this.setState({
      categories
    })
  }

  renderCategories(){
    const { categories } = this.state
    
    return categories.map((category) => {
      return(
        <Category 
          refresh = {this.refresh} 
          key = {category._id } 
          name = {category.name} 
          imageUrl = {category.imageUrl} 
          id = {category._id}/>
      )
    })
  }

  isAdmin=()=>{
    const { user } = this.context
    if(user){
      if(user.role === 'admin'){
        this.setState({admin: true})
        return
      }
    }
    this.setState({admin:false})
  }

  refresh = () => {
    this.getAllNotDeletedCategories()
  }

  componentDidMount(){
    this.getAllNotDeletedCategories()
    this.isAdmin()
  }

  render(){
    const {admin} = this.state
    const {loggedIn} = this.context
    return (
      <PageWrapper isAdmin = {this.isAdmin}>
          <div class="container">
              <main role="main" class="pb-3">
                  <div class="text-center">
                      <h1 class="display-3">ForumSystem</h1>

                      {(loggedIn && admin) && <Link to='/CreateCategory' class="btn btn-primary btn-lg">Add new category</Link>}
                  </div>
                  <hr />
                  <div class="row">
                      {this.renderCategories()}                             
                  </div>
              </main>
          </div>
      </PageWrapper>
    )
  }
}

export default HomePage;
