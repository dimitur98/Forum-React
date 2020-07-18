import React, { Component } from 'react';
import '../App.css';
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
    console.log(categories)
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

                      <a asp-controller="Posts" asp-action="Create" class="btn btn-primary btn-lg">Create new forum post</a>
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
