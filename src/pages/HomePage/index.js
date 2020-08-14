import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom'
import Category from '../../components/category'
import UserContext from '../../Context'
import PageWrapper from '../../components/pageWrapper'

class HomePage extends Component{
  constructor(props){
    super(props)

    this.state = {
      categories: [],
      admin: true,
      counter:0
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
    var counter = 0
    return categories.map((category) => {
      counter += 1
      return(
        <Category 
          refresh = {this.refresh} 
          key = {category._id } 
          name = {category.name} 
          imageUrl = {category.imageUrl} 
          id = {category._id}
          testId = {counter}
          />
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
      <PageWrapper title='Home - DForum'>
          <div className="container">
              <main role="main" className="pb-3">
                  <div className="text-center">
                      <h1 className="display-3">DForum</h1>

                      {(loggedIn && admin) && <Link to='/CreateCategory' className="btn btn-primary btn-lg">Add new category</Link>}
                  </div>
                  <hr />
                  <div className="row">
                      {this.renderCategories()}                             
                  </div>
              </main>
          </div>
      </PageWrapper>
    )
  }
}

export default HomePage;
