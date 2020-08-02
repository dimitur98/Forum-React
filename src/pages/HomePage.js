import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'
import Category from '../components/category'

class HomePage extends Component{
  constructor(props){
    super(props)

    this.state = {
      categories: []
    }
  }

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
        <Category key = {category._id } name = {category.name} imageUrl = {category.imageUrl} id = {category._id}/>
      )
    })
  }

  componentDidMount(){
    this.getAllNotDeletedCategories()
  }

  render(){
    return (
      <div>     
          <Header />
          <div class="container">
              <main role="main" class="pb-3">
                  <div class="text-center">
                      <h1 class="display-3">ForumSystem</h1>

                      <Link to='/createCategory' class="btn btn-primary btn-lg">Add new category</Link>
                  </div>
                  <hr />
                  <div class="row">
                      {this.renderCategories()}                             
                  </div>
              </main>
          </div>
          <Footer />     
      </div>
    )
  }
}

export default HomePage;
