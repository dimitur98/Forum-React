import React, { Component } from 'react';
import '../App.css';
import Header from '../components/header'
import Footer from '../components/footer'
import Category from '../components/category'

class HomePage extends Component{
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
                      <Category />                              
                  </div>
              </main>
          </div>
          <Footer />     
      </div>
    )
  }
}

export default HomePage;
